'use strict';

var express = require('express'),
    config = require('../config/environment'),
    User = require('../api/user/user.model').User;

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;
