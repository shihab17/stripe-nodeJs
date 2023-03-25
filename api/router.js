const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/user', require('./user/user.route'));
router.use('/auth', require('./user/auth.route'));
router.use('/file', require('./file/file.route'));
router.use('/stripe', require('./stripe/stripe.router'));

module.exports = router;
