(function () {

    'use strict';

ofkapp.controller("productController", ["$scope","$location","localStorage","ProductService", "CommonDataService",
	function($scope,$location,localStorage,ProductService,CommonDataService) {
	
	//common angular service to fetch common data like userId,session and so on
	var commonDataServiceInit = new CommonDataService();
	var productService = new ProductService();
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
	  * @function checkDisableStateAndRedirect
	  * @memberOf angular_module.ofkapp
	  * @params viewToBeRedirected view name
	  * @params disableState to check disable state
	  * @description  To block/show view based on disable state
	  */	
	$scope.checkDisableStateAndRedirect = function(subMenuItemInfo){

	var disableState = subMenuItemInfo.disableState,
		viewToBeRedirected = subMenuItemInfo.refUrl,
		subMenuItem = subMenuItemInfo.subMenuItem,
		uploadViews = ['Upload | Hair loss pattern','Upload | System attached','Upload | With headband'];

		if(subMenuItem && uploadViews.indexOf(subMenuItem) >= 0)
			subMenuItemInfo.isSelected = true;

		var userId = localStorage.getData("userId");
		var authToken = localStorage.getData("authToken");

		if(!Boolean(disableState)) {
				// instantiate LoginService
			var gettingStartedService = new GettingStartedService(null, null, viewToBeRedirected);
			
			// fetch data and publish on scope
			gettingStartedService.updateProfile(userId, authToken, viewToBeRedirected).then(function(response) {
					console.log("response updateUserView- "+JSON.stringify(response));
					var responseObj = response.data;
					if(responseObj.isSuccess){
						
						//set params
						$scope.onSuccess = responseObj.isSuccess;
						$scope.serviceMessage = responseObj.serviceMessage;
						
						$scope.$parent.ofkModel.country = $scope.$parent.ofkModel.oldCountry;
						$scope.$parent.shippingCountryIndexLoc = getIndexOf($scope.listOfCountries,$scope.$parent.ofkModel.country,"Name");
						$scope.$parent.isShippingAvailable = Boolean($scope.listOfCountries[$scope.$parent.shippingCountryIndexLoc].isShippingAvailable);
						//fadeout service message
						//$scope.fadeOut();
					}else{
						$scope.onError = !(responseObj.isSuccess);
						$scope.serviceMessage = "Email Already Exists";
					}
					$location.path('/'+viewToBeRedirected);
			}).catch(function(error, status) {
				// This is set in the event of an error.
				$scope.error = 'There has been an error: ' + error;
			});
		}
		
	};
	
	
	
	/**
	  * @function SlideSubMenu
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  To hide/show Sub Menu of navigation 
	  */	
	$scope.SlideSubMenu = function(subNavEnabled){
		if(subNavEnabled) 
			$scope.$parent.subNavEnabled = false;
		else
			$scope.$parent.subNavEnabled = true;
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
	  * @function initialize
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description Initialize user model
	  */
	$scope.initialize = function(){
		 var userId = localStorage.getData("userId");
		 if(!userId) return;
		 $scope.productsExists = false;
		 productService.getProduceDetails(commonDataServiceInit.userId,commonDataServiceInit.authToken).then(function(response) {
			$scope.productobjectmodel = response.data;
			var serviceResponse = $scope.productobjectmodel;
			if(serviceResponse.isSuccess){
				if((serviceResponse.products).length > 0)
					$scope.productsExists = true;

			}else{
					$scope.onError = !(serviceResponse.isSuccess);
					$scope.serviceMessage = serviceResponse.serviceMessage;
			}
			
		}).catch(function(error) {
			// This is set in the event of an error.
			errorHandling(error);
		});;

		
	};
	
	
	$scope.saveProduct = function(productobjectmodel){
		console.log("Product Object Model", JSON.stringify(productobjectmodel));
		$scope.enablediv=true;
		if(!productobjectmodel) return;
		$scope.serviceSuccess = false;
		productService.saveProduct(commonDataServiceInit.userId,commonDataServiceInit.authToken, productobjectmodel).then(function(response) {
			var serviceResponse = response.data;
			if(serviceResponse.IsSuccess){
				$scope.enablediv=true;
				$scope.serviceSuccess = true;
				$scope.serviceMessage = serviceResponse.serviceMessage;
			}else{
					$scope.serviceSuccess = false;
					$scope.onError = !(serviceResponse.IsSuccess);
					$scope.serviceMessage = serviceResponse.serviceMessage;
			}
			
		}).catch(function(error) {
			// This is set in the event of an error.
			errorHandling(error);
		});;
	}
	
	$scope.editItem = function(item){
		$scope.enablediv=true;
		$scope.ProductModel = item;
		$scope.serviceSuccess = false;
	}

	

	$scope.updateProduct = function(productobject){
		console.log("Product Delete Model", JSON.stringify(productobject));
		var requestObject = productobject;
		requestObject.isActive = 1;
		
		productService.updateProduct(commonDataServiceInit.userId,commonDataServiceInit.authToken, requestObject).then(function(response) {
			var serviceResponse = response.data;
			if(serviceResponse.IsSuccess){
				$scope.enablediv=true;
				$scope.serviceSuccess = true;
				$scope.serviceMessage = serviceResponse.serviceMessage;
			}else{
				$scope.serviceSuccess = false;
					$scope.onError = !(serviceResponse.IsSuccess);
					$scope.serviceMessage = serviceResponse.serviceMessage;
			}
			
		}).catch(function(error) {
			// This is set in the event of an error.
			errorHandling(error);
		});;
	}

	$scope.deleteProduct = function(productobject){
		console.log("Product Delete Model", JSON.stringify(productobject));
		var requestObject = productobject;
		requestObject.isActive = 0;
		$scope.serviceSuccess = false;
		productService.updateProduct(commonDataServiceInit.userId,commonDataServiceInit.authToken, requestObject).then(function(response) {
			var serviceResponse = response.data;
			if(serviceResponse.IsSuccess){
				$scope.serviceSuccess = true;
				$scope.serviceMessage = serviceResponse.serviceMessage;
			}else{
				$scope.serviceSuccess = false;
					$scope.onError = !(serviceResponse.IsSuccess);
					$scope.serviceMessage = serviceResponse.serviceMessage;
			}
			
		}).catch(function(error) {
			// This is set in the event of an error.
			errorHandling(error);
		});;
	}

	
	/**
	  * @function fadeOut
	  * @memberOf angular_module.ofkapp
	  * @params selectedValue (selected model value)
	  * @description  Used to fade out service messages after perios of time
	  */
	$scope.onShippingCountrySelect = function(selectedValue){
		$scope.$parent.shippingCountryIndexLoc = getIndexOf($scope.listOfCountries,selectedValue,"Name");
		$scope.$parent.isShippingAvailable = Boolean($scope.listOfCountries[$scope.$parent.shippingCountryIndexLoc].isShippingAvailable);
		//$scope.$parent.ofkModel.country = $scope.$parent.ofkModel.oldCountry;
 	};
	
	 /**
	  * @function loadMasterData
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  to get master data like countries,ages and so on	
	  */
	var loadMasterData = function(selectedCountry){
	
		//$scope.ofkModel.country = "";
		//if(!$scope.$parent.listOfCountries) return;
		//if($scope.$parent.listOfCountries.length > 0) return;
		
		var userService = new GettingStartedService();
		
		// fetch data and publish on scope
		userService.getMasterData().then(function(response) {
			$scope.$parent.listOfCountries = response.data.countries;

			//$scope.listOfAges = response.data.ages;

			//Redirecting to the respective page where user left off
			if(!angular.isUndefinedOrNull(selectedCountry)){
				$scope.$parent.shippingCountryIndexLoc = getIndexOf($scope.listOfCountries,selectedCountry,"ISOCode");
				$scope.$parent.isShippingAvailable = true;
			}

		}).catch(function(error) {
			// This is set in the event of an error.
			errorHandling(error);
		});
			
	}
	

	/**
	  * @function errorHandling
	  * @memberOf angular_module.ofkapp
	  * @params error (conatins erro details)
	  * @description  error handling on ajax failures
	  */
	var errorHandling = function(error){
	
			if(error.status == 401){//if unauthorized
				localStorage.clearStorage();
				window.location.href = staticURL+ "views/gettingstarted.html#/gettingstarted";
			}else if(error.status == 400){ //if url not found
				window.location.href = staticURL+ "views/404.html";
			}else if(error.status == 500){ //if url not found
				//window.location.href = staticURL+ "views/404.html";
			}
	};
	
	
}]); //mainController function end
})();