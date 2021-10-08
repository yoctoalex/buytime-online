const DB = require('../db');
const UsersRepository = require("../Repository/usersRepository");
const BearerRepository = require("../Repository/bearerRepository");
const uuidv1 = require('uuid/v1');

class AuthServices {
	register({ name, login, email, password }) {
		const db = new DB();
		const userRepository = new UsersRepository(db);

		return userRepository.create({ name, login, email, password });
	}

	async authLogin({ login, password }) {
		const db = new DB();
		const userRepository = new UsersRepository(db);
		const bearerRepository = new BearerRepository(db);

		const user = await userRepository.read(`login='${login}' and password='${password}'`);
		if (!user.results.length)
			return null;

		const bearer = _genBearer();

		await bearerRepository.create({
			userId: user.results[0].id,
			bearer: bearer
		});

		return bearer;
	}

	async authBearer(bearer) {
		const db = new DB();
		const userRepository = new UsersRepository(db);
		const bearerRepository = new BearerRepository(db);

		const bearerDTO = await bearerRepository.read(`bearer = '${bearer}'`);
		if (!bearerDTO.results.length)
			return null;

		const user = await userRepository.read(`id = '${bearerDTO.results[0].userId}'`);
		if (!user.results.length)
			return null;

		return user.results[0];
	}

	async logout(bearer) {
		const db = new DB();
		const bearerRepository = new BearerRepository(db);

		await bearerRepository.remove(`bearer = "${bearer}"`);
	}
}

function _genBearer() {
	return uuidv1();
}
module.exports = AuthServices;
