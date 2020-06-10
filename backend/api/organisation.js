var express = require('express');
var router = express.Router();
const database = require('../database');

router.post('/create', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)
    res.send({
        'userid': req.UserId
    })
})

router.get('/', async function(req, res) {
    var UserData = await database.getUserData(req.UserId); //Get the user's data
    if (UserData.organisationId == null) { res.send({ 'inOrg': false, }); return; } //Check to make sure the user has an id

    var OrgData = await database.query("SELECT name FROM organisation WHERE organisation.id = ?", UserData.organisationId);
    if (OrgData.length !== 1) { res.send({ 'inOrg': false, }); return;  } //Check to make sure we got a organisation that matches the id on the user

    res.send({
        'inOrg': true,
        'orgName': OrgData[0].name,
        'rank': UserData.role,
    })
})

router.get('/domain', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.status(501);
    res.send({
        'userid': req.UserId
    })
})

router.post('/join', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.status(501);
    res.send({
        'userid': req.UserId
    })
})

router.post('/create', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.status(501);
    res.send({
        'userid': req.UserId
    })
})

router.get('/invite', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.status(501);
    res.send({
        'userid': req.UserId
    })
})

router.get('/users', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (UserData)
    res.status(501);
    res.send({
        'users': req.UserId
    })
})


router.post('/example', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userid': req.UserId
    })
})

module.exports = {router};