window.app = {};

var SERVER = 'http://192.168.0.115:8081/api/';
// var SERVER = 'http://localhost:3000/';
app.route = {
	//主页
	ROUTE_GET_HOME_DATA_ONE: SERVER + 'getHomeDataOne', //获取主页数据1
	ROUTE_GET_HOME_DATA_TWO: SERVER + 'getHomeDataTwo', //获取主页数据2
	ROUTE_GET_PERSONAL_DATA: SERVER + 'getPersonalInfo', //获取个人信息
	//商品分类
	ROUTE_GET_CATEGORIES_LIST: SERVER + 'getGoodsList', //获取商品类别表
	//搜索
	ROUTE_GET_SEARCH_DATA: SERVER + 'getCommonSearchData', //获取搜索页面数据
	ROUTE_GET_SEARCH_RESULT: SERVER + 'searchData',//获取搜索结果
	//个人中心
	ROUTE_GET_INTEGRAL_EXCHANGE_DATA: SERVER + 'integralExchange', //获取积分换购
	ROUTE_GET_INTEGRAL_DETAIL_DATA: SERVER + 'getExchangeGoodsDetail',//获取换购详情
	ROUTE_DO_EXCHANGE: SERVER + 'exchange',	//换购商品
	ROUTE_GET_SHOP_COLLECTION_DATA: SERVER + 'getConllectShopList', 	//获取收藏的商店
	ROUTE_GET_COMMODITY_COLLECTION_DATA: SERVER + 'getConllectGoodsList', //获取收藏的商品
	ROUTE_APPLY_MERCHANT: SERVER + 'getDistributorBarcodeData',  //申请成为商家
	//订单
	ROUTE_GET_WAIT_PAY_ORDER: SERVER + 'getMyNoPayOrder',  //获取待支付订单
	ROUTE_GET_WAIT_DELIVER_ORDER: SERVER + 'getMyPayOrder',  //获取待收货订单
	ROUTE_GET_WAIT_RECEIVE_ORDER: SERVER + 'getUnReceiveOrder',  //获取待接收订单
	ROUTE_GET_WAIT_COMMENT_ORDER: SERVER + 'getUnScoreOrder',  //获取待评论订单
	ROUTE_ENSURE_RECEIVE_ORDER: SERVER + 'completeOrder',  //确认收货
	ROUTE_DELETE_ORDER: SERVER + 'delMyOrder',  //删除订单
	//购物车
	ROUTE_GET_TROLLEY_LIST: SERVER + 'getShoppingCartData',//获取购物车页面数据
	ROUTE_GET_SHOPPING_DATA: SERVER + 'getShoppingData',//获取购买页面数据
	ROUTE_ADD_SHOPPING_CART: SERVER + 'addShoppingCart',//加入购物车
	ROUTE_SUBMIT_SHOPPING_CART_DATA: SERVER + 'submitShoppingCartData',//完成购物车编辑
	ROUTE_GET_ORDER_NO: SERVER + 'getOrderNo',//提交支付1 生成订单号
	//商品详情
	ROUTE_GET_GOODS_DETAILS_DATA: SERVER + 'getGoodsDetail',//获取商品详情
	ROUTE_GET_SHOP_DETAILS_DATA: SERVER + 'getShopInfo',//店铺信息
	ROUTE_GET_SHOP_GOODS_LIST_DATA: SERVER + 'getShopGoodsInfo',//店铺商品列表信息
	ROUTE_GET_SUMIT_COLLECT_GOODS_DATA: SERVER + 'collectGoods',//收藏商品
	ROUTE_GET_LIKE_GOODS_DATA: SERVER + 'showingLove',//商品点赞
	ROUTE_GET_APPRAISE_LIST: SERVER + 'getCommentData',//获取评论列表
	ROUTE_POST_APPRAISE_DATA: SERVER + 'submitComment',// 提交评论
	ROUTE_POST_COLLECTSHOP_DATA: SERVER + 'collectShop',// 收藏店铺
	//分销商
	ROUTE_GET_MY_DISTRIBUTOR_DATA: SERVER + 'myTeam', //我的分销商
	ROUTE_GET_THIRDPARTY_CENTRE_DATA: SERVER + 'getDistributionInfo', //个人分销信息
	ROUTE_GET_THIRDPARTY_EDITPERSONAL_SUBMIT: SERVER + 'submitDistributionInfo', //提交个人信息
	ROUTE_GET_THIRDPARTY_APPLY_SUBMIT: SERVER + 'applyDistributor', //成为分销商
	ROUTE_GET_THIRDPARTY_CODE_DATA: SERVER + 'getDistributorQR', //获取二维码
	ROUTE_GET_THIRDPARTY_STATISTICS_DATA: SERVER + 'myProfitStatisticsInfo', //分销统计
	ROUTE_GET_THIRDPARTY_DETAIL_DATA: SERVER + 'getProfitdetail', //分润明细
	ROUTE_GET_THIRDPARTY_DETAILCASH_DATA: SERVER + 'withdrawCashRecord', //分润提现记录明细
	ROUTE_GET_THIRDPARTY_DISTRIBUTORORDER_DATA: SERVER + 'distributorOrder', //订单
	ROUTE_GET_THIRDPARTY_RANKING_DATA: SERVER + 'distributorRankingList', //排行榜
	ROUTE_GET_THIRDPARTY_WITHDRAW_DATA: SERVER + 'applyCash', //提现申请
};

app.global = (function() {
	var ls = window.localStorage;
	var GLOBAL = "app_global";
	var global = {
		set: function(key, data) {
			var global = JSON.parse(ls[GLOBAL] || '{}');
			global[key] = data;
			ls[GLOBAL] = JSON.stringify(global);
		},
		get: function(key) {
			var global = JSON.parse(ls[GLOBAL] || '{}');
			return global[key];
		},
		getOnce: function(key) {
			var global = JSON.parse(ls[GLOBAL] || '{}');
			var ret = global[key];
			delete global[key];
			ls[GLOBAL] = JSON.stringify(global);
			return ret;
		},
		clear: function(key) {
			var global = JSON.parse(ls[GLOBAL] || '{}');
			delete global[key];
			ls[GLOBAL] = JSON.stringify(global);
		}
	};
	return global;
})();

app.router = (function() {
	var ls = window.localStorage;
	var HISTORY = "app_history";
	var TRANS_PARAM = "tans_param";
	var scrollTop = undefined;
	function getAbsolutePath(from, path) {
		if (from[0] === '/') {
			return from;
		}
		var parr = path.split('/').slice(0, -1);
		var farr = from.split('/');
		for (var i in farr) {
			var item = farr[i];
			if (item === '.') {
				continue;
			} else if (item === '..') {
				parr.pop();
			} else {
				parr.push(item);
			}
		}
		return parr.join('/');
	}
	var router = {
		showView: function(url, param, saved, getScrollTop) {
			scrollTop = undefined;
			var history = JSON.parse(ls[HISTORY] || '[]');
			history.push({
				href: window.location.href,
				path: window.location.pathname,
				saved: saved,
				scrollTop: getScrollTop ? getScrollTop() : $(document.body).scrollTop(),
				from: getAbsolutePath(url, window.location.pathname),
			});
			ls[HISTORY] = JSON.stringify(history);
			ls[TRANS_PARAM] = JSON.stringify(param||{});
			window.location.href = url;
		},
		pop: function(step, param) {
			var history = JSON.parse(ls[HISTORY] || '[]');
			if (!step) {
				step = 1;
			}
			var obj, len = history.length;
			obj = history[len - step];
			if (obj) {
				(step - 1) && history.splice(len - step, step - 1);
				ls[HISTORY] = JSON.stringify(history);
				window.location.href = obj.href;
			}
		},
		getSavedData: function() {
			var history = JSON.parse(ls[HISTORY] || '[]');
			var item = history[history.length - 1];
			if (!item) {
				return {};
			}
			var path = window.location.pathname;
			if (item.path == path) {
				history.pop();
				ls[HISTORY] = JSON.stringify(history);
				scrollTop = item.scrollTop;
				this.from = item.from;
				return item.saved || {};
			} else {
				this.from = item.path;
				return {};
			}
		},
		resetScollerBar: function(setScrollTop) {
			if (scrollTop != undefined) {
				if (setScrollTop) {
					setScrollTop(scrollTop);
				} else {
					$(document.body).scrollTop(scrollTop);
				}
			}
		},
		getParameter: function() {
			var ret = {};
			window.location.search.substr(1).replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
				ret[decodeURIComponent(key)] = decodeURIComponent(value);
			});
			var param = JSON.parse(ls[TRANS_PARAM] || '{}');
			ls[TRANS_PARAM] = '{}';
			for (var key in ret) {
				param[key] = ret[key];
			}
			console.log('pass:', param);
			return param;
		},
		setBackParameter: function(data) {
			var param = JSON.parse(ls[TRANS_PARAM] || '{}');
			for (var key in data) {
				param[key] = data[key];
			}
			ls[TRANS_PARAM] = JSON.stringify(param);
		},
		clearHistory: function() {
			ls[HISTORY] = '[]';
		}
	};
	return router;
})();


app.utils = {
	post: function(opt) {
		var self = this;
		opt.type = "POST";
		if (!opt.dataType) { //默认返回数据时json，如果不是需要手动设置
			opt.dataType = 'json';
		}
		if (!opt.timeout) {
			opt.timeout = 30000;
		}
		console.log('send:', opt.url, opt.data);
//		opt.beforeSend = function(request) {
//          request.setRequestHeader("version", "1.0.0");
//      };
		opt.data = JSON.stringify(opt.data);
		var error = opt.error; //opt的error return true 终止传递
		opt.error = function(ret, type) {
			if (!error || !error(ret, type)) {
				self.showNetError(type);
				self.clearWait();
			}
		}
		var success = opt.success;
		opt.success = function(ret, type) {
			console.log('recv:', ret);
			success(ret);
		}
		$.ajax(opt);
		return true;
	},
	showNetError: function(type) {
		if (type == "timeout") {
			this.showError("网络超时");
		} else if (type == "parsererror") {
			this.showError("数据解析错误");
		} else {
			this.showError("服务器异常");
		}
	},
	showError: function(text) {
		mui.toast(text);
	},
	setWait: function(text) {
		var opts = {
			lines: 12, // 花瓣数目
			length: 10, // 花瓣长度
			width: 3, // 花瓣宽度
			radius: 10, // 花瓣距中心半径
			corners: 1, // 花瓣圆滑度 (0-1)
			rotate: 0, // 花瓣旋转角度
			direction: 1, // 花瓣旋转方向 1: 顺时针, -1: 逆时针
			color: '#FBDC9F', // 花瓣颜色
			speed: 1, // 花瓣旋转速度
			trail: 60, // 花瓣旋转时的拖影(百分比)
			shadow: false, // 花瓣是否显示阴影
			hwaccel: false, //spinner 是否启用硬件加速及高速旋转
			className: 'spinner', // spinner css 样式名称
			zIndex: 2e9, // spinner的z轴 (默认是2000000000)
			//      top: 'auto', // spinner 相对父容器Top定位 单位 px
			//      left: 'auto'// spinner 相对父容器Left定位 单位 px
		};
		this.spinner = new Spinner(opts);
		var el = $('<div id="mask_container""><div class="modal-backdrop"></div><div class="spinner-text-container">' + text + '</div></div>');
		$(document.body).append(el);
		this.spinner.spin(el[0]); //打开等待加载
	},
	clearWait: function() {
		var el = $("#mask_container");
		el.remove();
		if (!el.length) {
			return;
		}
		el.remove();
		this.spinner.spin(); //关闭等待加载
	},
}
