// ==== Get env vars ====
// ======================

var dotenv = require('dotenv');
dotenv.load();

// ==== Basic requires ====
// ========================

var path = require('path');
var util = require('util');

var sass = require('node-sass');

var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('./config.json');
var twitter = require('twitter');
var Steam = require('steam-webapi');
var graph = require('fbgraph');
var ig = require('instagram-node').instagram();
var google = require('googleapis');
var plus = google.plus('v1');

// ==== Get keys =====
// ===================

//var twit = new twitter({
//  consumer_key: process.env.TWITTER_CONSUMER_KEY,
//  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
//});
//
//Steam.key = process.env.STEAM_API_KEY;
//
//graph.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);
//
//ig.use({
//  client_id: process.env.INSTAGRAM_CLIENT_ID,
//  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
//});

var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// ==== App ====
// =============

app.use(sass.middleware({
  src: __dirname + '/sass',
  dest: __dirname + '/public',
  outputStyle: 'compressed',
  debug: 'true'
}));

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index.jade', config);
});

io.on('connection', function(socket) {
  console.log('New connection!');
  socket.on('disconnect', function() {
    console.log('Lost connection!');
  });
  plus.people.get({ auth: GOOGLE_API_KEY, userId: config.networks.google.username }, function(err, user) {
    io.emit('google user', user);
  });
});

http.listen(1337, function() {
  console.log('Listening on *.1337');
});

// ==== Social Feed ====
// =====================

console.log(GOOGLE_API_KEY);
console.log(config.networks.google.username);
