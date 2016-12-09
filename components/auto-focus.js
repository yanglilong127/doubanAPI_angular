/*
 * @Author: iceStone
 * @Date:   2016-02-17 17:42:49
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-02-17 17:57:30
 */
(function(angular) {
  angular.module('moviecat.directives.auto_focus', [])
    .directive('autoFocus', ['$location', function($location) {
      // Runs during compile
      
      return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs, controller) {
        	$scope.location=$location;

          $scope.$watch('location.path()',function(now,old){
              var path = $location.path(); // /coming_soon/1
              var aLink = iElm.children().attr('href');   
              //var type = aLink.replace(/#(\/.+?)\/\d+/,'$1'); // /coming_soon
              var type='/'+aLink.split('#')[1];
              //console.log(type);
              if(path===type){
                // 访问的是当前链接
                iElm.parent().children().removeClass('active');
                iElm.addClass('active');
              }

          });
          //console.log(iElm[0]);
          //window.ielm=iElm;
          //iElm.addClass('active');
          //iElm.on('click', function() {
          //	iElm.parent().children().removeClass('active');
          //  iElm.addClass('active');
          //});
        }
      };
    }]);
})(angular);


