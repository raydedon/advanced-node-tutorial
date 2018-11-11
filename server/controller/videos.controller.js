const path = require('path');
const fs = require('fs');

const Video = require('../model/videos');

// set image file types
var VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/ogv'];

exports = module.exports = {};

exports.show = (req, res) => {
	Video.find().sort('-created').populate('user').exec(function(error, videos) {
		if (error) {
			return res.status(400).send({
				message: error
			});
		}
		// Render gallery
		res.render('videos', {title: 'Videos Gallery', videos});
	});
}

// Image upload
exports.uploadVideo = function(req, res) {
	let src;
	let dest;
	let targetPath;
	let targetAbsPath;
	let tempPath = req.file.path;
	// check support file types
	if (VIDEO_TYPES.indexOf(req.file.mimetype) === -1) {
		return res.status(415).send('Supported video formats: mp4, webm, ogg, ogv');
	}
	targetPath = path.join(process.cwd(), '/public/videos/');
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
		let video = new Video(req.body);
		// Set the video file name
		video.videoName = req.file.originalname;
		// Set current user (id)
		video.user = req.user;
		// save the data received
		video.save(function(error) {
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
			res.redirect('videos');

		});
	});
}

// Images authorization middleware
exports.hasAuthorization = function(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}
