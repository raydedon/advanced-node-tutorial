const express = require('express');
const passport = require('passport');
const gravatar = require('gravatar');
const multer  = require('multer');
const upload = multer({ dest:'./public/uploads/', limits: {files:1} });
const images  = require('../controller/images.controller');
const videos  = require('../controller/videos.controller');

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
	res.render('profile', { title: 'Profile', message: 'View profiles', user : req.user, avatar: gravatar.url(req.user.email, {s: '100', r: 'x', d: 'retro'}, true) });
});

// Setup routes for videos
indexRouter.get('/videos', videos.hasAuthorization, videos.show);
indexRouter.post('/videos', videos.hasAuthorization, upload.single('video'), videos.uploadVideo);

// Setup routes for images
indexRouter.get('/images-gallery', images.hasAuthorization, images.show);
indexRouter.post('/images', images.hasAuthorization, upload.single('image'), images.uploadImage);



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