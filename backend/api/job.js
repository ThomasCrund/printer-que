/* eslint-disable no-unused-vars */
var express = require('express');
var router = express.Router();
const database = require('../database');

router.get('/', async function(req, res) {
    // eslint-disable-next-line no-unused-vars
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userName': req.UserId
    })
})

router.get('/:id', async function(req, res) {
    // eslint-disable-next-line no-unused-vars
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userName': req.UserId
    })
})

router.get('/user', async function(req, res) {
    // eslint-disable-next-line no-unused-vars
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userName': req.UserId
    })
})

router.post('/new', async function(req, res) {
    // eslint-disable-next-line no-unused-vars
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userName': req.UserId
    })
})

router.get('/:id/printFile', async function(req, res) {
    // eslint-disable-next-line no-unused-vars
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userName': req.UserId
    })
})

router.post('/:id/printFile', async function(req, res) {
    // eslint-disable-next-line no-unused-vars
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userName': req.UserId
    })
})

router.delete('/:id', async function(req, res) {
    // eslint-disable-next-line no-unused-vars
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userName': req.UserId
    })
})

router.delete('/:id/printFile', async function(req, res) {
    // eslint-disable-next-line no-unused-vars
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userName': req.UserId
    })
})

module.exports = {router};