const mysql = require('mysql2');
const fs = require('fs');
const config = require('./config');

fs.readFile(__dirname + '/schema.sql', function(err, contents) {
	const script = contents.toString().replace(/[\n\t\r]/g,"");

	const connection = mysql.createConnection({
		host     : config.mysql.host,
		user     :  config.mysql.user,
		password :  config.mysql.password,
		port	 : config.mysql.port,
		multipleStatements: true
	});

	connection.query(script, function (error, results, fields) {
		if (error) throw error;

		connection.close();
	});
});
