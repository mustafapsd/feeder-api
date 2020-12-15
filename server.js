"use strict";
exports.__esModule = true;
var dayjs = require("dayjs");
var express = require("express");
var WebSocket = require("ws");
var app = express();
var PORT = process.env.PORT || 3000;
var today = new Date();
var container = 0;
var stock = 0;
var machine = {
    container: container,
    stock: stock,
    lasttime: dayjs(today).format('DD/MM/YYYY HH:mm')
};
//initialize a simple http server
var server = express().listen(PORT, function () { return console.log("Listening on " + PORT); });
var wss = new WebSocket.Server({ server: server });
wss.on('connection', function (ws) {
    //connection is up, let's add a simple simple event
    ws.on('message', function (data) {
        console.log(JSON.parse(data));
        today = new Date();
        data = JSON.parse(data);
        container = Number(data.container);
        stock = Number(data.stock);
        machine = { container: container, stock: stock, lasttime: dayjs(today).format('DD/MM/YYYY HH:mm') };
        ws.send(JSON.stringify(machine));
    });
    setInterval(function () {
        ws.send(JSON.stringify(machine));
    }, 500);
    ws.send(JSON.stringify(machine));
});
