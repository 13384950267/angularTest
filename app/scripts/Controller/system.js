angular.module('yoApp')
.controller('systemlistCtrl',['$scope','getDataService',function($scope,getDataService){
	$scope.params = {
		total:0,
		page:1,
		pageSize:10
	}
	$scope.getDataFun = function(){
		var interfacePath = 'system/admin/getList'
		getDataService.getData(interfacePath,$scope.params).then(
			function(succ){
				$scope.data = succ.data;
			}
		)
	}
	$scope.getDataFun()
}])