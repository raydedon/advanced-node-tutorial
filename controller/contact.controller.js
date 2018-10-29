const Contact = require('../model/contact');

exports = module.exports = {};

exports.create = (req, res) => {
	// Create a Contact
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
	const contact = new Contact({name, phoneNumber, email, userName, password, gender, country, state, pinCode});

	// Save Contact in the database
	contact.save()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Contact.'
			});
		});
};

exports.read = (req, res) => {
	Contact.find({userName: req.param.userName})
		.then(contacts => {
			res.send(contacts);
		})
		.catch(err => {
			res.status(500).send({message: err.message || 'Some error occurred while retrieving Contacts.'});
		});
};

exports.update = (req, res) => {
	let {userName = '', } = req.params;
	Contact.findOneAndUpdate({userName}, {$set: req.body})
		.then(contacts => {
			res.send(contacts);
		})
		.catch(err => {
			res.status(500).send({message: err.message || 'Some error occurred while updating Contacts.'});
		});
};

exports.delete = (req, res) => {
	let {userName = '', } = req.params;
	Contact.findOneAndDelete({userName})
		.then(contact => {
			res.send(contact);
		})
		.catch(err => {
			res.status(500).send({message: err.message || 'Some error occurred while updating Contacts.'});
		});
};

