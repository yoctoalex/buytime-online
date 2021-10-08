const mysql = require('mysql2');
const fs = require('fs');
const config = require('./config');

console.log("Reading....");

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

fs.readFile(__dirname + '/data/sample-data-1.sql', async function(err, contents) {
	const script = contents.toString();
	console.log("Parsing....");
	const lines = script.split('\n');

	const connection = mysql.createConnection({
		host     : config.mysql.host,
		user     : config.mysql.user,
		password : config.mysql.password,
		port	 : config.mysql.port,
		multipleStatements: true
	});

	const exec = (scriptLine) => new Promise((resolve, reject) => {
		connection.query(scriptLine, function (error, results, fields) {
			if (error)
				console.log(error);

			resolve(results);
		});
	});

	console.log("Filling....");
	for (let i = 0; i < lines.length; i++) {
		if (i % 333 === 0) {
			console.log(`Completed ${i} lines of ==> ${lines.length}. ${(i / lines.length * 100).toFixed(2)}%`)
		}
		await exec(lines[i]);
	}

	console.log("Generating bids....");
	await exec("USE auction_data");
	const usersQty = 'SELECT COUNT(*) FROM users;';
	const lotsQuery = 'SELECT COUNT(*) FROM lots;';
	const usersCount = (await exec(usersQty))[0]['COUNT(*)'];
	const lotsCount = (await exec(lotsQuery))[0]['COUNT(*)'];

	for(let i = 1; i <= lotsCount; i++) {
		if (i % 22 === 0) {
			console.log(`Lot ${i} of ${ lotsCount }`)
		}
		let usedUsers = [];

		const bidsQty = Math.round(getRandomArbitrary(5, 20));
		for (j = 0; j < bidsQty; j++) {
			let userId = Math.round(getRandomArbitrary(1, usersCount - 1));
			while(usedUsers.filter(x => x === userId).length > 0) {
				userId = Math.round(getRandomArbitrary(1, usersCount - 1));
			}

			usedUsers.push(userId);

			const amount = Math.round(getRandomArbitrary(20, 500) * 100) / 100.0;
			const bidQuery = `INSERT INTO bids(amount, lotId, userId) VALUES("${amount}", "${i}", "${userId}")`;
			await exec(bidQuery);
		}
	}

	connection.close();
});
