module.exports = (function() {

    function Mgr() {
    }
    Mgr.prototype.register = function(app) {
        app.post('/getHomeData', function (req, res) {
            app.send(res, __dirname+'/home.json');
        });
        app.post('/getPersonalData', function (req, res) {
            app.send(res, __dirname+'/personal.json');
        });
    };

    return new Mgr();
})();
