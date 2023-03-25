const express = require('express');
const router = express.Router();

router.use('/customer', require('./customer/customer.stripe.route'));

module.exports = router;