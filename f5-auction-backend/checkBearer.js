const AuthServices = require('./model/Services/authServices');

module.exports = async (req, res, next) => {
	const BEARER = req.get('BEARER');
	if (!BEARER) {
		res.status(401).send('bearer required');
		return;
	}
	const authServices = new AuthServices();
	const userInfo = await authServices.authBearer(BEARER);
	if (!userInfo) {
		res.status(401).send('unauthorised');
		return;
	}
	req.context = {
		user: userInfo
	};
	
	next();
};
