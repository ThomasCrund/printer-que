/* eslint-disable no-unused-vars */
var express = require('express');
var router = express.Router();
const database = require('../database');

router.post('/create', async function(req, res) {
    /**
     * Request Format
     * {
     *   "name": string
     *   "domainJoin": bool
     * }
     */
    var UserData = await database.getUserData(req.UserId)

    if (UserData.organisationId != null) {         
        res.send({
            'success': false,
            'message': "In Org allready"
        })
        return;
    }
    var domain = null
    var insertRequestRes;
    if (req.body.domainJoin === true) {
        domain = UserData.domain;
        let sqlAddData = "INSERT INTO organisation (name, domain) VALUES (\"" + req.body.name + "\", \"" + domain + "\")"
        insertRequestRes = await database.query(sqlAddData);
    } else {
        let sqlAddData = "INSERT INTO organisation (name) VALUES (\"" + req.body.name + "\")"
        insertRequestRes = await database.query(sqlAddData, req.body.name);
    }
    var userUpdateRes
    if (insertRequestRes.insertId !== null) {
        var sql = "UPDATE user SET organisationId = '" + insertRequestRes.insertId + "' WHERE id = ?";
        userUpdateRes = await database.query(sql, UserData.id);
    }
   
    res.send({
        'userid': req.UserId,
        'success': (insertRequestRes.affectedRows === 1 && userUpdateRes.affectedRows === 1) ? true : false
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

    var OrgData = await database.query("SELECT domain FROM organisation WHERE organisation.id = ?", UserData.organisationId);

    console.log(OrgData);
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

router.get('/users', async function(req, res) { // Return the list of users for the admin to see
    console.log("Users")
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (UserData.role === "admin") {
        var userList = await database.query("SELECT email,id,role FROM user WHERE user.organisationId = ?", UserData.organisationId);
        console.log(userList);
        res.send({
            'users': userList
        })
    } else {
        res.status(403);
        res.send();
    }

})


router.post('/example', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    res.send({
        'userid': req.UserId
    })
})

module.exports = {router};