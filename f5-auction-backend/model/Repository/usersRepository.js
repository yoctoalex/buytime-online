const RepositoryBase = require('./repositoryBase');

class UsersRepository extends RepositoryBase {
	constructor(db) {
		super(db, "users");
	}
}

module.exports = UsersRepository;
