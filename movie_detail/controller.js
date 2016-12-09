(function(angular){
	'use strict';
	//创建正在热映的模块
	var app=angular.module("moviecat.movie_detail",['ngRoute','moviecat.services.http']);
	//配置模块的路由
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider
		.when('/subject/:id',{
			templateUrl:'movie_detail/view.html',
			controller:'MovieDetailController'
		});
		
	}]);
	
	app.controller('MovieDetailController',[
        '$scope',
        '$route',
        '$routeParams',
        'httpService',
        'ApiConfig',
        function($scope,$route,$routeParams,httpService,ApiConfig){
	        $scope.movie={};
	        $scope.movie.title='Loading...';
	        $scope.loading = true;
	        console.log(111212);
	        var id=$routeParams.id;
	        var APIAdress=ApiConfig.detailApiAddress+id;
	        httpService.jsonp(APIAdress,{},function(data){

	            $scope.movie=data;
	            $scope.loading = false;
	            $scope.$apply();
	        });
       

		}]);

})(angular);


