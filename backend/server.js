var express = require('express');
var app = express();

// Setup Port
const port = 8080;

var api = require('./api')

// Setup the static websites to all 
app.use(express.static('public'));

// Setup api for use
app.use('/api', api);

// Start running the server
app.listen(port, () => console.log(`App Running at http://localhost:${port}`))