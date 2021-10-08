module.exports = {
	port: process.env.PORT || 3000,
	serve: process.env.SERVE || './public/build',
	alternate: './public/alt',
	//--------------------------------------------
	mapping: {
		404: ["404.html", 404]
	},

	mode: {}
}
