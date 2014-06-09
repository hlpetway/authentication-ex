'use strict';

var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var noteRoutes = require('./routes/noteRoutes');
var passport = require('passport');

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('secret', process.env.SECRET || 'developmentsecret');
app.set('apiBase', '/api/v1/');

app.use(bodyparser.json());
app.use(express.static( __dirname + '/dist'));
app.use(passport.initialize());

require('./lib/passport')(passport);

require('./routes/noteRoutes')(app, passport);
require('./routes/userRoutes')(app, passport);
mongoose.connect('mongodb://localhost/notes-development');

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Server running on ' + app.get('port'));
});

