// ==== Get env vars ====
// ======================

var dotenv = require('dotenv');
dotenv.load();

// ==== Basic requires ====
// ========================

// Express

var express = require('express');
var app = express();

// Socket.io

var http = require('http').Server(app);
var io = require('socket.io')(http);

// Personal info for feeds, twitter, steam, etc

var siteData = require('./site-data.json');
var feeds = require('./feeds.json');
var twit = require('twitter');
var Steam = require('steam-webapi');

// ==== Get keys =====
// ===================

Steam.key = process.env.STEAM_API_KEY;

// ==== App ====
// =============

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/../public'));

app.get('/', function(req, res) {
  res.render('index.jade', siteData);
});

io.on('connection', function(socket) {
  console.log('New connection!');
  socket.on('disconnect', function() {
    console.log('Lost connection!');
  });
});

http.listen(1337, function() {
  console.log('Listening on *.1337');
});