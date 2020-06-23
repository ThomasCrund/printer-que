var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
require('dotenv').config();

const database = require('../database');


var auth = require('./auth.js');

router.use('/auth', auth.router);

router.use(auth.checkAuth);

// parse application/json
router.use(bodyParser.json())

//Setup Api's
router.use('/org', require('./organisation').router);


//Api Template
router.post('/example', async function(req, res) {
    // eslint-disable-next-line no-unused-vars
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userName': req.UserId
    })
})


module.exports = router