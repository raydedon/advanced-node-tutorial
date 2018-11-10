const express = require('express');
const router = express.Router();
// get gravatar icon from email
const gravatar = require('gravatar');
// get Comments model
const Comment = require('../model/comments');

/* GET all comments. */
router.get('/', hasAuthorization, function(req, res, next) {
	console.info('in comments route');
	Comment.find()
		.sort('-created')
		.populate('user')
		.then(comments => {
			console.info(`in comments route: ${comments}`);
			res.render('comments', {
				title: 'Comments Page',
				comments: comments
			});
		})
		.catch(err => {
			console.info(`in comments route: ${err}`);
			res.status(400).send({message: err.message || 'Some error occurred while retrieving Comments.'});
		});
});

/* Create comments */
router.post('/', hasAuthorization, (req, res, next) => {
	// create a new instance of the Comment model with request body
	let comment = new Comment(req.body);
	// Set current user (id)
	comment.user = req.user;
	// save the data received
	comment.save()
		.then(() => {
			res.redirect('/comments');
		})
		.catch(err => {
			res.status(400).send({
				message: err.message || 'Some error occurred while creating the Comment.'
			});
		});
});

// Check authorization
function hasAuthorization(req, res, next) {
	console.info('in hasAuthorization');
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};

// Exports all the routes to router variable
module.exports = router;
