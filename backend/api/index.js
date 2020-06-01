var express = require('express')
var router = express.Router()
require('dotenv').config();

var auth = require('./auth.js');

router.use('/auth', auth);

module.exports = router