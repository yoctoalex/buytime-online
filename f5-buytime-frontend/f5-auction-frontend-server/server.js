const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const path = require('path');
const os = require('os');
const switchHandler = require('./route/switchHandler.js');

const {port, serve} = require('./config');
const config = require('./config');

const app = express();
const server = http.Server(app);

const corsOptions = {
	origin: true,
	methods: 'GET,HEAD,POST,DELETE,OPTIONS',
	credentials: true,
};

app.use(morgan('combined'));
app.use(cors(corsOptions));

app.use('/switch', switchHandler);
app.use('/', (req, res, next) => {
	req.config = config;
	next();
});
app.use('/', (req, res, next) => {
	try {
		const {host} = req.headers;

		if (!req.config.mode[host] || (req.config.mode[host] === "default") || !req.config.mapping[req.config.mode[host]]) {
			next();
		} else {
			const file = path.join(__dirname,
				req.config.alternate,
				'/',
				req.config.mapping[req.config.mode[host]][0]
			);

			res.status(req.config.mapping[req.config.mode[host]][1])
				.sendFile(file);
		}
	}
	catch(e) {
		console.log(e);
		next();
	}
});

app.use(express.static(path.join(__dirname, serve)));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, serve, 'index.html'));
});
app.get('/lots', function(req, res) {
	res.sendFile(path.join(__dirname, serve, 'index.html'));
});
app.get('/static/*', function(req, res) {
	res.sendFile(path.join(__dirname, serve));
});

app.get('/meta', function(req, res) {
	const meta = `<strong>POD</strong>&nbsp;&nbsp;&nbsp;${os.hostname()}`
	res.send({ meta });
});

app.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, serve, '404.html'));
});

server
	.on('listening', () => console.log(`auction-frontent-server is running on port ${port}...`))
	.on('error', err => console.error(err.message || err));

server.listen(port);
