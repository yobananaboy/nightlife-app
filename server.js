const http = require('http');
const path = require('path');

const express = require('express');
const yelpClient = require('./config/yelp');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const database = require('./config/database');
const async = require('async');
const _ = require('underscore');

require('./config/passport')(passport);

const server = http.createServer(app);

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());

app.use(session({
  secret: 'nightlifeapp',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app, yelpClient, database, passport, async, _);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
