const User = require('../model/user');

exports = module.exports = {};

exports.create = (req, res) => {
	// Create a User
	let {
		name = '',
		phoneNumber = '',
		email = '',
		userName = '',
		password = '',
		gender = 0,
		country = '',
		state = '',
		pinCode = ''
	} = req.body;
	const user = new User({name, phoneNumber, email, userName, password, gender, country, state, pinCode});

	// Save User in the database
	user.save()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the User.'
			});
		});
};

exports.read = (req, res) => {
	User.find({userName: req.param.userName})
		.then(users => {
			res.send(users);
		})
		.catch(err => {
			res.status(500).send({message: err.message || 'Some error occurred while retrieving Users.'});
		});
};

exports.readAll = (req, res) => {
	User.find()
		.then(users => {
			res.send(users);
		})
		.catch(err => {
			res.status(500).send({message: err.message || 'Some error occurred while retrieving Users.'});
		});
};

exports.update = (req, res) => {
	let {userName = ''} = req.params;
	User.findOneAndUpdate({userName}, {$set: {...req.body}}, {new: true, upsert:true})
		.then(users => {
			res.send(users);
		})
		.catch(err => {
			res.status(500).send({message: err.message || 'Some error occurred while updating Users.'});
		});
};

exports.delete = (req, res) => {
	let {userName = ''} = req.params;
	User.findOneAndDelete({userName})
		.then(user => {
			res.send(user);
		})
		.catch(err => {
			res.status(500).send({message: err.message || 'Some error occurred while updating Users.'});
		});
};

