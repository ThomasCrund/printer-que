var express = require('express')
var router = express.Router()

var bodyParser = require('body-parser')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('352457740735-jfb04rk50ha6orp611bei2sko4mfn6di.apps.googleusercontent.com');

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
    const payload = await verify(req.body.token);
    const userid = payload['sub'];
    console.log(payload);
    console.log(userid);

    res.send({
        "response": "It Worked!!",
        "loginStatus": true,
        "newUser": true
    })
});

router.get('/login', function(req, res) {
    res.send("This is a test");
});


module.exports = router;