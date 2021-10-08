const express = require('express');
const router = express.Router();

const BidServices = require('../model/Services/bidServices');
const BidConstraints = require('../model/BLL/bidConstraints');

router.post('/', async (req, res) => {
	const { lotId, amount } = req.body;
	const userId = req.context.user.id;
	const bidConstraints = new BidConstraints();
	const canBid = await bidConstraints.checkCanBid({userId, lotId, amount});
	if (!canBid) {
		res.status(403).send(`Auction is finished`);
		return;
	}

	const bidServices = new BidServices();
	const result = await bidServices.create({ amount, lotId, userId });
	res.status(201).json(result);
});

module.exports = router;
