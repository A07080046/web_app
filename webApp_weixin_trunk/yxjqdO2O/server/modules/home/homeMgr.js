module.exports = (function() {


    function Mgr() {
    }
    Mgr.prototype.register = function(app) {
        this.registerHomeData(app);
    };
    Mgr.prototype.registerHomeData = function(app) {
        app.post('/getHomeData', function (req, res) {
            app.send(res, __dirname+'/home.json');
        });

    };

    return new Mgr();
})();
