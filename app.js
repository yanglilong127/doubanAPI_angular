(function(angular){
	'use strict';

	// Declare app level module which depends on views, and components
	var app=angular.module('moviecat',[
	   'ngRoute',
	    'moviecat.movie_detail',
	    'moviecat.movie_list',
	    'moviecat.directives.auto_focus',
	]);
	//为模块定义一些常量
	app.constant('ApiConfig',{
		pageSize:10,
		listApiAddress:'https://api.douban.com/v2/movie/',
		detailApiAddress:'https://api.douban.com/v2/movie/subject/'
	});
	//配置路由
	app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}]);

	app.controller('myCtrl',[
		'$scope',
		'$location',
		'$route',
		function($scope,$location,$route){
			$scope.location=$location;
			$scope.input='';   //搜索框文本内容
			$scope.search=function(){
				//console.log($scope.input);
				$route.updateParams({category:'search',page:1,q:$scope.input});
			};
		
		}
	]);

})(angular);
