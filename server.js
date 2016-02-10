var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var dbauth = fs.readFileSync('dbauth.txt').toString().split(";");

mongoose.connect('mongodb://' + dbauth[0] + ":" + dbauth[1] + '@localhost/gevents');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.listen(3000);
console.log('REST server running on port 3000');
