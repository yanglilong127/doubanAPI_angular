(function(angular){
	'use strict';
	//创建正在热映的模块
	var app=angular.module("moviecat.movie_list",['ngRoute','moviecat.services.http']);
	//配置模块的路由
	app.config(['$routeProvider',function($routeProvider){
		$routeProvider
		.when('/:category/:page',{
			templateUrl:'movie_list/view.html',
			controller:'movieController'
		})
		.otherwise({
			redirectTo:'/'
		});
	}]);

	app.controller('movieController',[
        '$scope',
        '$route',
        '$routeParams',
        'httpService',
        'ApiConfig',
        function($scope,$route,$routeParams,httpService,ApiConfig){
		//控制器分为两步  1.设计暴露数据  2.设计暴露的行为
        var count=ApiConfig.pageSize;          //每页显示的记录数10条
        var page=parseInt($routeParams.page);   //页码数
        var start=(page-1)*count;                 //起始位置
        //console.log(1);
        //加载动画是否出现
        $scope.loading=true;  //出现
		$scope.subjects=[];
        //console.log(111);
        
        $scope.title='Loading';    //显示标题
        $scope.message='';   //是否有出错信息
        $scope.total=0;   //有多少条电影记录
        $scope.totalPages=0;  //分多少页码
        $scope.currentPage=page;  //当前页码
        httpService.jsonp(
            ApiConfig.listApiAddress+$routeParams.category,
            {count:count,start:start,q:$routeParams.q},
            function(data){
            $scope.subjects=data.subjects;

            //console.log($scope.subjects);
             $scope.title=data.title;
             $scope.total=data.total;
             $scope.totalPages=Math.ceil($scope.total/count);
             $scope.loading=false;
            //$apply的作用就是让指定的表达式重新同步
            //$scope.$apply() 里面不写表达式就会将所有绑定的数据重新同步
            $scope.$apply('subjects');
        });

        //暴露一个上一页和下一页的行为
        $scope.goPage=function(mypage){
            if(mypage>0 && mypage<=$scope.totalPages){
                $route.updateParams({page:mypage});
                
            }
            else if(mypage===0){
                mypage=1;
            }
            else if(mypage>$scope.totalPages){
                mypage=$scope.totalPages;
            }
        };
       

	}]);

})(angular);


//测试$http服务
        
        //在angular中使用JSONP的方式做跨域请求，就必须给当前地址加上一个参数
        //callback=JSON_CALLBACK 
        /*****
        var doubanApiAdress='https://api.douban.com/v2/movie/in_therters';
        doubanApiAdress+='?callback=JSON_CALLBACK';
        $http.get('/data.json').then(function(response) {
            //此处代码是在异步请求过后执行的（需要等一段时间）
            if(response.status===200){
               $scope.subjects=response.data.subjects;
               $scope.message='';
            }
            else{
                $scope.message="获取数据失败"+response.statusText;
            }
            console.log(response);
        },function(error) {
            console.log(error);
            $scope.message="获取数据失败,错误信息："+error.statusText;
        });

        $http.jsonp(doubanApiAdress).then(function(response) {
            //此处代码是在异步请求过后执行的（需要等一段时间）
            if(response.status===200){
               $scope.subjects=response.data.subjects;
               $scope.message='';
            }
            else{
                $scope.message="获取数据失败"+response.statusText;
            }
            console.log(response);
        },function(error) {
            console.log(error);
            $scope.message="获取数据失败,错误信息："+error.statusText;
        });
        *****/