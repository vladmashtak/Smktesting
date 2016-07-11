'use strict';

var Router = require('express').Router,
    controller = require('./product.controller'),
    auth = require('../../auth/auth.service');

var router = new Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

module.exports = router;
