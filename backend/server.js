var express = require('express');
var app = express();
const port = 8080;

// Setup the static websites to all 
app.use(express.static('public'));



// Start running the server
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))