const BidRepository = require('../Repository/bidsRepository');
const DB = require('../db');

class BidServices {
	create ({ amount, lotId, userId }) {
		const db = new DB();
		const bidRepository = new BidRepository(db);

		return bidRepository.create({ amount, lotId, userId });
	}

	async getByLotId(lotId) {
		const db = new DB();
		const bidRepository = new BidRepository(db);

		return (await bidRepository.read(`lotId = ${lotId}`)).results;
	}
}

module.exports = BidServices;
