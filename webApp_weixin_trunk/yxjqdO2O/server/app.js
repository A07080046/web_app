var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var TIMEOUT = 100;

app.use(express.static(__dirname + '/../www'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.send = function(res, filename) {
    setTimeout(function() {
        res.send(fs.readFileSync(filename));
    }, TIMEOUT);
};

require('./modules/home/homeMgr.js').register(app);
require('./modules/goodsDetail/trolleyListMgr.js').register(app);

app.listen(3000, function() {
    console.log("server listen on: http://localhost:3000");
});
