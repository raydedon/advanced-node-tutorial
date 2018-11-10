const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const saltRounds = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
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

userSchema.virtual('gravatar').get(function() {
	return gravatar.url(this.email ,  {s: '80', r: 'x', d: 'retro'}, true);
});

// Encrypt Password
userSchema.statics.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Verify if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// create the model for user and expose it to our app
module.exports = mongoose.model('User', userSchema);