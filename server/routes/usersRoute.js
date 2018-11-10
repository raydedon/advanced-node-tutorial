const express = require('express');
const User = require('../controller/user.controller');

const usersRouter = express.Router();

usersRouter.post('/', User.create);

usersRouter.get('/', User.readAll);

usersRouter.get('/:userName', User.read);

usersRouter.put('/:userName', User.update);

usersRouter.delete('/:userName', User.delete);

module.exports = usersRouter;