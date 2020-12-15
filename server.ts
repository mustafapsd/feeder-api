
import dayjs = require('dayjs');
import * as express from 'express';
import * as WebSocket from 'ws';

const app = express();
const PORT = process.env.PORT || 3000;
var today: Date = new Date();
var container: number = 0;
var stock: number = 0;
var machine = {
    container: container,
    stock: stock,
    lasttime: dayjs(today).format('DD/MM/YYYY HH:mm')
}

//initialize a simple http server
const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (data: any) => {

        console.log(JSON.parse(data))
        today = new Date()
        data = JSON.parse(data)
        container = Number(data.container)
        stock = Number(data.stock)

        machine = { container: container, stock: stock, lasttime: dayjs(today).format('DD/MM/YYYY HH:mm') }



        ws.send(JSON.stringify(machine));
    });

    setInterval(() => {
        ws.send(JSON.stringify(machine));
    }, 500)

    ws.send(JSON.stringify(machine));
});