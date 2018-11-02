const express = require('express');
const app = express();
const url = require('url');
const morgan = require('morgan');
const path = require('path');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/indexRoute');
const config = require('config');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.use((req, res, next) => {
	res.statusCode = 404;
	res.write('Page not found. Try another.');
	res.end();
});

app.listen(config.get('App.webServer.port'), (error) => {
	console.log('Server listening on port');
});
