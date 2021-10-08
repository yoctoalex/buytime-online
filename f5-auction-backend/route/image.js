const express = require('express');
const router = express.Router();

const { imagePath } = require('../config/config');

const ImageService = require('../model/Services/imageService');

router.post('/', async (req, res) => {
	const { content, name, type, } = req.body;
	const author = req.context.user.id;

	const imageServices = new ImageService();
	const result = await imageServices.create({ name, author, type, content });
	res.status(201).json({
		imageUri: `${imagePath}${result}`,
		id: result,
	});
});

router.get('/find', async (req, res) => {
	const { imageId } = req.query;

	const imageServices = new ImageService();
	const result = await imageServices.getImageById(imageId);
	res.status(200);
	res.setHeader('Content-Type', result.contentType);
	res.send(result.content);
});

module.exports = router;
