angular.module('yoApp')
.controller('loginCtrl',['$scope','$cookies','$location','getDataService',function($scope,$cookies,$location,getDataService){
	$scope.formData = {};
	$scope.loginForm=function(){
		var interfacePath = 'system/admin/login'
		getDataService.getData(interfacePath,$scope.formData).then(
			function(succ){
				if(succ.data.codes[0]==0){
					//登录成功，将用户名，token存入cookie
					$cookies.put('token',succ.data.data.tokenInfo.token)
					$cookies.put('email',succ.data.data.adminInfo.email)
					$location.path("/index")
					layer.msg("登录成功",{time:1500})
				}else{
					layer.alert(succ.data.messages[0])
				}
			}
		)
	}
}])
