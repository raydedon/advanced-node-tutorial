const express = require('express');

const indexRouter = express.Router();

indexRouter.get('/', (req, res, next) => {
	res.render('index', {
		title: 'Contacts'
	});
});

/* GET login page. */
indexRouter.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login', message: req.flash('loginMessage') });
});

indexRouter.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'SignUp', message: req.flash('signupMessage') });
});

indexRouter.get('/profile', function(req, res, next) {
	res.render('profile', { title: 'Profile', message: 'View profiles' });
});

indexRouter.get('/comments', function(req, res, next) {
	res.render('comments', { title: 'Comments', message: 'Please put your comments below' });
});


exports = module.exports = indexRouter;