ofkapp.config(function($routeProvider) {
    $routeProvider

	     // route for the home page
	    .when('/index', {
	        templateUrl : '/public/views/main_body.html',
	        controller  : 'mainController'
	    }).when('/gettingstarted', {
	        templateUrl : '/public/views/1-get-started.html',
	        controller  : 'loginController'
	    }).when('/signin', {
	        templateUrl : '/public/views/signin.html',
	        controller  : 'loginController'
		}).when('/resetpswd', {
	        templateUrl : '/public/views/resetpswd.html',
	        controller  : 'loginController'
		}).when('/createaccount', {
	        templateUrl : '/public/views/createaccount.html',
	        controller  : 'loginController'
		}).when('/products', {
	        templateUrl : '/public/views/products.html',
	        controller  : 'productController'
		}).when('/shopproducts', {
	        templateUrl : '/public/views/shopproducts.html',
	        controller  : 'shopProductController'
		}).when('/order', {
	        templateUrl : '/public/views/order.html',
	        controller  : 'orderController'
		}).otherwise({redirectTo:'/gettingstarted'});
		
		
}).run( function($rootScope,$location,$http,$templateCache, localStorage) {
	
	    $rootScope.layout = {};
	    $rootScope.layout.loading = false;
	    
	    $rootScope.$on('$routeChangeStart', function () {
	        //show loading gif
	        $rootScope.layout.loading = true;
	    });
	    $rootScope.$on('$routeChangeSuccess', function () {
	        //hide loading gif
		window.scrollTo(0, 0);
		$rootScope.layout.loading = false;
		
		//Track Pageview to Google Tag Manager
		console.log("Route Changed"+$location.path());
		// Safely instantiate dataLayer
		/*var dataLayer = window.dataLayer = window.dataLayer || [];
		dataLayer.push({
			event: 'GoogleAnalytics',
			attributes: {
			route: $location.path()
			}
		});
		
		console.log("Route Changed"+dataLayer);*/
	    });
	    $rootScope.$on('$routeChangeError', function () {
	        //hide loading gif
	        $rootScope.layout.loading = false;
	    });
	   // register listener to watch route changes
	   $rootScope.$on( "$locationChangeStart", function(event, next, current) {
			console.log("iN locationChangeStart");
	   });
});

