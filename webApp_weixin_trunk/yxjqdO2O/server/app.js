var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.TIMEOUT = 100;
var modules = [
    'home',
    'personal',
    'goodsDetail',
    'categories',
    'search',
    'order',
    'distributor',
];

app.use(express.static(__dirname + '/../www'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.send = function(res, filename) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Cache-Control", "no-cache");
    setTimeout(function() {
        res.send(fs.readFileSync(filename));
    }, app.TIMEOUT);
};

for (var i in modules) {
    require('./modules/'+modules[i]).register(app);
}

app.listen(3000, function() {
    console.log("server listen on: http://localhost:3000");
});
