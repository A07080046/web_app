/**
 * 作者：伍祖清
 * 时间：2015-10-19
 * 描述：ajax统一请求和获取连接参数工具类
 */
var base = null;
var server_host = '';
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
		login:server_host + ''//登录
	},
	/**
	 * ajax请求
	 * @param {Object} url请求连接
	 * @param {Object} data请求参数
	 * @param {Object} callback回调函数
	 */
	postData : function(url, data, callback) {
		mui.ajax(url,{
			data:data,
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
	}
}