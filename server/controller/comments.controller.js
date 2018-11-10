// get gravatar icon from email
const gravatar = require('gravatar');
// get Comment model
const Comment = require('../model/comments');

exports.read = (req, res) => {
	// Get Comment by id
	Comment.findById(req.params.commentId)
		.then(comment => {
			res.send(comment);
		})
		.catch(err => {
			res.status(500).send({message: err.message || 'Some error occurred while retrieving Comment by ID.'});
		});
};

// List Comments
exports.readAll = function(req, res) {
	// List all comments and sort by Date
	Comment.find()
		.sort('-created')
		.populate('user')
		.then(comments => {
			res.send(comments);
		})
		.catch(err => {
			res.status(500).send({message: err.message || 'Some error occurred while retrieving Comments.'});
		});
};
// Create Comment
exports.create = function(req, res) {
	// create a new instance of the Comment model with request body
	let comment = new Comment(req.body);
	// Set current user (id)
	comment.user = req.user;
	// save the data received
	comment.save()
		.then(comment => {
			res.send(comment);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Comment.'
			});
		});
};
// Comments authorization middleware
exports.hasAuthorization = function(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
};
