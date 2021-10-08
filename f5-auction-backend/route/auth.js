const express = require('express');
const router = express.Router();

const AuthServices = require('../model/Services/authServices');

router.post('/register', async (req, res) => {
	const {email, login, name, password} = req.body;
	const srv = new AuthServices();

	await srv.register({ email, login, name, password });
	const bearer = await srv.authLogin({ login, password });
	res.status(201).json({ bearer });
});

router.post('/', async (req, res) => {
	const {login, password} = req.body;
	const srv = new AuthServices();

	const bearer = await srv.authLogin({ login, password });
	if (bearer) {
		res.status(200).json({ bearer });
	}
	else {
		res.status(401).send('unauthorized');
	}
});

module.exports = router;
