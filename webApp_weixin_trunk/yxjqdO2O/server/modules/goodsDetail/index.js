module.exports = (function() {
	function Mgr() {}
	Mgr.prototype.register = function(app) {
		app.post('/getShoppingCartData', function(req, res) {
			app.send(res, __dirname + '/trolleyList.json');
		});
		app.post('/getGoodsDetail', function(req, res) {
			app.send(res, __dirname + '/goodsDetailsData.json');
		});
		app.post('/getCommentData', function(req, res) {
			app.send(res, __dirname + '/appraiseList.json');
		});
		app.post('/getShoppingData', function(req, res) {
			app.send(res, __dirname + '/shoppingData.json');
		});
		app.post('/submitShoppingCartData', function(req, res) {
			app.send(res, __dirname + '/submitShoppingCartData.json');
		});
		app.post('/submitComment', function(req, res) {
			app.send(res, __dirname + '/sumitAppraise.json');
		});
		app.post('/collectGoods', function(req, res) {
			app.send(res, __dirname + '/addCollectData.json');
		});
		app.post('/showingLove', function(req, res) {
			app.send(res, __dirname + '/addCollectData.json');
		});
		app.post('/getShopInfo', function(req, res) {
			app.send(res, __dirname + '/shopDetailsData.json');
		});
		app.post('/getShopGoodsInfo', function(req, res) {
			app.send(res, __dirname + '/shopGoodsListData.json');
		});
		app.post('/addShoppingCart', function(req, res) {
			app.send(res, __dirname + '/addShoppingCart.json');
		});
		app.post('/collectShop', function(req, res) {
			app.send(res, __dirname + '/collectShop.json');
		});
		app.post('/getOrderNo', function(req, res) {
			app.send(res, __dirname + '/getOrderNo.json');
		});
	};
	return new Mgr();
})();