const RepositoryBase = require('./repositoryBase');

class ImagesRepository extends RepositoryBase {
	constructor(db) {
		super(db, "images");
	}

	createImage(id, author, name, contentType, content) {
		//const hexContent = Buffer.from( content, 'utf8' ).toString('hex');
		//var test = Buffer.from(responseData, 'hex').toString('utf8');
		const hexContent = content.toString('hex');
		const query = "INSERT INTO " + this.table + `(id, author, name, contentType, content) VALUES('${id}','${author}','${name}','${contentType}',X'${hexContent}')`;
		return this.db.query(query);
	}

	async readImage(id) {
		// var responseData= Buffer.from( content, 'utf8' ).toString('hex');
		// var test = Buffer.from(responseData, 'hex').toString('utf8');
		const query = `SELECT * FROM ${this.table} WHERE id = '${id}' LIMIT 1;`;
		const resp = await this.db.query(query);
		return resp.results[0]
	}

	readLotImageIds(id) {
		const query = `SELECT id FROM ${this.table} WHERE lotId = '${id}';`;
		return this.db.query(query);
	}

	assignImage(imageId, author, lotId) {
		const query = `UPDATE ${this.table} SET lotId = '${lotId}' WHERE id = '${imageId}' AND author = '${author}';`;
		return this.db.query(query);
	}
}

module.exports = ImagesRepository;
