var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log('getting static files from ', __dirname + '/public');
app.use(express.static(__dirname + '/public'));

mongoose.connect(process.env.mongodb + 'yenda');
console.log('connecting to mongodb at ', process.env.mongodb);

require('./routes.js')(app, express);

var port = process.env.devPort || 1337;
console.log('server is listening on port ' + port);

app.listen(port);

module.exports = app;