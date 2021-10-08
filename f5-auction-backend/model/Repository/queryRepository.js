

class QueryRepository {
	constructor(db) {
		this.db = db;
	}

	query(q) {
		return this.db.query(q);
	}
}

module.exports = QueryRepository;
