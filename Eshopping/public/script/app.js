
var app = angular.module('myApp', ['ngRoute']);



app.controller('HomeController', function($scope) {
	$scope.progressValue = 20;
  $scope.message = 'Hello from HomeController';
});

app.controller('BlogController', function($scope) {
$scope.progressValue = 30;
  $scope.message = 'Hello from BlogController';
});

app.controller('AboutController', function($scope) {
$scope.progressValue = 40;
  $scope.message = 'Hello from AboutController';
});

app.controller("mainController",function($scope){
  
   $scope.init = function(){
	console.log("IN progressBar init");
		    $scope.progressValue = 66;
   };
  
});


app.config(function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl : 'views/home',
    controller  : 'HomeController'
  })

  .when('/blog', {
    templateUrl : 'views/blog',
    controller  : 'BlogController'
  })

  .when('/about', {
    templateUrl : 'views/about',
    controller  : 'AboutController'
  })

  .otherwise({redirectTo: '/'});
});

