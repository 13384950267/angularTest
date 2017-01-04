angular.module("yoApp")
.service("getDataService", ['$http', '$q', '$cookies', getDataFromeServer])
function getDataFromeServer($http, $q,$cookies){
	return {
		getData : function(interfacePath,params,type) {
			layer.load(1)
			var deferred = $q.defer();
			var interfaceIP = 'http://192.168.100.96:8010/'+interfacePath;
//			var interfaceIP = 'http://192.168.100.197/' +interfacePath;
			var token = $cookies.get("token");
			if(!params){
				params={};
			}
			params.token=token;
			params.pageSize = 10;
			if(type=="post"){
				var promise = $http.post(interfaceIP,params);
			}else{
				var promise = $http.get( interfaceIP +"?"+ $.param(params));
			}
			promise.then(
				function(answer) {
					layer.closeAll("loading")
					//在这里可以对返回的数据集做一定的处理,再交由controller进行处理
					deferred.resolve(answer);
				},
				function(error) {
					layer.closeAll("loading");
					// 可以先对失败的数据集做处理，再交由controller进行处理
					deferred.reject(error);
				});
			return deferred.promise;
		}	
	}
}
