let express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const loginAPI = express.Router();

loginAPI.get('/', (req, res) => {
	res.render('login', {
		message: 'this is message'
	});
});

loginAPI.post('/', (req, res) => {
	console.log(`email: ${req.body.username} password: ${req.body.password}`);
	res.send('login succesfull');
});

exports = module.exports = loginAPI;