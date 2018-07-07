app.service('loginService', ['$q', '$http', function($q, $http){

    var apiUrl = BuildURL.getServiceURL();
    var requestObject = {};
	
	var LoginService = function(loginId,password) {
        requestObject.loginId = loginId;
        requestObject.password = password;
    };

    // define the getProfile method which will fetch data
    LoginService.prototype.validateLogin = function() {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		
        $http({
		  method: 'POST',
		  data : JSON.Stringify(requestObject),
		  url: apiUrl + "/login",
		  dataType:"json",
		  contentType: 'application/json',
		}).then(function successCallback(response) {
			// The promise is resolved once the HTTP call is successful.
            deferred.resolve(data);
		}, function errorCallback(response) {
			// The promise is rejected if there is an error with the HTTP call.
            deferred.reject(response);
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
