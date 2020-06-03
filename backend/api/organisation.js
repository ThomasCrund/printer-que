var express = require('express');
var router = express.Router();
const database = require('../database');

router.post('/create', (req, res) => {
    res.send({
        'userid': req.UserId
    })
})

module.exports = {router};