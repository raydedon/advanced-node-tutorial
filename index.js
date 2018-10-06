const express = require('express');
const app = express();
const url = require('url');
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
let indexRouter = require('./routes/indexRoute');
let loginRouter = require('./routes/loginRoute');

let myLogger = (req, res, next) => {
	console.log('LOGGED');
	next();
};

let requestTime = (req, res, next) => {
	req.requestTime = Date.now();
	next();
};



app.use(morgan('short'));
app.use(myLogger);
app.use(requestTime);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/login', loginRouter);

app.use((req, res) => {
	res.status(404).send('Page not found. Try another.');
});

app.listen(3000, (error) => {
	console.log(`Server listening on port`);
});

