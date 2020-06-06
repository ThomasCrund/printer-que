var express = require('express')
var router = express.Router()
require('dotenv').config();

var auth = require('./auth.js');

router.use('/auth', auth.router);

router.use(auth.checkAuth);

//Setup Api's
router.use('/org', require('./organisation').router);


//Api Template
router.post('/example', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userName': req.UserId
    })
})

module.exports = router