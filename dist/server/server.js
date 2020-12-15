"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs = require("dayjs");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
var today = new Date();
var container = 0;
var stock = 0;
var machine = {
    container: container,
    stock: stock,
    lasttime: dayjs(today).format('DD/MM/YYYY HH:mm')
};
//initialize a simple http server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    //connection is up, let's add a simple simple event
    ws.on('message', (data) => {
        console.log(JSON.parse(data));
        today = new Date();
        data = JSON.parse(data);
        container = Number(data.container);
        stock = Number(data.stock);
        machine = { container: container, stock: stock, lasttime: dayjs(today).format('DD/MM/YYYY HH:mm') };
        ws.send(JSON.stringify(machine));
    });
    setInterval(() => {
        ws.send(JSON.stringify(machine));
    }, 500);
    ws.send(JSON.stringify(machine));
});
//start our server
server.listen(process.env.PORT || 3000, () => {
    var _a;
    console.log(`Server started on port ${(_a = server.address()) === null || _a === void 0 ? void 0 : _a.toString} :)`);
});
//# sourceMappingURL=server.js.map