(function () {
    'use strict';
/**
 * @author gopal.atla@appshark.com>
 * @copyright 2016 Appshark Ltd. All rights reserved.
 * @Description Login Controller to be used to validate login,reset the password and    * Sign Up related functions 
 */
ofkapp.controller('loginController',  ['$scope','$timeout' , '$location','LoginService','CommonDataService','localStorage','GettingStartedService',
function($scope,$timeout, $location,LoginService,CommonDataService,localStorage,GettingStartedService) {

		var staticURL = BuildURL.getStaticURL();
		$scope.$parent.representerType;
		$scope.$parent.accountModel = {};
		//common angular service to fetch common data like userId,session and so on
		var commonDataServiceInit = new CommonDataService();
		
		//Null and empty checks
		angular.isUndefinedOrNull = function(val) {
			return angular.isUndefined(val) || val === null || val === "";
		};
		

	
	/**
	  * @function getParams
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description to read url params from url
	  */
	var getParams = function(){
		var paramsObj = $location.search();
		var auth = paramsObj.auth;
		console.log("paramsObj auth- "+JSON.stringify(auth));
		var returnObj = {};
		console.log("paramsObj - "+JSON.stringify(paramsObj));
		
		if(!angular.isUndefinedOrNull(auth)){
			
			returnObj.auth = auth;
			returnObj.isFromOtherSource = true;
			$scope.$parent.isFromOtherSource = true;
			return returnObj;
		}else{
			returnObj.isFromOtherSource = false;
			$scope.$parent.isFromOtherSource = false;
			return returnObj;
		}
	};
	
	
	/**
	  * @function initGettingStartedView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description Init method to be called on page load for initializing necessary  things
	  */
	$scope.initGettingStartedView = function(isReqFromHome){
	
		
			$scope.validateSession();
		
		
	};
	
	
	
	

	/**
	  * @function validateSession
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  validating user session if local storage contains data
	  */
	$scope.validateSession = function(isFromOtherSource , auth){
			var staticURL;
			localStorage.setData("isLoggedIn", false);

			//localStorage.setData("userId", 'sxN09ccyiH6aS2u0UqtG4A%3D%3D');
			//localStorage.setData("authToken", 'utndJcTGTSL%2F9sG31hK%2FFqkCr5fUXyEyxJ6sI5pz4Wcqsb8Zn496MVK1BZS6Slzd');

			var userId = localStorage.getData("userId");
			var authToken = localStorage.getData("authToken");

			$scope.$parent.disableSiginInButton = false;

			console.log("requested data is ::: ",  $location.search());
		

			$scope.$parent.userId = localStorage.getData("userId");
			$scope.$parent.accountModel.userId = localStorage.getData("userId");		
			$scope.$parent.accountModel.password = localStorage.getData("password");		
					
			if($scope.$parent.accountModel.userId && $scope.$parent.accountModel.password)		
				$scope.$parent.accountModel.rememberMe = true;
	
			console.log("Login Model ::::::: ", $scope.$parent.accountModel);
			console.log("Validate session ::::::: 1");
			console.log("Validate session ::authToken ", authToken);
			console.log("Validate session ::userId ", userId);
			if(!isFromOtherSource && (angular.isUndefinedOrNull(userId) || angular.isUndefinedOrNull(authToken))){
				return false;
			}
			console.log("Validate session ::::::: 10");
			// instantiate LoginService
			var commonDataServiceInit = new CommonDataService();
		
			// fetch data and publish on scope
			commonDataServiceInit.validateProfile(userId,authToken,auth,false).then(
			function(response) {
				var userData = response.data;
				console.log("Validate session userData ::: ",userData);
					if(userData.Success){
						  staticURL = BuildURL.getStaticURL();
						  $scope.$parent.accountModel = userData;
						  localStorage.setData("isLoggedIn", true);

						  $scope.$parent.accountModel = userData;
						  

					/*	var headers = response.headers();
							localStorage.setData("authToken", headers['authtoken']);
							localStorage.setData("userId", headers['userid']);*/
						
						var viewToBeLoaded = decisionPath(userData);
						
						if(userData.isFromOtherSource == 0){
							window.location.href = staticURL+ "views/main.html#/" + viewToBeLoaded;
						}else{
							window.location.href = staticURL+ "views/main.html#/" + viewToBeLoaded ;
						}
						
						return true;
					}
					
				return true;
				
			}).catch(function(error) {
                // This is set in the event of an error.
				 errorHandling(error);
					
            });
	};

	/**
	  * @function resetPassword
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  Reset user password
	  */
		$scope.resetPassword = function(accountModel){
		
			var isFromValid = true;
			
			//if model is not null
			if(angular.isUndefinedOrNull(accountModel) ){
				isFromValid = false;
			}
			
			//if email & model is not null
			if(isFromValid && angular.isUndefinedOrNull(accountModel.email)){
					isFromValid = false;
			}
			
			//if email & model is not null
			if(isFromValid && accountModel.email == ""){
					isFromValid = false;
			}
				
			if(!isFromValid){

				$scope.onError = true;
				//$scope.serviceMessage = "Please enter email";
				$scope.serviceMessage = loginValidationMessages.emailMessageValid;
				//fadeout service message
				$scope.fadeOut();
				return false;
			}

			$scope.$parent.disableResetPasswordButton = true;
			
			// instantiate LoginService
			var loginService = new LoginService(null, null, accountModel.email);
			
			// fetch data and publish on scope
			loginService.validateAndResetAccount().then(function(response) {
					console.log("response - "+JSON.stringify(response));
					$scope.$parent.disableResetPasswordButton = false;
					var responseObj = response.data;
					if(responseObj.isSuccess){
						
						//set params
						$scope.onSuccess = responseObj.isSuccess;
						$scope.serviceMessage = responseObj.serviceMessage;
						
						//fadeout service message
						//$scope.fadeOut();
					}else{
						
						$scope.onError = !(responseObj.isSuccess);
						$scope.serviceMessage = loginValidationMessages.emailMessageExists;
					}
					
			}).catch(function(error, status) {
                // This is set in the event of an error.
                $scope.error = 'There has been an error: ' + error;
            });
	    };
		
	/**
	  * @function userLoginValidation
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  validating user details
	  */
		$scope.userLoginValidation = function(accountModel){
			staticURL = BuildURL.getStaticURL();
			
			// instantiate LoginService
			var loginService = new LoginService(accountModel.loginId,accountModel.password);
			
			// fetch data and publish on scope
			loginService.validateLogin().then(function(response) {
					var headers = response.headers();
					var responseObj = response.data;
					$scope.$parent.disableSiginInButton = false;
					if(responseObj.isSuccess){
						$scope.$parent.onFormSubmit = false;
						localStorage.setData("authToken", headers['authtoken']);
						localStorage.setData("userId", headers['userid']);
						localStorage.setData("isLoggedIn", true);
						
						if(accountModel.rememberMe){		
							localStorage.setData("loginId", accountModel.loginId);		
							localStorage.setData("password", accountModel.password);		
						}else{		
							localStorage.clearRemeberStorage();		
						}	
						var viewToBeLoaded = decisionPath(responseObj);
						if(responseObj.isFromOtherSource == 0)
							window.location.href = staticURL+ "views/main.html#/" + viewToBeLoaded;
						else
							window.location.href = staticURL+ "views/main.html#/" + viewToBeLoaded ;
					}else{
						var isUserValid = responseObj.isUserValid;
						$scope.onError = !(responseObj.isSuccess);
						if(isUserValid){
							$scope.serviceMessage = responseObj.Message;
						}else{
							$scope.serviceMessage = loginValidationMessages.emailMessageExists;
						}
						
					}
					
			}).catch(function(error, status) {
                // This is set in the event of an error.
                $scope.error = 'There has been an error: ' + error;
            });
	    };

		

	 /**
	  * @function userRegistration
	  * @memberOf angular_module.ofkapp
	  * @params accountModel (model to be saved into salesforce)
	  * @description  Registering profile 
	  */
	$scope.userRegistration = function(accountModel){
			//get static URL
			staticURL = BuildURL.getStaticURL();
			
			//accountModel.dob = $scope.$parent.dob;
			
			$scope.$parent.disableCreateAccButton = true;
			// instantiate Getting Started Service
			var userService = new GettingStartedService(accountModel,1);
			
			// fetch data and publish on scope
			userService.registerProfile(commonDataServiceInit.userId,commonDataServiceInit.authToken).then(function(response) {
					var responseData = response.data;
					var headers = response.headers();
					$scope.$parent.accountModel = responseData;
					if(responseData.isSuccess){
							
							localStorage.setData("authToken", headers['authtoken']);
							localStorage.setData("userId", headers['userid']);	
							localStorage.setData("isLoggedIn", true);	
							
							var viewToBeLoaded = decisionPath(responseData);
							window.location.href = staticURL+ "views/main.html#/" + viewToBeLoaded;
								
					}else if(!responseData.isSuccess){ 
						$scope.$parent.disableCreateAccButton = false;
						$scope.onError = !(responseData.isSuccess);
						$scope.serviceMessage = "Invalid Email"
					}else{//to do error handling
						$scope.$parent.disableCreateAccButton = false;
						$scope.onError = !(responseData.isSuccess);
						$scope.serviceMessage = responseData.serviceMessage;
					}
			}).catch(function(error) {
                // This is set in the event of an error.
                errorHandling(error);
            });
	};//end of userRegistration
	

	
	
	/**
	  * @function logout
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  logout profile (deactivate/delete session)
	  */
	$scope.logout = function(){

			// instantiate CommonDataService
			var commonDataServiceInit = new CommonDataService();
			
			//update data to server
			commonDataServiceInit.logoutFromLoginController().then(function(response) {
					
					var responseData = response.data;
					
					if(responseData.isSuccess){
						$scope.$parent.accountModel = {};
						clearStorage();
						//get static URL
						var staticURL = BuildURL.getStaticURL();
						location.reload(true);
						window.location = staticURL+ "views/gettingstarted.html#/gettingstarted";	
					}else{ //todo handle logout failure
					}
					
					
			}).catch(function(error) {
                // This is set in the event of an error.
                errorHandling(error);
            });
	};
	
	
	
		
		/**
		  * @function redirectToView
		  * @memberOf angular_module.ofkapp
		  * @params 
		  * @description  redirect to the vie mentioned as per teh angular route
		  */
		$scope.redirectToView = function(view){
			console.log("staticURL - "+ staticURL);
			console.log("Test"+$scope.$parent.isReqFromHeader);

			

			var isFromHeader = "";
			if($scope.$parent.isReqFromHeader){
				isFromHeader = $scope.$parent.isReqFromHeader;
			}
			if(view == 'userrole' && isFromHeader){
				$scope.validateSession();
			}else{
				$location.path('/'+view);
			}
			
		};
		
		
	/**
	  * @function errorHandling
	  * @memberOf angular_module.ofkapp
	  * @params error (conatins erro details)
	  * @description  error handling on ajax failures
	  */
	var errorHandling = function(error){
	
			if(error.status == 401){//if unauthorized
				clearStorage();
				window.location.href = staticURL+ "views/gettingstarted.html#/gettingstarted";
			}else if(error.status == 400){ //if url not found
				window.location.href = staticURL+ "views/404.html";
			}else if(error.status == 500){ //if url not found
				//window.location.href = staticURL+ "views/404.html";
			}
	};
	
	/**
	  * @function clearStorage
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description USed to clear local storage 
	  */
	var clearStorage = function(){
		localStorage.clearStorage();
	};
		
		/**
	  * @function decisionPath
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description Conditional check for the path to direct where user left off
	  */
	var decisionPath =  function(userData){
		if(userData.isCustomer)
			return 'shopproducts';
		else
			return 'products';
	};// end of function
		
	
}]);//end of controller

})(); //end of function
