angular.module("yoApp")
.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$urlRouterProvider
		.when("", "/login")
		.otherwise("/index");
	$stateProvider
	.state("login", {
		url: '/login',
		templateUrl: 'views/login.html',
		controller: 'loginCtrl',
		resolve: {
			loginCtrl:['$ocLazyLoad', function($ocLazyLoad){
				return $ocLazyLoad.load('scripts/Controller/login.js')
			}]
		}
	})
	.state("index", {
		url: "/index",
		templateUrl: 'views/index.html',
	})
	.state("system", {// 系统管理模块
		url: "/system",
		templateUrl: "views/system.html",
	})
	.state("system.list", {
		url: "/list",
		templateUrl: "views/systemList.html",
		controller: 'systemlistCtrl',
		resolve: {
			systemlistCtrl:['$ocLazyLoad', function($ocLazyLoad){
				return $ocLazyLoad.load('scripts/Controller/system.js')
			}]
		}
	})
	.state("system.add", {
		url: "/add",
		templateUrl: "views/systemAdd.html"
	})
	.state("system.detail", {
		url: "/detail",
		templateUrl: "views/systemDetail.html"
	})
	.state("dietitian", {// 营养师模块
		url: "/dietitian",
		templateUrl: "views/dietitian.html"
	})
	.state("dietitian.list", {
		url: "/list",
		templateUrl: "views/dietitianList.html",
		controller:"dietitianlistCtrl",
		resolve: {
			dietitianlistCtrl:['$ocLazyLoad', function($ocLazyLoad){
				return $ocLazyLoad.load('scripts/Controller/dietitian.js')
			}]
		}
	})
	.state("dietitian.detail", {
		url: "/detail?:id:type",
		templateUrl: "views/dietitianDetail.html",
		controller:"dietitiandetailCtrl"
	})
	.state("dietitian.unresttime",{
		url:"/unresttime",
		templateUrl:"views/dietitianUnresttime.html"
	})
	.state("user", {  //用户模块
		url: "/user",
		templateUrl: "views/user.html"
	})
	.state("user.list", {
		url: "/list",
		templateUrl: "views/userList.html",
		controller:"userlistCtrl",
		resolve:{
			userlistCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load('scripts/Controller/user.js')
            }],
		}
	})
	.state("recommend", {
		url: "/recommendList",
		templateUrl: "views/recommendList.html"
	})
	.state("foods", {
		url: "/foodsList",
		templateUrl: "views/foodsList.html"
	})
})