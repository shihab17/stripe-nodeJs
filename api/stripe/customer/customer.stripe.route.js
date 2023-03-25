const express = require('express');
const isAuthenticated = require('../../../middleware/authorization');
const router = express.Router();
const customerController = require('./customer.stripe.controller');
router.post('/', isAuthenticated, customerController.create);
router.get('/', isAuthenticated, customerController.get);
module.exports = router;