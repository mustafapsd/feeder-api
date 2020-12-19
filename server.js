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
var add = false;
var willad = 0;
var machine = {
    container: container,
    stock: stock,
    lasttime: dayjs(today).format('DD/MM/YYYY HH:mm'),
    add: add,
    willadd: 0
};
//initialize a simple http serve
var server = express().listen(PORT, function () { return console.log("Listening on " + PORT); });
var wss = new WebSocket.Server({ server: server });
wss.on('connection', function (ws) {
    //connection is up, let's add a simple simple even
    ws.on('message', function (data) {
        console.log(JSON.parse(data));
        today = new Date();
        data = JSON.parse(data);
        container = Number(data.container);
        stock = Number(data.stock);
        add = Boolean(data.add);
        willad = Number(data.willadd);
        machine = { container: container, stock: stock, lasttime: dayjs(today).format('DD/MM/YYYY HH:mm'), add: add, willadd: willad };
        ws.send(JSON.stringify(machine));
        wss.clients.forEach(function (client) {
            client.send(JSON.stringify(machine));
        });
    });
    ws.send(JSON.stringify(machine));
});
