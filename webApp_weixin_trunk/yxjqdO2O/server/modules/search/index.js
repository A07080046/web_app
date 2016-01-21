module.exports = (function() {

    function Mgr() {
    }
    Mgr.prototype.register = function(app) {
        app.post('/getCommonSearchData', function (req, res) {
            app.send(res, __dirname+'/searchData.json');
        });
    };

    return new Mgr();
})();
