const createError = require('http-errors');
const express = require('express');
const app = express();
const url = require('url');
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const config = require('config');
const mongoose = require('mongoose');

const indexRouter = require('./routes/indexRoute');
const loginRouter = require('./routes/loginRoute');
const contactsRouter = require('./routes/contactsRoute');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.get('MongoDB.connectionString'))
	.then(() => {
		console.log('Successfully connected to the database');
	})
	.catch(err => {
		console.log(`Could not connect to the database. Exiting now...${err}`);
		process.exit();
	});



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
app.use('/contact', contactsRouter);

app.use((req, res) => {
	res.status(404).send('Page not found. Try another.');
});

app.listen(3000, (error) => {
	console.log('Server listening on port');
});

