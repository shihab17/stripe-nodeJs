const express = require('express');
const router = express.Router();
const fileController = require('./file.controller.');
router.post('/', fileController.create);
module.exports = router;
