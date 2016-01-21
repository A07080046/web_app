module.exports = (function() {

    function Mgr() {
    }
    Mgr.prototype.register = function(app) {
        app.post('/myTeam', function (req, res) {
            app.send(res, __dirname+'/myDistributor.json');
        });
        app.post('/getDistributionInfo', function (req, res) {
            app.send(res, __dirname+'/getDistributionInfo.json');
        });
        app.post('/submitDistributionInfo', function (req, res) {
            app.send(res, __dirname+'/submitDistributionInfo.json');
        });
        app.post('/applyDistributor', function (req, res) {
            app.send(res, __dirname+'/applyDistributor.json');
        });
        app.post('/getDistributorQR', function (req, res) {
            app.send(res, __dirname+'/getDistributorQR.json');
        });
        app.post('/myProfitStatisticsInfo', function (req, res) {
            app.send(res, __dirname+'/myProfitStatisticsInfo.json');
        });
        app.post('/getProfitdetail', function (req, res) {
            app.send(res, __dirname+'/getProfitdetail.json');
        });
        app.post('/withdrawCashRecord', function (req, res) {
            app.send(res, __dirname+'/withdrawCashRecord.json');
        });
        app.post('/distributorOrder', function (req, res) {
            app.send(res, __dirname+'/distributorOrder.json');
        });
        app.post('/distributorRankingList', function (req, res) {
            app.send(res, __dirname+'/distributorRankingList.json');
        });
        app.post('/applyCash', function (req, res) {
            app.send(res, __dirname+'/applyCash.json');
        });
    };

    return new Mgr();
})();
