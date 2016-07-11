'use strict';

var Router = require('express').Router,
    controller = require('./review.controller'),
    auth = require('../../auth/auth.service');

var router = new Router();

router.get('/:id', controller.show);
router.post('/:id', auth.isAuthenticated(), controller.create);

module.exports = router;