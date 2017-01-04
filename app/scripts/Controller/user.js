angular.module('yoApp')
.controller('userlistCtrl',['$scope','getDataService',function($scope,getDataService){
	$scope.params = {
		nickname:'',
		remark: '',
		mobile:'',
		total:0,
		page:1,
	}
	//获取数据的方法
	$scope.getDataFun = function(){
		$scope.interfacePath = 'ucenter/user/lists';
		getDataService.getData($scope.interfacePath,$scope.params).then(
			function(succ){
				$scope.data=succ.data;
				// 接口请求成功再给params赋值
				if(succ.data.codes[0]==0){
					$scope.params.total = succ.data.data.total;
					$scope.params.page = succ.data.data.page;
				}
			}
		)
	}
	//从服务器获取数据
	$scope.getDataFun()
	$scope.filterData=function(name,value){
		$scope.params[name] = value;
		$scope.getDataFun()
	}
}])