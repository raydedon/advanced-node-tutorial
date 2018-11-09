const express = require('express');
const user = require('../controller/user.controller');

const usersRouter = express.Router();

usersRouter.post('/', user.create);

usersRouter.get('/', user.readAll);

usersRouter.get('/:userName', user.read);

usersRouter.put('/:userName', user.update);

usersRouter.delete('/:userName', user.delete);

module.exports = usersRouter;