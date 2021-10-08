const ImagesRepository = require('../Repository/imagesRepository');
const uuid = require('uuid');
const DB = require('../db');

class ImageServices {
	async create ({ author, name, type, content }) {
		const db = new DB();
		const imageRepository = new ImagesRepository(db);

		let id = uuid();

		if(name.lastIndexOf('.') > 0) {
			id += name.substring(name.lastIndexOf('.'), name.length);
		}

		const base64 = content.split(';base64,')[1] || content;
		let buff = Buffer.from(base64, 'base64');

		await imageRepository.createImage(id, author, name, type, buff);
		return id;
	}

	getImageById(imageId) {
		const db = new DB();
		const imageRepository = new ImagesRepository(db);

		return imageRepository.readImage(imageId);
	}
}

module.exports = ImageServices;
