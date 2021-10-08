const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const checkBearer = require('./checkBearer');

const auth = require('./route/auth');
const user = require('./route/user');
const lot = require('./route/lot');
const bid = require('./route/bid');
const top = require('./route/top');
const image = require('./route/image');

const { port } = require('./config/config');

app.set('port', port);
app.disable('x-powered-by');

const corsOptions = {
	origin: true,
	methods: 'GET,HEAD,POST,DELETE,OPTIONS,PUT',
	credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json({
	extended: true,
	limit: '100mb',
	type: 'application/json',
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(unless(['/api/v1/auth', '/api/v1/auth/register', '/api/v1/top', '/api/v1/image/find'], checkBearer));
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/lot', lot);
app.use('/api/v1/bid', bid);
app.use('/api/v1/top', top);
app.use('/api/v1/image', image);

server
	.on('listening', () => console.log(`Help-Desk-API-server is running on port ${port}...`))
	.on('error', err => console.error(err.message || err));

server.listen(port);


function unless(path, middleware) {
	return function(req, res, next) {
		if (req.path === '/') {
			res.status(200).send({ status: 200 });
		}
		else if (path.includes(req.path)) {
			return next();
		} else {
			return middleware(req, res, next);
		}
	};
};
