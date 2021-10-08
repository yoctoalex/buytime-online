const express = require('express');
const router = express.Router();
const LotServices = require('../model/Services/lotServices');

router.post('/', async (req, res) => {
	const { title, description, auction_ends, photos, startingPrice, } = req.body;
	const userId = req.context.user.id;
	const lotServices = new LotServices();

	const result = await lotServices.create({ title, description, userId, auction_ends, photos, startingPrice, });

	res.status(201).json(result);
});

router.get('/all', async (req, res) => {
	const { page, pageSize } = req.query;
	const lotServices = new LotServices();
	const result = await lotServices.getAll({ page, pageSize });
	res.status(200).json(result);
});

router.get('/one', async(req, res) => { // ?id=222233
	const id = req.query.id;
	const lotServices = new LotServices();

	const lot = await lotServices.getById(id);

	res.status(200).json(lot);
});

module.exports = router;
