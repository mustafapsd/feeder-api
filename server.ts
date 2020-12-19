
import dayjs = require('dayjs');
import * as express from 'express';

var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const PORT = process.env.PORT || 3000;
var today: Date = new Date();
var container: number = 0;
var stock: number = 0;
var add: boolean = false;
var willadd: number = 0;

var machine = {
    container: container,
    stock: stock,
    lasttime: dayjs(today).format('DD/MM/YYYY HH:mm'),
    add: add,
    willadd: 0
}




app.get("/stock", function(req, resp, err){
    resp.status(200).send(JSON.stringify(machine))
})

app.post("/refresh", function(req, resp){

    var bodyStr: any = null;

    req.on('data', function(chunk){
        bodyStr += chunk.toString();
        console.log(bodyStr);
        
    });
    resp.status(200).send("ok")
})

app.listen(3000, () => console.log(`App is running`));