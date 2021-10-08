const RepositoryBase = require('./repositoryBase');

class BidsRepository extends RepositoryBase {
	constructor(db) {
		super(db, "bids");
	}
}

module.exports = BidsRepository;
