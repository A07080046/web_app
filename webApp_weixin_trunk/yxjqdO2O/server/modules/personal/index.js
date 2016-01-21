module.exports = (function() {

    function Mgr() {
    }
    Mgr.prototype.register = function(app) {
        app.post('/integralExchange', function (req, res) {
            app.send(res, __dirname+'/integralExchange.json');
        });
        app.post('/getExchangeGoodsDetail', function (req, res) {
            app.send(res, __dirname+'/integralDetail.json');
        });
        app.post('/exchange', function (req, res) {
            app.send(res, __dirname+'/exchange.json');
        });
        app.post('/getConllectShopList', function (req, res) {
            app.send(res, __dirname+'/shopCollection.json');
        });
        app.post('/getConllectGoodsList', function (req, res) {
            app.send(res, __dirname+'/commodityCollection.json');
        });
        app.post('/getDistributorBarcodeData', function (req, res) {
            app.send(res, __dirname+'/distributorBarcode.json');
        });
    };

    return new Mgr();
})();
