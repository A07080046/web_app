window.app = {};

// var SERVER = 'http://www.gyyxjqd.com/association/associationPhone/';
var SERVER = 'http://192.168.1.119:3000/';
app.route = {
    ROUTE_GET_COMPANYINFO: SERVER+'getCompanyInfo',
    ROUTE_GET_WEEKTOP: SERVER+'getWeekTop',
    ROUTE_GET_COMPANYDETAIL: SERVER+'getCompanyDetail',
    ROUTE_ADD_COMPANY: SERVER+'insertEnterprise',
    ROUTE_SUMBIT_PRAISE: SERVER+'gradeScore',
    ROUTE_SUMBIT_STAR: SERVER+'praise',
};

app.utils = {
    ajax: function(opt) {
        var self = this;
        if (!opt.dataType) { //默认返回数据时json，如果不是需要手动设置
            opt.dataType = 'json';
        }
        if (!opt.timeout) {
            opt.timeout = 30000;
        }
        console.log('send:', opt.url, opt.data);
        opt.data = {data:JSON.stringify(opt.data)};
        var error =  opt.error; //opt的error return true 终止传递
        opt.error = function (ret, type) {
            if (!error || !error(ret, type)) {
                self.showNetError(type);
                self.clearWait();
            }
        }
        var success =  opt.success;
        opt.success = function (ret, type) {
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
        $(document.body).append('<div id="mask_container"><div class="modal-backdrop"></div><div class="spinner-text-container">'+text+'</div></div>');
    	this.spinner.spin(document.body);//打开等待加载
    },
    clearWait: function() {
        $("#mask_container").remove();
        this.spinner&&this.spinner.spin();//关闭等待加载
        this.spinner = null;
    },
}
