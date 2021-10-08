const UserRepository = require('../Repository/usersRepository');
const DB = require('../db');

class UserServices {
	async getById(id) {
		const db = new DB();
		const userRepository = new UserRepository(db);

		const user = await userRepository.read(`id = ${id}`);
		if (!user.results.length)
			return null;

		return user.results[0];
	}
}

module.exports = UserServices;
