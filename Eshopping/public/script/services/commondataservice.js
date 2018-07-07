ofkapp.service('CommonDataService', ['$q', '$http','localStorage', function($q, $http, localStorage){
	
	var apiUrl = BuildURL.getServiceURL();
	// instantiate our initial Measurements Service object
    var CommonDataServiceInit = function() {
     	this.userId = localStorage.getData("userId");
        this.authToken = localStorage.getData("authToken");
    };
	
	
	//list of service url's
   var ServiceURLs = {
		validateServiceURL : apiUrl + "/validate/session",
		logoutServiceURL : apiUrl + "/validate/session",
		validateProfileServiceURL : apiUrl + "/user/details", 
		getMasterDataServiceURL : apiUrl + "/masterdatabyid",
	};
   

	
	// Save the Measurements info
    CommonDataServiceInit.prototype.getUserId = function() {
            return this.userId;
	};
	
	// Save the Measurements info
    CommonDataServiceInit.prototype.getAuthToken =function() {
            return this.authToken;
	};
	
	// Save the Measurements info
    CommonDataServiceInit.prototype.logout =function() {
            // We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();

        $http({
		  method: 'DELETE',
		  headers: {
			'authtoken': this.authToken,
			'userId':this.userId
		  },
		  url: ServiceURLs.logoutServiceURL
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
	
	// Save the Measurements info
    CommonDataServiceInit.prototype.logoutFromLoginController =function() {
            // We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		var userId = localStorage.getData("userId");
		var authToken = localStorage.getData("authToken");
		
        $http({
		  method: 'DELETE',
		  headers: {
			'authtoken': authToken,
			'userId': userId
		  },
		  url: ServiceURLs.logoutServiceURL
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
	
	
	// define the getProfile method which will fetch data
    CommonDataServiceInit.prototype.validateProfile = function(userId,authToken,auth) {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		
        $http({
		  method: 'GET',
		  headers: {
			'authtoken': authToken,
			'userId':userId
		  },
		  params: {'auth':auth},
		  url: ServiceURLs.validateProfileServiceURL
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
	
	// Save the Measurements info
    CommonDataServiceInit.prototype.validateSession =function() {
            // We make use of Angular's $q library to create the deferred instance
		var deferred = $q.defer();
		console.log('validateServiceURL');
        $http({
		  method: 'GET',
		  headers: {
			'authtoken': this.authToken,
			'userId':this.userId
		  },
		  url: ServiceURLs.validateServiceURL
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
	
	
    // define the getProfile method which will fetch data
    CommonDataServiceInit.prototype.getMasterDataById = function(masterId) {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		
        $http({
		  method: 'GET',
		  headers: {
			'authtoken': this.authToken,
			'userId': this.userId
		  },
		  params: {'masterDataId': masterId},
		  url: ServiceURLs.getMasterDataServiceURL
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
	


	return CommonDataServiceInit;
}]);
