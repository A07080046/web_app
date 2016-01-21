module.exports = (function() {
	function Mgr() {}
	Mgr.prototype.register = function(app) {
		app.post('/getTrolleyList', function(req, res) {
			app.send(res, __dirname + '/trolleyList.json');
		});
		app.post('/getGoodsDetailsData', function(req, res) {
			app.send(res, __dirname + '/detailsData.json');
		});
		app.post('/getAppraiseList', function(req, res) {
			app.send(res, __dirname + '/appraiseList.json');
		});
		app.post('/getShoppingData', function(req, res) {
			app.send(res, __dirname + '/shoppingData.json');
		});
		app.post('/getSubmitShoppingCartData', function(req, res) {
			app.send(res, __dirname + '/submitShoppingCartData.json');
		});
		app.post('/getSumitAppraiseData', function(req, res) {
			app.send(res, __dirname + '/sumitAppraise.json');
		});
	};
	return new Mgr();
})();