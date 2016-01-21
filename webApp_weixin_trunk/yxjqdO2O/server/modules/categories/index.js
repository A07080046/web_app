module.exports = (function() {

    var successData = {
        "success": true,
        "msg": "获取数据成功",
        "context": {}
    };
    var failedData = {
        "status": "failed",
        "msg": "获取数据成功",
        "context": {}
    };

    function getItem(i) {
        return {
            "goodsID": i,
            "goodsImg": "http://localhost:3000/home/"+(i%3+1)+".jpg",
            "goodsName": "猕猴桃"+i,
            "goodsPrice": "100",
            "goodsSalePrice": "85",
            "salse": "888552",
            "goodsIntroduces": "四的所发生的"
        }
    }

    function Mgr() {
    }
    Mgr.prototype.register = function(app) {
        app.post(['/getGoodsList', '/searchData'], function (req, res) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
            res.setHeader("Cache-Control", "no-cache");
            var data = JSON.parse(Object.keys(req.body)[0]);
            var pageNo = data.pageNo;
            if (pageNo > 3) {
                setTimeout(function() {
                    res.send(JSON.stringify(failedData));
                }, app.TIMEOUT);
            } else {
                var list = [];
                for (var i=0; i<3; i++) {
                    list.push(getItem(i+3*pageNo));
                }
                successData.context = {goodsList: list};
                setTimeout(function() {
                    res.send(JSON.stringify(successData));
                }, app.TIMEOUT);
            }
        });
    };

    return new Mgr();
})();
