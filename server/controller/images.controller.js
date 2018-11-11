const path = require('path');
const fs = require('fs');

const Image = require('../model/images');

// set image file types
const IMAGE_TYPES = ['image/jpeg','image/jpg', 'image/png'];

exports = module.exports = {};

exports.show = (req, res) => {
	Image.find().sort('-created').populate('user').exec(function(error, images) {
		if (error) {
			return res.status(400).send({
				message: error
			});
		}
		// REnder galley
		res.render('images-gallery', {
			title: 'Images Gallery',
			images: images
		});
	});
}

// Image upload
exports.uploadImage = function(req, res) {
	console.info(`in images controller req.file: ${JSON.stringify(req.file, null, 4)}
	process.cwd(): ${process.cwd()}`);
	let src;
	let dest;
	let targetPath;
	let targetAbsPath;
	let tempPath = req.file.path;
	// check support file types
	if (IMAGE_TYPES.indexOf(req.file.mimetype) === -1) {
		return res.status(415).send('Supported image formats: jpeg, jpg, jpe, png.');
	}
	targetPath = path.join(process.cwd(), '/public/images/');
	if (!fs.existsSync(targetPath)){
		fs.mkdirSync(targetPath);
	}

	// Set new path to images
	targetAbsPath = targetPath + req.file.originalname;
	// using read stream API to read file
	src = fs.createReadStream(tempPath);
	// using a write stream API to write file
	dest = fs.createWriteStream(targetAbsPath);
	src.pipe(dest);

	// Show error
	src.on('error', function(err) {
		if (err) {
			return res.status(500).send({
				message: error
			});
		}
	});

	// Save file process
	src.on('end', function() {
		// create a new instance of the Images model with request body
		let image = new Image(req.body);
		// Set the image file name
		image.imageName = req.file.originalname;
		// Set current user (id)
		image.user = req.user;
		// save the data received
		image.save(function(error) {
			if (error) {
				return res.status(400).send({
					message: error
				});
			}
		});
		// remove from temp folder
		fs.unlink(tempPath, function(err) {
			if (err) {
				return res.status(500).send('Woh, something bad happened here');
			}
			// Redirect to galley's page
			res.redirect('images-gallery');

		});
	});
}

// Images authorization middleware
exports.hasAuthorization = function(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}
