
import dayjs = require('dayjs');
import * as express from 'express';
import * as WebSocket from 'ws';

const app = express();
const PORT = process.env.PORT || 3000;
var today: Date = new Date();
var container: number = 0;
var stock: number = 0;
var add: boolean = false;
var willad: number = 0;

var machine = {
    container: container,
    stock: stock,
    lasttime: dayjs(today).format('DD/MM/YYYY HH:mm'),
    add: add,
    willadd: 0
}

//initialize a simple http serve
const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple even
    ws.on('message', (data: any) => {

        console.log(JSON.parse(data))
        today = new Date()
        data = JSON.parse(data)
        container = Number(data.container)
        stock = Number(data.stock)
        add = Boolean(data.add)
        willad = Number(data.willadd)

        machine = { container: container, stock: stock, lasttime: dayjs(today).format('DD/MM/YYYY HH:mm'), add: add, willadd: willad }



        ws.send(JSON.stringify(machine));

        wss.clients.forEach(client => {
            client.send(JSON.stringify(machine))
        })
    });

    ws.send(JSON.stringify(machine));
});