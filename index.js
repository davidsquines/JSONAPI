const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(express.static('public'));
const fs = require('fs');

var data = fs.readFileSync('data.json');
var elements = JSON.parse(data);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(3000, () => {
    console.log('listening on port 3000', server.address().port);
  });



