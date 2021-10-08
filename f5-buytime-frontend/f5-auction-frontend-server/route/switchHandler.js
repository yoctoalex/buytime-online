const express = require('express');
const router = express.Router();
const config = require('../config');

router.get('/:target', (req, res) => {
	const {target} = req.params;
	const {host} = req.headers;
	if (config.mapping[target] || target==="default")
	{
		config.mode[host] = target;
		res.json({
			updated: "ok"
		})
	}
	else {
		res.status(404).json({
			updated: "Mapping not found"
		})
	}
});

module.exports = router;
