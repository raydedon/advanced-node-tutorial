const express = require('express');
const passport = require('passport');
const gravatar = require('gravatar');

const indexRouter = express.Router();

indexRouter.get('/', preventNextIfLoggedIn, (req, res, next) => {
	console.info(`session: ${JSON.stringify(req.session, null, 4)}`);
	res.render('index', {
		title: 'Contacts'
	});
});

/* GET login page. */
indexRouter.get('/login', preventNextIfLoggedIn, function(req, res, next) {
	console.info(`session: ${JSON.stringify(req.session, null, 4)}`);
	res.render('login', { title: 'Login', message: req.flash('loginMessage') });
});

indexRouter.post('/login', passport.authenticate('local-login', {
	//Success go to Profile Page / Fail go to login page
	successRedirect : '/profile',
	failureRedirect : '/login',
	failureFlash : true
}));

indexRouter.get('/signup', preventNextIfLoggedIn, function(req, res, next) {
	console.info(`session: ${JSON.stringify(req.session, null, 4)}`);
	res.render('signup', { title: 'SignUp', message: req.flash('signupMessage') });
});

indexRouter.post('/signup', passport.authenticate('local-signup', {
	//Success go to Profile Page / Fail go to Signup page
	successRedirect : '/profile',
	failureRedirect : '/signup',
	failureFlash : true
}));


indexRouter.get('/profile', isLoggedIn, function(req, res, next) {
	console.info(`session: ${JSON.stringify(req.session, null, 4)}`);
	res.render('profile', { title: 'Profile', message: 'View profiles', user : req.user, avatar: gravatar.url(req.user.email ,  {s: '100', r: 'x', d: 'retro'}, true) });
});

indexRouter.get('/comments', function(req, res, next) {
	res.render('comments', { title: 'Comments', message: 'Please put your comments below' });
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

function preventNextIfLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		res.redirect('/profile');
	next();
}

/* GET Logout Page */
indexRouter.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		req.logout();
		res.redirect('/');
	});
});

exports = module.exports = indexRouter;