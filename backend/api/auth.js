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
  return payload = ticket.getPayload();
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
        console.log(payload);

        const sql = "SELECT * FROM user WHERE user.id = ?";

        var dataBaseUserData = await database.query(sql, userid);
        if (dataBaseUserData.length == 1) {
            res.send({
                "response": "Login Success: A Exisiting user returning",
                "loginStatus": true,
                "newUser": false
            })
            return;
        }

        var newUserData = [userid, payload['email']];
        var insertReturn = await database.query("INSERT INTO user (id, email) VALUES ('" + userid + "', '" + payload['email'] + "')");

        res.send({
            "response": "Login Success: A new user joining the platform",
            "loginStatus": true,
            "newUser": true
        })
    } catch (error) {
        console.log(error);
        res.status(500)
        .send({
            "response": error,
            "loginStatus": false,
            "newUser": false
        })
    }
    
});




module.exports = router;