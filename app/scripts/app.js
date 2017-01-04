'use strict';
angular.module('yoApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ui.router','oc.lazyLoad'])
.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
	$httpProvider.interceptors.push(HttpInterceptor);
})
.factory('HttpInterceptor', ['$q', '$cookies', HttpInterceptor])
.run(function($cookies,$location,$rootScope){ //拦截路由
	$rootScope.$on('$stateChangeStart',function(evt,next,current,toState){
		var token = $cookies.get("token");
		//如果token不存在说明未登录，跳转到登录页面
		if(!token){
			if(next.name!="login"){
				$location.path("/login");
				$location.href= "/login";
				location.reload();
			}
		}else{
			if(next.name=="login"){
				$location.path("/index")
				location.href=location.href;
			}
		}
	})
})
function HttpInterceptor($q, $cookies,$location) { //拦截请求
	return {
		'request': function(config) {
			if(angular.isObject(config.data)) {
				var param = [];
				angular.forEach(config.data, function(value, key) {
					if(angular.isObject(value)){
						value = JSON.stringify(value);
					}
					this.push(key + '=' + value);
				}, param);
				config.data = param.join('&');
			}
			config.headers = config.headers || {};
			config.headers['Content-Type'] = "application/x-www-form-urlencoded";
			return config;
		},
		'requestError': function(config) {
			return $q.reject("网络连接错误！");
		},
		'responseError': function(response) {
			console.log(response)
			if(response.status == -1) {
				response.status = 200;
				layer.msg("接口无法请求")
			}
			return $q.reject("网络连接错误！");
		},
		'response': function(response) {
			if(typeof response.data=="object"){
			}
			return response;
		}
		
	};
}