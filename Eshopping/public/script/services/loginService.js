ofkapp.service('LoginService', ['$q', '$http', function($q, $http){

    var apiUrl = BuildURL.getServiceURL();
    var requestObject;
	
	//list of service url's
   var ServiceURLs = {
		validateLoginServiceURL : apiUrl + "/login", 
		forgotPasswordServiceURL : apiUrl + "/password/forgot"
	};
   
	
	 // instantiate our initial UserService object
    var LoginService = function(loginId,password,email) {
		requestObject = {};
		
		if(!(angular.isUndefined(loginId) || loginId === null))
			requestObject.loginId = loginId;
		
		if(!(angular.isUndefined(password) || password === null))
			requestObject.password = password;
					
		if(!(angular.isUndefined(email) || email === null))
			requestObject.email = email;
			
    };
	
	  // define the getProfile method which will fetch data
    LoginService.prototype.validateSession = function(userId,authToken) {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		
        $http({
		  method: 'POST',
		  data : JSON.stringify(requestObject),
		  url: ServiceURLs.validateLoginServiceURL,
		  dataType:"json",
		  contentType: 'application/json',
		}).then(function successCallback(data) {
			// The promise is resolved once the HTTP call is successful.
            deferred.resolve(data);
		}, function errorCallback(error, status) {
			// The promise is rejected if there is an error with the HTTP call.
            deferred.reject(error, status);
		});
		 // The promise is returned to the caller
            return deferred.promise;
	};
	

    // define the getProfile method which will fetch data
    LoginService.prototype.validateLogin = function() {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		
        $http({
		  method: 'POST',
		  data : JSON.stringify(requestObject),
		  url: ServiceURLs.validateLoginServiceURL,
		  dataType:"json",
		  contentType: 'application/json',
		}).then(function successCallback(data) {
			// The promise is resolved once the HTTP call is successful.
            deferred.resolve(data);
		}, function errorCallback(error, status) {
			// The promise is rejected if there is an error with the HTTP call.
            deferred.reject(error, status);
		});
		 // The promise is returned to the caller
            return deferred.promise;
	};
	
	// define the getProfile method which will fetch data
    LoginService.prototype.validateAuthentication = function(auth) {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		var requestObject = {};
		requestObject.loginId = "";
		requestObject.password = "";
		requestObject.auth = auth;
			
        $http({
		  method: 'POST',
		  data : JSON.stringify(requestObject),
		  url: ServiceURLs.validateLoginServiceURL,
		  dataType:"json",
		  contentType: 'application/json',
		}).then(function successCallback(data) {
			// The promise is resolved once the HTTP call is successful.
            deferred.resolve(data);
		}, function errorCallback(error, status) {
			// The promise is rejected if there is an error with the HTTP call.
            deferred.reject(error, status);
		});
		 // The promise is returned to the caller
            return deferred.promise;
	};
	
	
	// define the getProfile method which will fetch data
    LoginService.prototype.validateAndResetAccount = function() {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		
        $http({
		  method: 'POST',
		  data : JSON.stringify(requestObject),
		  url: ServiceURLs.forgotPasswordServiceURL,
		  dataType:"json",
		  contentType: 'application/json',
		}).then(function successCallback(data) {
			// The promise is resolved once the HTTP call is successful.
            deferred.resolve(data);
		}, function errorCallback(error, status) {
			// The promise is rejected if there is an error with the HTTP call.
            deferred.reject(error, status);
		});
		 // The promise is returned to the caller
            return deferred.promise;
	};
	
	// define the getProfile method which will fetch data
    LoginService.prototype.validateFields = function() {
		
       if(angular.isUndefined(requestObject.loginId)){
			return "";
	   }
	   if(angular.isUndefined(requestObject.password)){
			return "";
	   }
	};
	
	
	
    return LoginService;
}])
