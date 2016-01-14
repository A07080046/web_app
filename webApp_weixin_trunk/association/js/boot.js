/**
 * 作者：伍祖清
 * 时间：2015-10-19
 * 描述：ajax统一请求和获取连接参数工具类
 */
var base = null;
var server_host = 'http://139.129.99.185/';
//设置全局beforeSend
mui.ajaxSettings.beforeSend = function(xhr, setting) {
	//beforeSend演示,也可在$.ajax({beforeSend:function(){}})中设置单个Ajax的beforeSend
	console.log('开始发起请求:' + setting.url+"?"+setting.data);
};
//设置全局complete
mui.ajaxSettings.complete = function(xhr, status) {
	console.log('请求结束:' + xhr.responseText);
}
base = base || {
	/**
	 * URL管理
	 */
	url: {
		detail: 'association/associationPhone/enterpriseList'//
	},
	/**
	 * ajax请求
	 * @param {Object} url请求连接
	 * @param {Object} data请求参数
	 * @param {Object} callback回调函数
	 */
	postData : function(url, data, callback) {
		mui.ajax(server_host + url,{
			data:{data:JSON.stringify(data)},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:20000,//超时时间设置为20秒；
			success:callback,//服务器返回响应
			error:function(xhr,type,errorThrown){
				//异常处理；
				console.log(type);
				mui.toast("请求出错！");
//				waitingDialog.close();
			}
		});
	},
	/**
	 * 获取URL链接参数，在通过URL跳转页面时，可通过此方法获取URL的参数
	 * @param {Object} val要获取的参数名称
	 */
	getParameter : function(val){
		var uri = window.location.search;
		var re = new RegExp("" + val + "=([^&?]*)", "ig");
		var str = ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
		return decodeURIComponent(str);
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
        $(document.body).append('<div id="mask_container"><div class="modal-backdrop"></div><div class="spinner-text-container">'+text+'</div></div>');
    	this.spinner.spin(document.body);//打开等待加载
    },
    clearWait: function() {
        $("#mask_container").remove();
        this.spinner.spin();//关闭等待加载
        this.spinner = null;
    }
}
