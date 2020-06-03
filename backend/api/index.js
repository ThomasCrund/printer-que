var express = require('express')
var router = express.Router()
require('dotenv').config();

var auth = require('./auth.js');

router.use('/auth', auth.router);

router.use(auth.checkAuth);

//Setup Api's
router.use('/org', require('./organisation').router);

module.exports = router