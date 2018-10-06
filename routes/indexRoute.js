let express = require('express');

const indexRouter = express.Router();

indexRouter.get('/', (req, res, next) => {
	res.send(`This is home page. time: ${new Date(req.requestTime).toDateString()}. first handler`);
	next();
});

indexRouter.get('/', (req, res) => {
	res.end(req.requestTime);
});

indexRouter.get('/greet', (req, res) => {
	let queryObject = url.parse(req.url, true).query;
	let greeting = queryObject.greeting || 'Default greeting';
	res.send(`This is the first node route using url parse. ${greeting}`);
});

exports = module.exports = indexRouter;