const LotRepository = require('../Repository/lotsRepository');
const BidRepository = require('../Repository/bidsRepository');
const UserRepository = require('../Repository/usersRepository');
const QueryRepository = require('../Repository/queryRepository');
const ImageRepository = require('../Repository/imagesRepository');

const { getMaxOfArray } = require('../util');

const DB = require('../db');
const { imagePath } = require('../../config/config');

class LotServices {
	async create({ userId, title, description, auction_ends, photos, startingPrice }) {
		const db = new DB();
		const lotRepository = new LotRepository(db);
		const imageRepository = new ImageRepository(db);

		description = description || '';
		const lotResult = await lotRepository.create({ userId, title, description, auction_ends });

		await Promise.all(photos.map(async (p) => {
			await imageRepository.assignImage(p, userId, lotResult.results.insertId);
		}));

		const bidRepository = new BidRepository(db);
		return bidRepository.create({ amount: startingPrice, lotId: lotResult.results.insertId, userId });
	}

	async getAll({ page, pageSize }) {
		const db = new DB();
		const lotRepository = new LotRepository(db);
		const bidRepository = new BidRepository(db);
		const userRepository = new UserRepository(db);
		const imageRepository = new ImageRepository(db);

		const lots = (await lotRepository.readPage('1 = 1', page, pageSize));

		const res = await Promise.all(lots.data.map(async (l) => {
			const bids = (await bidRepository.read(`lotId = ${l.id}`)).results || [];
			l.maxBid = getMaxOfArray(bids.map(x => x.amount));
			l.user = (await userRepository.read(`id = ${l.userId}`)).results[0];
			delete l.user.password;

			const images = (await imageRepository.readLotImageIds(l.id)).results || [];
			l.photos = images.map(x => `${imagePath}${x.id}`);

			return l;
		}));

		return { data: res, totalPages: lots.totalPages };
	}

	async getById(id) {
		const db = new DB();
		const lotRepository = new LotRepository(db);
		const userRepository = new UserRepository(db);
		const bidRepository = new BidRepository(db);
		const imageRepository = new ImageRepository(db);

		const lot = await lotRepository.read(`id = ${id}`);
		if (!lot.results.length)
			return null;

		const res = lot.results[0];
		const user = (await userRepository.read(`id = ${res.userId}`)).results[0];
		delete user.password;
		const bids = (await bidRepository.read(`lotId = ${id} order by amount desc`)).results || [];
		const userBids = await Promise.all(bids.map(async (x) => {
			const ub = (await userRepository.read(`id = ${x.userId}`)).results[0];
			delete ub.password;
			x.user = ub;

			return x;
		}));
		res.maxBid = getMaxOfArray(bids.map(x => x.amount));

		const images = (await imageRepository.readLotImageIds(id)).results || [];
		res.photos = images.map(x => `${imagePath}${x.id}`);


		return {lot: res, user, bids: userBids}
	}

	async getTop({ qty, sort, direction }) {
		if (!direction)
			direction = 'DESC';

		if(!qty) {
			qty = 10;
		}
		const db = new DB();
		const queryRepository = new QueryRepository(db);

		const q = `SELECT l.id, l.title, l.auction_ends, l.description, l.date as date, u.id as userId, u.name as userName, MAX(b.amount)  as amount 
						FROM lots l
						JOIN bids b ON b.lotId = l.id
						JOIN users u ON l.userId = u.id
					  	GROUP BY lotId
						ORDER BY ${sort} ${direction}
						LIMIT ${qty}`;

		const imageRepository = new ImageRepository(db);

		const res = await queryRepository.query(q);
		return await Promise.all(res.results.map(async (x) => {
			const images = (await imageRepository.readLotImageIds(x.id)).results || [];
			x.photos = images.map(p => `${imagePath}${p.id}`);

			delete x.password;
			return x;
		}));
	}
}

module.exports = LotServices;
