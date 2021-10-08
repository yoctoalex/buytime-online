const RepositoryBase = require('./repositoryBase');

class BearerRepository extends RepositoryBase {
	constructor(db) {
		super(db, "auth");
	}
}

module.exports = BearerRepository;
