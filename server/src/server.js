var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('routes.js')(app, express);

var port = process.env.devPort || 1337;
console.log('server is listening on port ' + port);

app.listen(port);