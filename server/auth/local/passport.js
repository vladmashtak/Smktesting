var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

function localAuthenticate(User, email, password, done) {
    User.findOne({
        email: email.toLowerCase()
    }).exec()
        .then(function (user) {
            if (!user) {
                return done(null, false, {
                    message: 'This email is not registered.'
                });
            }
            console.log(user);
            if (!user.authenticate(password)) {
                return done(null, false, {message: 'This password is not correct.'});
            } else {
                return done(null, user);
            }
        }).catch(function (err) {
            done(err)
        });
}

function setup(User, config) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    }, function (email, password, done) {
        return localAuthenticate(User, email, password, done);
    }));
}

module.exports.setup = setup;