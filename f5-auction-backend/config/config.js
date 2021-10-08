module.exports = {
	port: process.env.PORT || 9192,
	mysql: {
		host: process.env.MYSQL_HOST || "192.168.100.203",
		user: process.env.MYSQL_USER || "root",
		port: process.env.MYSQL_PORT || "3306",
		password: process.env.MYSQL_PASSWORD || "password"
	},
	imagePath: '/api/v1/image/find?imageId=',
};
