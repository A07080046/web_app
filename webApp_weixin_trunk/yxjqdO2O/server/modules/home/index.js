module.exports = (function() {

    function Mgr() {
    }
    Mgr.prototype.register = function(app) {

        app.post('/getHomeDataOne', function (req, res) {
            app.send(res, __dirname+'/homeone.json');
        });
        app.post('/getHomeDataTwo', function (req, res) {
            app.send(res, __dirname+'/hometwo.json');
        });
        app.post('/getPersonalInfo', function (req, res) {
            app.send(res, __dirname+'/personal.json');
        });
    };

    return new Mgr();
})();
