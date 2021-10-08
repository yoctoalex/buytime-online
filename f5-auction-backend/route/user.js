const express = require('express');
const router = express.Router();
const UserServices = require('../model/Services/userServices');
const AuthServices = require('../model/Services/authServices');

router.get('/', async (req, res) => { // ?id=1122
	const userServices = new UserServices();
	const id = req.query.id;

	const userInfo = await userServices.getById(id);
	res.status(200).json(userInfo);
});

router.get('/logout', async (req, res) => {
	const authServices = new AuthServices();
	await authServices.logout(req.get('BEARER'));

	res.status(200).send("OK");
});

module.exports = router;
