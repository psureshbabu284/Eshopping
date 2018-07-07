ofkapp.service("localStorage",['$window', '$rootScope', function($window, $rootScope, CommonDataService){
	
	  angular.element($window).on('storage', function(event) {
	      $rootScope.$apply();
	  });

	  return {
	    setData: function(key,value) {
	      $window.localStorage && $window.localStorage.setItem(key, value);
	      return this;
	    },
	    getData: function(key) {
	      return $window.localStorage && $window.localStorage.getItem(key);
	    },
	    clearStorage: function() {
		
			$window.localStorage.removeItem('authToken');
			$window.localStorage.removeItem('userId');
		},
		clearRemeberStorage: function() {		
					
			$window.localStorage.removeItem('loginId');		
			$window.localStorage.removeItem('password');		
		}
	  };
}]);

