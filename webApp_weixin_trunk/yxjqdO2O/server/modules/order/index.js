module.exports = (function() {

    function Mgr() {
    }
    Mgr.prototype.register = function(app) {
        app.post('/getMyNoPayOrder', function (req, res) {
            app.send(res, __dirname+'/waitPay.json');
        });
        app.post('/getMyPayOrder', function (req, res) {
            app.send(res, __dirname+'/waitDeliver.json');
        });
        app.post('/getUnReceiveOrder', function (req, res) {
            app.send(res, __dirname+'/waitReceive.json');
        });
        app.post('/getUnScoreOrder', function (req, res) {
            app.send(res, __dirname+'/waitComment.json');
        });
        app.post('/completeOrder', function (req, res) {
            app.send(res, __dirname+'/complete.json');
        });
        app.post('/delMyOrder', function (req, res) {
            app.send(res, __dirname+'/delMyOrder.json');
        });
    };

    return new Mgr();
})();
