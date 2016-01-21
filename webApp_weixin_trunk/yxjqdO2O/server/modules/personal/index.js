module.exports = (function() {

    function Mgr() {
    }
    Mgr.prototype.register = function(app) {
        app.post('/getIntegralExchangeData', function (req, res) {
            app.send(res, __dirname+'/integralExchange.json');
        });
        app.post('/getShopCollectionData', function (req, res) {
            app.send(res, __dirname+'/shopCollection.json');
        });
        app.post('/getCommodityCollectionData', function (req, res) {
            app.send(res, __dirname+'/commodityCollection.json');
        });
        app.post('/getMyDistributorData', function (req, res) {
            app.send(res, __dirname+'/myDistributor.json');
        });
        app.post('/getDistributorBarcodeData', function (req, res) {
            app.send(res, __dirname+'/distributorBarcode.json');
        });
        app.post('/getIntegralDetailData', function (req, res) {
            app.send(res, __dirname+'/integralDetail.json');
        });
    };

    return new Mgr();
})();
