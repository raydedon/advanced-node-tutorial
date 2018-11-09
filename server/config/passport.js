const LocalStrategy    = require('passport-local').Strategy;
const User = require('../model/user');
module.exports = function(passport) {
	// passport init setup
	// serialize the user for the session
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	// deserialize the user
	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use('local-login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, userName, password, done) {
			if (userName)
			// format to lower-case
				userName = userName.toLowerCase();
			// process asynchronous
			process.nextTick(function() {
				User.findOne({userName}, function(err, user) {
					// if errors
					if (err)
						return done(err);
					// check errors and bring the messages
					if (!user)
						return done(null, false, req.flash('loginMessage', 'No user found.'));
					if (!user.validPassword(password))
						return done(null, false, req.flash('loginMessage', 'Wohh! Wrong password.'));
					// everything ok, get user
					else
						return done(null, user);
				});
			});
		}));
	// Signup local strategy
	passport.use('local-signup', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, userName, password, done) {
			if (userName)
			// format to lower-case
				userName = userName.toLowerCase();
			// asynchronous
			process.nextTick(function() {
				// if the user is not already logged in:
				if (!req.user) {
					User.findOne({userName}, function(err, user) {
						// if errors
						if (err)
							return done(err);
						// check userName
						if (user) {
							return done(null, false, req.flash('signupMessage', 'Wohh! the userName is already taken.'));
						} else {
							// create the user
							var newUser = new User();
							// Get user name from req.body
							newUser.name = req.body.name;
							newUser.userName = userName;
							newUser.password = newUser.generateHash(password);
							// save data
							newUser.save(function(err) {
								if (err)
									throw err;
								return done(null, newUser);
							});
						}
					});
				} else {
					return done(null, req.user);
				}
			});
		}));

}