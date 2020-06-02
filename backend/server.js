var express = require('express');
var app = express();

// Setup Port
const port = 8080;

// Setup the static websites to all 
app.use(express.static('public'));

// Setup api for use
var api = require('./api')
app.use('/api', api);

//Connect to sql server
const sqlCon = require('./database').connection;
sqlCon.connect();

// Start running the server
app.listen(port, () => console.log(`App Running at http://localhost:${port}`))