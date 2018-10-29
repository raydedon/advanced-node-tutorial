const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
	name: String,
	phoneNumber: String,
	email: String,
	userName: String,
	password: String,
	gender: Number,
	country: String,
	state: String,
	pinCode: String
});

module.exports = mongoose.model('Contact', contactSchema);