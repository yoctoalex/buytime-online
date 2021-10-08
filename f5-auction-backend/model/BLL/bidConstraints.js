const LotServices = require('../Services/lotServices');

class BidsConstraints {
	async checkCanBid({userId, lotId, amount}) {
		const date = new Date();
		const now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
			date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

		const lotServices = new LotServices();
		const lot = await lotServices.getById(lotId);

		if (lot.auction_ends < now_utc)
			return false;

		return true;
	}
}

module.exports = BidsConstraints;
