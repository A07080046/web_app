window.app = {};

// var SERVER = 'http://www.gyyxjqd.com/association/associationPhone/';
var SERVER = 'http://localhost:3000/';
app.route = {
	//主页
	ROUTE_GET_HOME_DATA: SERVER + 'getHomeData',
	ROUTE_GET_PERSONAL_DATA: SERVER + 'getPersonalData',
	//商品分类
	ROUTE_GET_CATEGORIES_LIST: SERVER + 'getCategoriesList',
	//搜索
	ROUTE_GET_SEARCH_DATA: SERVER + 'getSearchData',
	ROUTE_GET_SEARCH_RESULT: SERVER + 'getSearchResult',
	//个人中心
	ROUTE_GET_INTEGRAL_EXCHANGE_DATA: SERVER + 'getIntegralExchangeData',
	ROUTE_GET_SHOP_COLLECTION_DATA: SERVER + 'getShopCollectionData',
	ROUTE_GET_COMMODITY_COLLECTION_DATA: SERVER + 'getCommodityCollectionData',
	ROUTE_GET_MY_DISTRIBUTOR_DATA: SERVER + 'getMyDistributorData',
	ROUTE_GET_DISTRIBUTOR_BARCODE_DATA: SERVER + 'getDistributorBarcodeData',
	ROUTE_GET_INTEGRAL_DETAIL_DATA: SERVER + 'getIntegralDetailData',
	//订单
	ROUTE_GET_WAIT_PAY_ORDER: SERVER + 'getWaitPayOrder',
	ROUTE_GET_WAIT_DELIVER_ORDER: SERVER + 'getWaitDeliverOrder',
	ROUTE_GET_WAIT_RECEIVE_ORDER: SERVER + 'getWaitReceiveOrder',
	ROUTE_GET_WAIT_COMMENT_ORDER: SERVER + 'getWaitCommentOrder',
	//购物车
	ROUTE_GET_TROLLEY_LIST: SERVER + 'getTrolleyList',
	//商品详情
	ROUTE_GET_GOODS_DETAILS_DATA: SERVER + 'getGoodsDetailsData',
	//获取评论列表
	ROUTE_GET_APPRAISE_LIST: SERVER + 'getAppraiseList',
	// 提交评论
	ROUTE_POST_APPRAISE_DATA: SERVER + 'getSumitAppraiseData',
	//获取购买页面数据
	ROUTE_GET_SHOPPING_DATA: SERVER + 'getShoppingData',
	//完成购物车编辑
	ROUTE_GET_SUBMIT_SHOPPING_CART_DATA: SERVER + 'getSubmitShoppingCartData',
};

app.router = (function() {
	var ls = window.localStorage;
	var HISTORY = "app_history";
	var TRANS_PARAM = "tans_param";
	var scrollTop = 0;
	var router = {
		showView: function(url, param, saved, getScrollTop) {
			var history = JSON.parse(ls[HISTORY] || '[]');
			history.push({
				href: window.location.href,
				path: window.location.pathname,
				saved: saved,
				scrollTop: getScrollTop ? getScrollTop() : $(document).scrollTop(),
				from: url,
			});
			ls[HISTORY] = JSON.stringify(history);
			ls[TRANS_PARAM] = JSON.stringify(param);
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
				return {};
			}

		},
		resetScollerBar: function(setScrollTop) {
			if (setScrollTop) {
				setScrollTop(scrollTop);
			} else {
				$(document).scrollTop(scrollTop);
			}
		},
		getParameter: function() {
			var ret = {};
			window.location.search.substr(1).replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
				ret[decodeURIComponent(key)] = decodeURIComponent(value);
			});
			var param = JSON.parse(ls[TRANS_PARAM] || '{}');
			for (var key in ret) {
				param[key] = ret[key];
			}
			return param;
		},
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
		opt.data = {
			data: JSON.stringify(opt.data)
		};
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
		var el = $('<div id="mask_container" style="transition:opacity 0.5s;"><div class="modal-backdrop"></div><div class="spinner-text-container">' + text + '</div></div>');
		$(document.body).append(el);
		this.spinner.spin(el[0]); //打开等待加载
	},
	clearWait: function() {
		var el = $("#mask_container");
		if (!el.length) {
			return;
		}
		el.css('opacity', 0);
		var self = this;
		el.on('webkitTransitionEnd', function() {
			el.remove();
			self.spinner && self.spinner.spin(); //关闭等待加载
			self.spinner = null;
		});
	},
}
