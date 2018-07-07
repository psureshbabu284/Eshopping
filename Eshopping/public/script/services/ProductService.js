ofkapp.service('ProductService', ['$q', '$http',  function($q, $http){

   //common service url endpoint
   var apiUrl = BuildURL.getServiceURL();
   var requestObj = {};
   
    //list of service url's
    var ServiceURLs = {
		getProductsURL : apiUrl + "/user/products"
	};
   
    
	// instantiate our initial UserService object
    var User = function(userModel) {
	
		if(!(angular.isUndefined(userModel) || userModel === null)){
		
			requestObj = {}; //to clear previous input object
			
			if(!(angular.isUndefined(userModel.firstName) || userModel.userId === null))
					requestObj.userId = userModel.userId;
				
			

			
	 	}//end of main if
		return false;
    };
	
	
	

    // define the getProfile method which will fetch data
    User.prototype.getProduceDetails = function(userId) {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		
        $http({
		  method: 'GET',
          url: ServiceURLs.getProductsURL,
          params: {'userId':userId},
		}).then(function successCallback(response) {
			 // The promise is resolved once the HTTP call is successful.
              deferred.resolve(response);
		}, function errorCallback(error, status) {
			 // The promise is rejected if there is an error with the HTTP call.
             deferred.reject(error, status);
		});
		 // The promise is returned to the caller
         return deferred.promise;
	};
	

	
	// register the user
    User.prototype.saveProduct = function(userId,authToken, productObjectModel) {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		console.log("productObjectModels - "+JSON.stringify(productObjectModel));
        $http({
		  method: 'POST',
		  data: JSON.stringify(productObjectModel),
		  headers: {
			'authtoken': authToken,
			'userId':userId
		  },
		  url: ServiceURLs.getProductsURL, 
		  dataType:"json",
		  contentType: 'application/json'
		}).then(function successCallback(response) {
			 // The promise is resolved once the HTTP call is successful.
              deferred.resolve(response);
		}, function errorCallback(error) {
			 // The promise is rejected if there is an error with the HTTP call.
                    deferred.reject(error);
		});
		 // The promise is returned to the caller
            return deferred.promise;
	};
	
	// update the user
    User.prototype.updateProfile = function(userId,authToken, viewToBeRedirected) {

		if(viewToBeRedirected){
			requestObj.SFUpdateSkip = true;
		}
		requestObj.nextView = viewToBeRedirected;
		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		console.log("requestObj - "+JSON.stringify(requestObj));
        $http({
		  method: 'PUT',
		  data: JSON.stringify(requestObj),
		  headers: {
			'authtoken': authToken,
			'userId':userId
		  },
		  url: ServiceURLs.updateUserProfileServiceURL, 
		  dataType:"json",
		  contentType: 'application/json'
		}).then(function successCallback(response) {
			 // The promise is resolved once the HTTP call is successful.
			 console.log("response success in Update profile")
              deferred.resolve(response);
		}, function errorCallback(error) {
			 // The promise is rejected if there is an error with the HTTP call.
                    deferred.reject(error);
		});
		
		 // The promise is returned to the caller
            return deferred.promise;
	};

	// register the user
    User.prototype.createRepresentativeContact = function(userId,authToken) {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		console.log("requestObj - "+JSON.stringify(requestObj));
        $http({
		  method: 'POST',
		  data: JSON.stringify(requestObj),
		  headers: {
			'authtoken': authToken,
			'userId':userId
		  },
		  url: ServiceURLs.representativeContactServiceURL, 
		  dataType:"json",
		  contentType: 'application/json'
		}).then(function successCallback(response) {
			 // The promise is resolved once the HTTP call is successful.
              deferred.resolve(response);
		}, function errorCallback(error) {
			 // The promise is rejected if there is an error with the HTTP call.
                    deferred.reject(error);
		});
		 // The promise is returned to the caller
            return deferred.promise;
	};

	
	// update the user
    User.prototype.updateRepresentativeContact = function(userId,authToken) {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		console.log("requestObj - "+JSON.stringify(requestObj));
        $http({
		  method: 'PUT',
		  data: JSON.stringify(requestObj),
		  headers: {
			'authtoken': authToken,
			'userId':userId
		  },
		  url: ServiceURLs.representativeContactServiceURL, 
		  dataType:"json",
		  contentType: 'application/json'
		}).then(function successCallback(response) {
			 // The promise is resolved once the HTTP call is successful.
              deferred.resolve(response);
		}, function errorCallback(error) {
			 // The promise is rejected if there is an error with the HTTP call.
                    deferred.reject(error);
		});
		
		 // The promise is returned to the caller
            return deferred.promise;
	};
	

    return User;
}]);
