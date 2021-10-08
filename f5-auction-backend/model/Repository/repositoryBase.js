class RepositoryBase {
	constructor(db, table) {
		this.table = table;
		this.db = db;
	}

	read(where) {
		const query = `SELECT * FROM ${this.table} WHERE ${where};`;
		return this.db.query(query);
	}

	async readPage(where, page, pageSize) {
		const query = `SELECT COUNT(*) FROM ${this.table} WHERE ${where}`;
		const total = (await this.db.query(query)).results[0]['COUNT(*)'];

		let skip = (page - 1) * parseInt(pageSize);
		const totalPages = Math.ceil(total / parseInt(pageSize));
		if (skip > total) {
			skip = total % parseInt(pageSize);
		}

		const dataQuery = `SELECT * FROM ${this.table} WHERE ${where} ORDER BY id DESC LIMIT ${skip}, ${pageSize};`;
		const data = (await this.db.query(dataQuery)).results;

		return {
			totalPages,
			total,
			data
		};
	}

	create(obj) {
		const keys = Object.keys(obj);
		const fields = keys.join(",");
		const values = keys.reduce((r, v) => {
			r.push('"' + obj[v].toString() + '"');
			return r;
		}, []
		).join(',');

		return this.db.query("INSERT INTO " + this.table + "(" + fields + ") VALUES(" + values + ")");
	}

	remove(where) {
		const query = `DELETE FROM ${this.table} WHERE ${where};`;
		return this.db.query(query);
	}
};

module.exports = RepositoryBase;
