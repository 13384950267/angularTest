angular.module('yoApp')
.controller('dietitianlistCtrl',['$scope','getDataService',function($scope,getDataService){
	$scope.params = {
		diet_type:'',
		diet_level: '',
		status:'',
		total:0,
		page:1,
		pageSize:10
	}
	//获取数据的方法
	$scope.getDataFun = function(){
		$scope.interfacePath = 'dietician/dietician/showDietList';
		getDataService.getData($scope.interfacePath,$scope.params).then(
			function(succ){
				$scope.data=succ.data;
				$scope.params.total = succ.data.data.total;
				$scope.params.page = succ.data.data.page;
				$scope.params.pageSize = succ.data.data.pageSize;
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
.controller("dietitiandetailCtrl",['$scope','$stateParams','getDataService',function($scope,$stateParams,getDataService){
	$scope.params = $stateParams
	$scope.interfacePath = "dietician/dietician/showDietInfos";
	
	$scope.resultData = {}
	getDataService.getData($scope.interfacePath,$scope.params).then(
		function(succ){
			$scope.data = succ.data;
			$scope.type = $scope.params.type;
			$scope.resultData = {
				diet_id:$scope.data.data.id,
				email:$scope.data.data.email,
				diet_name:$scope.data.data.diet_name,
				diet_level:$scope.data.data.diet_level,
				
				address:$scope.data.data.address,
				code_province:$scope.data.data.code_province,
				code_city:$scope.data.data.code_city,
				code_region:$scope.data.data.code_region,
				
				good_at:$scope.data.data.good_at,
				score_service:$scope.data.data.score_service,
				score_effect:$scope.data.data.score_effect,
				guide_num:$scope.data.data.guide_num
				
			};
			$scope.diettypeList = [{
				val:1,
				name:"儿童",
				flag:false
			},{
				val:2,
				name:"孕妇",
				flag:false
			},{
				val:3,
				name:"老年",
				flag:false
			}]
			
			$scope.diet_levelList = [{
				val:0,
				name:"高级营养师"
			},{
				val:1,
				name:"普通营养师"
			}]
			$scope.setDietlevel = function(val){
				$scope.resultData.diet_level = val;
			}
			//服务类型
			$scope.resultData.dt_List = [];
			angular.forEach($scope.data.data.dt_List,function(item,index,arr){
				$scope.resultData.dt_List[index] = {};
				$scope.resultData.dt_List[index].id = item.id;
				$scope.resultData.dt_List[index].name = item.name
				$scope.resultData.dt_List[index].diet_id=item.diet_id;
				$scope.resultData.dt_List[index].diet_type=item.diet_type;
				$scope.resultData.dt_List[index].assign_status=item.assign_status
				$scope.resultData.dt_List[index].assign_max=item.assign_max
			})
			$scope.setAssignstatus = function(val,$index){
				$scope.resultData.dt_List[$index].assign_status = val;
			}
		}
	)
	
	// 提交表单
	$scope.setdietInfor = function(){
        layer.load(1,{shade: [0.4, '#393D49']})
        getDataService.getData("dietician/dietician/updateDieticianInfos",$scope.resultData,"post").then(
        	function(succ){
        		if(succ.data.codes[0]==0){
        			layer.msg(succ.data.messages[0],{time:1500},function(){
        				layer.closeAll()
        			})
        		}else{
        			layer.msg(succ.data.messages[0],function(){
        				layer.closeAll()
        			})
        		}
        	}
        )
	}
}])