// then in your app
var express = require('express')
var bodyParser = require('body-parser')
 
var app = express()
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var stock = 50;
var container = 9.4;

app.get('/stock', function (req, res, next) {
    res.status(200).json({'stock': stock, 'container': container});
});

app.post('/refresh', function (req, res, next) {
    
    console.log(req);
    
    stock = req.query.stock
    container = req.query.container

    res.status(200).json({'stock': stock, 'container': container});
});

app.listen(3000, () => console.log(`App is running`));