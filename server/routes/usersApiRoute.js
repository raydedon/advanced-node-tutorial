const express = require('express');
const User = require('../controller/user.controller');

const usersApiRouter = express.Router();

usersApiRouter.post('/', User.create);

usersApiRouter.get('/', User.readAll);

usersApiRouter.get('/:userName', User.read);

usersApiRouter.put('/:userName', User.update);

usersApiRouter.delete('/:userName', User.delete);

module.exports = usersApiRouter;