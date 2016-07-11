'use strict';

var User = require('./user.model').User,
    config  = require('../../config/environment'),
    jwt  = require('jsonwebtoken');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
function index(req, res) {
  return User.find({}, '-salt -hashedPassword').exec()
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}
module.exports.index = index;

/**
 * Creates a new user
 */
function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({token: token});
    })
    .catch(validationError(res));
}
module.exports.create = create;

/**
 * Get a single user
 */
function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(function(user) {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(function(err){
        next(err)
    });
}
module.exports.show = show;

/**
 * Deletes a user
 * restriction: 'admin'
 */
function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}
module.exports.destroy = destroy;

/**
 * Change a users password
 */
function changePassword(req, res, next) {
  var userId = req.user._id,
      oldPass = String(req.body.oldPassword),
      newPass = String(req.body.newPassword);
        
  return User.findById(userId).exec()
    .then(function(user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(function() {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}
module.exports.changePassword = changePassword;

/**
 * Get my info
 */
function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -hashedPassword').exec()
    .then(function(user) { 
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(function(err) {
        next(err)
    });
}
module.exports.me = me;

/**
 * Authentication callback
 */
function authCallback(req, res, next) {
  res.redirect('/');
}
module.exports.authCallback = authCallback;