"use strict";
exports.__esModule = true;
var dayjs = require("dayjs");
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var PORT = process.env.PORT || 3000;

var today = new Date();
var container = 0;
var stock = 0;
var add = false;
var willadd = 0;
var machine = {
    container: container,
    stock: stock,
    lasttime: dayjs(today).format('DD/MM/YYYY HH:mm'),
    add: add,
    willadd: 0
};
app.get("/stock", function (req, resp, err) {
    resp.status(200).send(JSON.stringify(machine));
});


app.post("/refresh", function (req, resp) {
    machine.container = req.body.container
    machine.stock = req.body.stock
    machine.add = req.body.add
    machine.willadd = req.body.willadd
    machine.lasttime = dayjs(new Date()).format('DD/MM/YYYY HH:mm'),


    resp.status(200).send(machine);
});

app.listen(PORT, function () { return console.log("App is running"); });
