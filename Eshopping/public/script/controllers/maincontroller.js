(function () {

    'use strict';

ofkapp.controller("mainController", ["$scope", "$http","$location","$timeout","localStorage","GettingStartedService", "CommonDataService",
	function($scope,$http,$location,$timeout,localStorage,GettingStartedService, CommonDataService) {
	
	//common angular service to fetch common data like userId,session and so on
	var commonDataServiceInit = new CommonDataService();
	var staticURL = BuildURL.getStaticURL();
	
	
	
	/**
	  * @function isUndefinedOrNull
	  * @memberOf angular_module.ofkapp
	  * @params val to be checked
	  * @description This is used to verify Null and empty checks
	  */
	angular.isUndefinedOrNull = function(val) {
    	return angular.isUndefined(val) || val === null;
    };
	
	
	
	
	/**
	  * @function initGettingStartedView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description Init method to be called on page load for initializing necessary  things
	  */
	$scope.initGettingStartedView = function(isReqFromHeader){
	
		$scope.$parent.navEnabled = false; //for slider
		$scope.$parent.subNavEnabled = true; //for slider
        $scope.$parent.isAtStep = 0; //for progressBar
		$scope.isLogin = false;
		
		var returnObj = getParams();
		
		if(angular.isUndefinedOrNull(commonDataServiceInit.userId) && 
			!returnObj.isFromOtherSource){
			
			initialize(returnObj.isFromOtherSource);
			return false;
			
		}else{
			$scope.invokeUserVerification(returnObj.isFromOtherSource , 
				returnObj.auth );
		}
		$scope.$parent.isReqFromHeader = "";
		if(isReqFromHeader){
			$scope.$parent.isReqFromHeader = isReqFromHeader;
			$location.path('/gettingstarted');
		}

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
		var returnObj = {};
		console.log("paramsObj getParams- "+JSON.stringify(paramsObj));

		//if req from SFDC clear cache
		var sfdcStr = '||sfdcreq';
		if(auth && auth.indexOf(sfdcStr) > -1){
			console.log("Req From SFDC - ");
			localStorage.clearStorage();
		}

		if(!angular.isUndefinedOrNull(auth)){	
			returnObj.auth = auth;
			returnObj.isFromOtherSource = true;
			$scope.$parent.isFromOtherSource = true;
			return returnObj;
		}else{
			returnObj.isFromOtherSource = false;
			$scope.$parent.isFromOtherSource = true;
			return returnObj;
		}
	};
	
	 /**
	  * @function invokeUserVerification
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  validating user on login
	  */
	$scope.invokeUserVerification = function(isFromOtherSource,auth){
	
		// instantiate LoginService
		var userService = new GettingStartedService();
		var isMasterDataRequired = false;
		var dob;
		
		/*if($scope.listOfCountries.length <= 0 || $scope.listOfAges.length <= 0){
			isMasterDataRequired = true;
		}*/
			
		console.log('Main COntroller invokeUserVerification');
		console.log('Main COntroller isFromOtherSource ', isFromOtherSource);
		console.log('Main COntroller auth ', auth);

		// fetch data and publish on scope
		userService.validateProfile(commonDataServiceInit.userId,commonDataServiceInit.authToken,auth,isMasterDataRequired).then(function(response) {
			
			var userData = response.data; 
			
			console.log('Main COntroller response ', response.data);

			if(isFromOtherSource){
				var headers = response.headers();
				localStorage.setData("authToken", headers['authtoken']);
				localStorage.setData("userId", headers['userid']);
			}
			
			
			if(userData.Success){
				$scope.accountModel = userData;
				//initialize menu items to show/hide
				//initializeMenu(userData,historyModel,response.data,userData.isAtStep);
				
			}else{
					clearStorage();
					window.location.href = staticURL+ "views/gettingstarted.html";
			}
					
				//NavigationMenu.init();
		}).catch(function(error) {
			// This is set in the event of an error.
			errorHandling(error);
				
		});
	};

	
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
			commonDataServiceInit.logout().then(function(response) {
					
					var responseData = response.data;
					
					if(responseData.isSuccess){
						clearStorage();
						window.location.href = staticURL+ "views/gettingstarted.html#/gettingstarted";	
					}else{ //todo handle logout failure
					}
					
					
			}).catch(function(error) {
                // This is set in the event of an error.
                errorHandling(error);
            });
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
	//	localStorage.setData("isLoggedIn", false);
	};
	
	/**
	  * @function redirectToLogin
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description redirect to login page
	  */
	$scope.redirectToLogin = function(){
		window.location.href = staticURL+ "views/gettingstarted.html#/gettingstarted";
	};
	
	
	
	/**
	  * @function fadeOut
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  Used to fade out service messages after perios of time
	  */
	$scope.fadeOut = function(){
		$timeout(function(){
			$scope.onSuccess = false;
		}, 10000);
 	};

}]); //mainController function end
})();