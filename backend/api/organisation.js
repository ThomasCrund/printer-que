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
            'message': "already in org"
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

    if (UserData.domain == null) {
        res.send({
            'orgAvalible': false,
        })
        return;
    }

    var OrgData = await database.query("SELECT name FROM organisation WHERE organisation.domain = ?", UserData.domain);

    console.log(OrgData);
    res.send({
        'orgAvalible': (OrgData.length > 0) ? true : false,
        'name': OrgData[0].name
    })
})

router.get('/token', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data

    if (UserData.domain == null) {
        res.send({
            'orgAvalible': false,
        })
        return;
    }

    var OrgData = await database.query("SELECT name FROM organisation WHERE organisation.inviteToken = ?", req.body.inviteToken);

    console.log(OrgData);
    res.send({
        'orgAvalible': (OrgData.length > 0) ? true : false,
        'name': OrgData[0].name
    })
})

router.post('/join', async function(req, res) {
    /**
     * Request Formal
     * {
     *  "domain": boolean - for whether to join based on the users domain
     *  "inviteToken": string - 6 character string to join an organisation throught a link
     * }
     */
    var UserData = await database.getUserData(req.UserId)  // Get the user's data

    if (UserData.organisationId != null) {
        res.send({
            'success': false,
            'message': 'user already in organisation'
        })
        return;
    }

    if (req.body.domain === true) {
        if (UserData.domain == null) {
            res.send({
                'success': false,
                'message': 'user not in a domain'
            })
            return;
        }
    
        let OrgData = await database.query("SELECT id FROM organisation WHERE organisation.domain = ?", UserData.domain);
        let updateSQL = `UPDATE user SET organisationId = ${OrgData[0].id}, role = 'user'  WHERE id = '${UserData.id}'`;       
        let updateResponse = await database.query(updateSQL)
        console.log(updateResponse);
        if (updateResponse.affectedRows === 1) {
            res.send({
                "success": true,
                "role": "user"
            })
        }
    } else {
        var OrgData = await database.query("SELECT id,name FROM organisation WHERE organisation.inviteToken = ?", req.body.inviteToken);
        if (OrgData.length > 0) {
            let updateSQL = `UPDATE user SET organisationId = ${OrgData[0].id}, role = 'user'  WHERE id = '${UserData.id}'`;       
            let updateResponse = await database.query(updateSQL)
            console.log(updateResponse);
            if (updateResponse.affectedRows === 1) {
                res.send({
                    "success": true,
                    "role": "user"
                })
            }
        }
    }
})

router.get('/invite', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    
    var OrgData = await database.query("SELECT inviteToken FROM organisation WHERE organisation.id = ?", UserData.organisationId);
    let token = OrgData[0].inviteToken;
    if (token == null) {
        token = await makeid(6);
        let updateRes = await database.query(`UPDATE organisation SET inviteToken = '${token}' WHERE organisation.id = ?`, UserData.organisationId);
        if (updateRes.affectedRows !== 1) {
            res.send({
                "Success": false,
                "message": "Internal Sever Error"
            })
        }
    }

    res.send({
        'token': token
    })
})

router.get('/users', async function(req, res) { // Return the list of users for the admin to see
    console.log("Users");
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    console.log(UserData);
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

router.delete('/users/:id', async function(req, res) {
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (UserData.role === "admin") {
        var userList = await database.query(`UPDATE user SET user.organisationId = NULL WHERE user.id = ? AND user.organisationId = '${UserData.organisationId}'`, req.params.id);
        res.send({
            'success': true,
        })
    } else {
        res.status(403);
        res.send();
    }

})

router.put('/users/:id', async function(req, res) {
    /**
     * Request Data
     * {
     *  "role": string 
     * }
     */
    var UserData = await database.getUserData(req.UserId)  // Get the user's data
    if (UserData.role === "admin") {
        var userList = await database.query(`UPDATE user SET user.role = '${req.body.role}' WHERE user.id = ? AND user.organisationId = '${UserData.organisationId}'`, req.params.id);
        res.send({
            'success': true,
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

async function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {router};