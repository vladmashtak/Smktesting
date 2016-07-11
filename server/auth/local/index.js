'use strict';

var express = require('express'),
    passport = require('passport'),
    signToken = require('../auth.service').signToken;

var router = express.Router();

router.post('/', function(req, res, next) {
  console.log('BODY: ',req.body );
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;

    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id, user.role);

    res.json({token: token});
  })(req, res, next)
});

module.exports = router;
