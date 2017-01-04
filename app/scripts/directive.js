angular.module('yoApp')
.directive('userinfor', ['$cookies','$location',function($cookies,$location) {
	return {
		restrict:'AE',
		replace:true,
		scope:false,
		template:'<ul class="list-unstyled clearfix">'+
	        '<li><a ui-sref="index" ng-bind="email"></a></li>'+
	        '<li><a href="javascript:;" id="loginOut">退出</a></li>'+
	    '</ul>',
		link:function(scope,ele,attrs){
			scope.email = $cookies.get("email");
			$("#loginOut").on('click',function(){
				layer.confirm("确定退出登录？",function(){
					layer.closeAll()
					$cookies.remove("token");
					$cookies.remove("email");
					$location.path("/login")
					scope.$apply();
				})
			})
		}
	}
}])
.directive("pagination",[function(){
	return {
		restrict:'AE',
		replace:true,
		template:'<div id="page1" class="m-pagination"></div>',
		link:function(scope, ele,attrs){
			scope.$watch('params.total',function(){
				$("#page1").unbind()
				$("#page1").page({
					total:scope.params.total,
					page:scope.params.page,
					pageSize:scope.params.pageSize
				}).on('pageClicked', function (event, pageIndex) {
					scope.params.page=pageIndex
					scope.getDataFun()
				});
			})
		}
	}
}])