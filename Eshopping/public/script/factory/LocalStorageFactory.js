ofkapp.service("localStorage",['$window', '$rootScope', function($window, $rootScope){
	
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
				// instantiate LoginService
		/*	var logoutService = new CommonDataService();
			
			// fetch data and publish on scope
			logoutService.logout().then(function(response) {
					
					var responseData = response.data; 
					
					if(responseData.isSuccess){
							window.location.href = $scope.staticURL+ "views/login.html";
					}
						
			}).catch(function(error) {
                // This is set in the event of an error.
				//$scope.errorHandling(error);
					
            });*/
		      return $window.localStorage && $window.localStorage.clear();
		}
	  };
}]);

