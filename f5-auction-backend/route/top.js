const express = require('express');
const router = express.Router();

const LotServices = require('../model/Services/lotServices');

router.get('/', async (req, res) => {
	const { qty, sort, direction } = req.query;

	const lotServices = new LotServices();
	const data = await lotServices.getTop({qty, sort, direction});

	res.status(200).json(data);
});

module.exports = router;
