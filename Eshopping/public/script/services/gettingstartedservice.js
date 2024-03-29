ofkapp.service('GettingStartedService', ['$q', '$http',  function($q, $http){

   //common service url endpoint
   var apiUrl = BuildURL.getServiceURL();
   var requestObj = {};
   
    //list of service url's
    var ServiceURLs = {
		getMasterDataServiceURL : apiUrl + "/gettingstarted/masterdata", 
		validateProfileServiceURL : apiUrl + "/user/details", 
		registerUserProfileServiceURL : apiUrl + "/user/register",
		updateUserProfileServiceURL : apiUrl + "/user/update",
		representativeContactServiceURL : apiUrl + "/representative/contact",
		logoutUserProfileServiceURL : apiUrl + "/user/logout"
	};
   
    
	// instantiate our initial UserService object
    var User = function(userModel) {
	
		if(!(angular.isUndefined(userModel) || userModel === null)){
		
			requestObj = {}; //to clear previous input object
			
			if(!(angular.isUndefined(userModel.firstName) || userModel.firstName === null))
					requestObj.firstName = userModel.firstName;
				
			if(!(angular.isUndefined(userModel.lastName) || userModel.lastName === null))
			requestObj.lastName = userModel.lastName;
						
			if(!(angular.isUndefined(userModel.email) || userModel.email === null))
			requestObj.email = userModel.email;
						
			if(!(angular.isUndefined(userModel.password) || userModel.password === null))
				requestObj.password = userModel.password;

			if(!(angular.isUndefined(userModel.dateOfBirth) || userModel.dateOfBirth === null))
				requestObj.dateOfBirth = userModel.dateOfBirth;
			
			if(!(angular.isUndefined(userModel.gender) || userModel.gender === null))
				requestObj.gender = userModel.gender;
			if(!(angular.isUndefined(userModel.accountType) || userModel.accountType === null))
				requestObj.accountType = userModel.accountType;

			
	 	}//end of main if
		return false;
    };
	
	
	

    // define the getProfile method which will fetch data
    User.prototype.getMasterData = function() {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		
        $http({
		  method: 'GET',
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
	

    // define the getProfile method which will fetch data
    User.prototype.validateProfile = function(userId,authToken,auth) {

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
	
	// register the user
    User.prototype.registerProfile = function(userId,authToken) {

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
		  url: ServiceURLs.registerUserProfileServiceURL, 
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
