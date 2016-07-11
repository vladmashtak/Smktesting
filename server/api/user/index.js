'use strict';

var Router = require('express').Router,
    controller = require('./user.controller'),
    auth = require('../../auth/auth.service');

var router = new Router();

router.get('/', controller.index);
router.delete('/:id',  controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
