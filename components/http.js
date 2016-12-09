
(function(angular){
  'use strict';
  var http=angular.module('moviecat.services.http',[]);
  http.service('httpService',['$document','$window',function($document,$window){
      this.jsonp=function(url,data,callback){
        //0.挂载回调函数
        //cbFuncName为回调函数名
        var cbFuncName='my_json_cb_'+Math.random().toString().replace('.','');
         $window[cbFuncName]=function(data){  //将函数全局暴露出去
            callback(data);
            $document[0].body.removeChild(scriptElement);
          };
        //1.将data转换为url字符串形式  
        //{id:1,name:'zhangsan'}  =>  id=1&name=zhangsan
        var querystring=(url.indexOf('?')==-1) ? '?' : '&';
        for(var key in data){
            querystring+=key+'='+data[key]+'&'; 
        };
        //2.处理url中的回调函数
        //url+=callback=addadadfffg
        querystring+='callback='+cbFuncName;
        //querystring=?id=1&name=zhangsan&cb=my_json_cb_023252320
        //3.创建一个script标签
        var scriptElement=$document[0].createElement('script');
        scriptElement.src=url+querystring;
        
        //4.将script标签放到页面中
        $document[0].body.appendChild(scriptElement);
        //append过后页面会自动对这个地址发送请求，请求完成后自动执行
      };  

  }]);

})(angular);



/*
 * @Author: iceStone
 * @Date:   2016-02-17 15:15:22
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-02-17 16:05:11
 

'use strict';

(function(angular) {
  // 由于默认angular提供的异步请求对象不支持自定义回调函数名
  // angular随机分配的回调函数名称不被豆瓣支持
  var http = angular.module('moviecat.services.http', []);
  http.service('HttpService', ['$window', '$document', function($window, $document) {
    // url : http://api.douban.com/vsdfsdf -> <script> -> html就可自动执行
    this.jsonp = function(url, data, callback) {
      var fnSuffix = Math.random().toString().replace('.', '');
      var cbFuncName = 'my_json_cb_' + fnSuffix;
      // 不推荐
      $window[cbFuncName] = callback;
      var querystring = url.indexOf('?') == -1 ? '?' : '&';
      for (var key in data) {
        querystring += key + '=' + data[key] + '&';
      }
      querystring += 'callback=' + cbFuncName;
      var scriptElement = $document[0].createElement('script');
      scriptElement.src = url + querystring;
      $document[0].body.appendChild(scriptElement);
    };
  }]);
})(angular);*/