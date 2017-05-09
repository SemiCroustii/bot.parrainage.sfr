#!/usr/bin/env node
var express = require("express");
var app = express();
var Spooky = require('spooky');
var PushBullet = require('pushbullet');
var parrainerRed = require('./parrainageRed');

app.use(express.logger());

// Web Server Method Block
app.get('/', function(reques, response) {  
    response.send('Hello !');
});

app.get('/parrainage.sfr/:email', function(request, response) {
    var email = request.param('email');
    parrainerRed(email, { login: process.env.LOGIN_SFR, pass: process.env.PASS_SFR }, function (result, log) {
        var date = new Date().toLocaleString();
        var ipClient = request.headers["x-forwarded-for"];
        if (ipClient) {
            var list = ipClient.split(",");
            ipClient = list[list.length-1];
        } else {
            ipClient = request.connection.remoteAddress;
        }

        // NOTIFICATION
        var pusher = new PushBullet(process.env.PUSHBULLET_API);
        pusher.note(process.env.PUSHBULLET_DEVICE_KEY, 'Parrainage red', 'DATE: ' + date + '\nIP: ' + ipClient + '\nMAIL: ' + email + '\nRES: ' + result, function(error, response) {});
        
        response.send(result);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
