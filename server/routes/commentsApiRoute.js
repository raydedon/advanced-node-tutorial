const express = require('express');
const commentsApiRouter = express.Router();
// get gravatar icon from email
const gravatar = require('gravatar');
// get Comments model
const Comment = require('../controller/comments.controller');

/* GET all comments. */
commentsApiRouter.get('/', Comment.readAll);

/* Create comments */
commentsApiRouter.post('/', Comment.create);

/* Get comment by */
commentsApiRouter.get('/:commentId', Comment.read);

// Exports all the routes to router variable
module.exports = commentsApiRouter;
