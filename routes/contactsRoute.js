const express = require('express');
const contact = require('../controller/contact.controller');

const contactsRouter = express.Router();

contactsRouter.post('/', contact.create);

contactsRouter.get('/', contact.readAll);

contactsRouter.get('/:userName', contact.read);

contactsRouter.put('/:userName', contact.update);

contactsRouter.delete('/:userName', contact.delete);

module.exports = contactsRouter;