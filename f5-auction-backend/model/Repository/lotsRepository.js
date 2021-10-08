const RepositoryBase = require('./repositoryBase');

class LotsRepository extends RepositoryBase {
	constructor(db) {
		super(db, "lots");
	}
};

module.exports = LotsRepository;
