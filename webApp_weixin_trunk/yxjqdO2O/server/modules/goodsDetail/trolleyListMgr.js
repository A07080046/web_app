module.exports = (function() {

    function Mgr() {
    }
    Mgr.prototype.register = function(app) {
        this.registerHomeData(app);
    };
    Mgr.prototype.registerHomeData = function(app) {
        app.post('/getTrolleyList', function (req, res) {
            app.send(res, __dirname+'/trolleyList.json');
        });

    };

    return new Mgr();
})();
