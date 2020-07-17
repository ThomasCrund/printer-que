var express = require('express')
var router = express.Router()

var bodyParser = require('body-parser')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('352457740735-jfb04rk50ha6orp611bei2sko4mfn6di.apps.googleusercontent.com');

const database = require('../database');

// create application/json parser
var jsonParser = bodyParser.json()

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '352457740735-jfb04rk50ha6orp611bei2sko4mfn6di.apps.googleusercontent.com',
  });
  return ticket.getPayload();
}

router.post('/login', jsonParser, async function(req, res) {
    try {
        const payload = await verify(req.body.token)
        .catch((err) => {
            res.status(403)
            .send({
                "response": err,
                "loginStatus": false,
                "newUser": false
            })
            throw err; 
        });
        const userid = payload['sub'];
        //console.log(payload);

        const sql = "SELECT * FROM user WHERE user.id = ?";

        var dataBaseUserData = await database.query(sql, userid);
        if (dataBaseUserData.length === 1) {
            let sessionToken = await CreateAccessToken(userid, payload['exp']);
            if (sessionToken == null) { throw new Error("User not in database"); };
            res.send({
                "response": "Login Success: A Exisiting user returning",
                "loginStatus": true,
                "newUser": false,
                "sessionToken": sessionToken
            })
        } else {
            const domain = payload['hd'];
            if (domain != null) {
                await database.query("INSERT INTO user (id, email,domain) VALUES ('" + userid + "', '" + payload['email'] + "', '" + domain + "')");
            } else {
                await database.query("INSERT INTO user (id, email) VALUES ('" + userid + "', '" + payload['email'] + "')");
            }
            let sessionToken = await CreateAccessToken(userid, payload['exp']);
            if (sessionToken == null) { throw new Error("User not in database") };
            res.send({
                "response": "Login Success: A new user joining the platform",
                "loginStatus": true,
                "newUser": true,
                "sessionToken": sessionToken
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500)
        .send({
            "response": error,
        })
    }
    
});

async function CreateAccessToken(id, exp) {
    var secureToken = await makeid(18);
    var createTokenData =  await database.query("UPDATE user SET sessionExp = '" + exp + "', sessionToken = '" + secureToken + "' WHERE id = '" + id + "'")
    //console.log(createTokenData);
    if (createTokenData.changedRows === 1) {
        return secureToken;
    } else {
        return null;
    }
}

async function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function checkAuth(req, res, next) {
    var sessionToken = req.get("Authorization");
    var requestsDate = new Date();
    var userData = await database.query("SELECT id,sessionExp FROM user WHERE user.sessionToken = ?", sessionToken);
    if (userData.length === 1) {
        var requestTimeSec = Math.round(requestsDate.getTime()/1000);
        if (requestTimeSec < userData[0].sessionExp) {
            req.UserId = userData[0].id;
            //console.log("Went Through", req.UserId);
            next();
        } else {
            //console.log("Failed Exp");
            res.status(401).send({ "auth": false, "message": "time expired"});
        }
    } else {
        //console.log("Failed Equal");
        res.status(401).send({ "auth": false, "message": "incorrect token"});
    }
    //console.log(userData);
}

module.exports = {
  router,
  checkAuth
};
