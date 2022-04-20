const express = require('express');
const minimist = require('minimist');
const fs = require('fs');
const db = require("../src/services/database.js");
const morgan = require('morgan');

const app = express()
const argv = (minimist)(process.argv.slice(2));
// Serve static HTML files
app.use(express.static('./www'));

// Set valid arguments
argv["port"];

// Get port from argument, if not argument exists set to 5000
const HTTP_PORT = argv.port || 5000;


// Listen on port
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});




// Default endpoint request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

