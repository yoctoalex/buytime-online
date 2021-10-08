const mysql = require('mysql2');
const config = require('../config/config');

class db {
	query(q) {
		return new Promise((resolve, reject) => {
			const connection = mysql.createConnection({
				host     : config.mysql.host,
				user     : config.mysql.user,
				password : config.mysql.password,
				port	 : config.mysql.port,
				database : "auction_data",
				multipleStatements: true
			});

			connection.query(q, function (error, results, fields) {
					connection.close();
					if (error)
						reject(error);

					resolve({results, fields});
				});
			}
		)
	}
}

module.exports = db;
