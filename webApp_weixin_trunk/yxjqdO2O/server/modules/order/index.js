module.exports = (function() {

    function Mgr() {
    }
    Mgr.prototype.register = function(app) {
        app.post('/getWaitPayOrder', function (req, res) {
            app.send(res, __dirname+'/waitPay.json');
        });
        app.post('/getWaitDeliverOrder', function (req, res) {
            app.send(res, __dirname+'/waitDeliver.json');
        });
        app.post('/getWaitReceiveOrder', function (req, res) {
            app.send(res, __dirname+'/waitReceive.json');
        });
        app.post('/getWaitCommentOrder', function (req, res) {
            app.send(res, __dirname+'/waitComment.json');
        });
    };

    return new Mgr();
})();
