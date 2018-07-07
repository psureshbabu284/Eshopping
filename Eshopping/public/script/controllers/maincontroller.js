(function () {

    'use strict';
/**
 * @author gopal.atla@appshark.com>
 * @copyright 2016 Appshark Ltd. All rights reserved.
 */
ofkapp.controller("mainController", ["$scope", "$http","$location","$timeout","localStorage","GettingStartedService","CommonDataService","ageValidationMessages", "userRoleValidationMessages","menuConstants", "createAccountValidationMessages",
	function($scope,$http,$location,$timeout,localStorage,GettingStartedService,CommonDataService,ageValidationMessages,userRoleValidationMessages,menuConstants,createAccountValidationMessages) {
	//NavigationMenu.init();
	$scope.ageValidationMessages = ageValidationMessages;
	$scope.userRoleValidationMessages = userRoleValidationMessages;
	
	$scope.createAccountValidationMessages = createAccountValidationMessages;
	
	$scope.$parent.isGettingStartedDone = false;
	$scope.$parent.listOfMenuItems = menuConstants;
	
	//common angular service to fetch common data like userId,session and so on
	var commonDataServiceInit = new CommonDataService();
	var staticURL;
	var hdLoginURL;
	
	var subMenuItem = $scope.$parent.listOfMenuItems[0].subMenuItems;
	var mainMenuItem = $scope.$parent.listOfMenuItems[0];
	var historySubMenuItem = $scope.listOfMenuItems[1].subMenuItems;
	var manualSubMenuItem = $scope.listOfMenuItems[2].subMenuItems;
	var vmSubMenuItem = $scope.listOfMenuItems[3].subMenuItems;
	var moldSubMenuItem = $scope.listOfMenuItems[5].subMenuItems;
	var frontalGuideSubMenuItem = $scope.listOfMenuItems[4].subMenuItems;
	var personalizationSubMenuItem = $scope.listOfMenuItems[6].subMenuItems;
	var hairColorSubMenuItem = $scope.listOfMenuItems[8].subMenuItems;
	var hairStyleSubMenuItem = $scope.listOfMenuItems[7].subMenuItems;
	var consultationSubMenuItem = $scope.listOfMenuItems[9].subMenuItems;
	
	var historyMenuItem = $scope.listOfMenuItems[1];
	var manualMenuItem = $scope.listOfMenuItems[2];
	var vmMenuItem = $scope.listOfMenuItems[3];
	var frontalGuideMenuItem = $scope.listOfMenuItems[4];
	var assistViews = ['vmdecide','vmassistsupplies','vmassistrecord'];
	var selfViews = ['vmselfrecordsteps','vmselfsupplies','vmselfrecord'];	
	var progressFlag = false;
	
	
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
	  * @function initRepresentative
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  To init Representative parameters
	  */	
	$scope.initRepresentative = function(){
		$scope.$parent.onRepContactFormSubmit = false;
	};
	
	/**
	  * @function initAgeView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  To init age parameters
	  */	
	$scope.initAgeView = function(){
		var isAgeNotValid = $scope.$parent.isAgeNotValid;
		console.log("cookies - "+ document.cookie);
		
		$scope.$parent.disableDOBContinue = false;
		
		loadMasterData();

		if(!isAgeNotValid)
			$scope.$parent.isAgeNotValid = -1;
	};

	/**
	  * @function locationinit
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  To init age parameters
	  */	
	$scope.locationinit = function(){
		$scope.$parent.disableLocContButton = false;
		loadMasterData();
	};
	
	/**
	  * @function initGenderView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  To init age parameters
	  */	
	  $scope.initGenderView = function(){
	
		$scope.$parent.disableGenderConButton = false;

	};
	

	

	/**
	  * @function SlideMenu
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  To hide/show background dimmer
	  */	
	$scope.SlideMenu = function (navEnabled){
		var navmain = $('#navmain').css('display');
		//console.log("navmain - "+ navmain);
		if(navEnabled) {
			$scope.$parent.navEnabled = false;
			$('#navmain').hide();
		}else{
			$scope.$parent.navEnabled = true;
			$('#navmain').show();
			$("div.fc-popover").hide();
		}
		
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
						
						$scope.$parent.accountModel.country = $scope.$parent.accountModel.oldCountry;
						$scope.$parent.shippingCountryIndexLoc = getIndexOf($scope.listOfCountries,$scope.$parent.accountModel.country,"Name");
						$scope.$parent.isShippingAvailable = Boolean($scope.listOfCountries[$scope.$parent.shippingCountryIndexLoc].isShippingAvailable);
						//fadeout service message
						//$scope.fadeOut();
					}else{
						$scope.onError = !(responseObj.isSuccess);
						$scope.serviceMessage = loginValidationMessages.emailMessageExists;
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
		
		console.log("Main Controller initGettingStartedView");

	//	$scope.listOfCountries = [];
		$scope.listOfFiles = [];
		
		$scope.isGettingStartedFromValid = true; 
		//$scope.validationMsgCode = -1;
		
		staticURL = BuildURL.getStaticURL();
		//$scope.hd_logo = staticURL + "images/hd_header.png";

		
		
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
	  * @function initialize
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description Initialize user model
	  */
	var initialize = function(isFromOtherSource){
	
		//model object 
		var userObj = {};
		userObj.age__c = "";
		userObj.gender = -1;
		userObj.country = "";
		userObj.MM = "";
		userObj.DD = "";
		userObj.YYYY = "";
		userObj.repfirstName = "";
		userObj.replastName = "";
		userObj.repemail = "";
		
		if(isFromOtherSource == true){
			userObj.userType = -1;
			userObj.isAccountYours = -1;
			userObj.isHairSystemExists = 0;
			userObj.isHairSystemExistsForRepresentative = 0;
			userObj.representerType = -1;
		}
		
		$scope.$parent.accountModel = userObj;
		
		nextOrPreviousView(userObj);
		
		//global variables
		$scope.$parent.isShippingAvailable = true;
		$scope.$parent.shippingCountryIndexLoc = -1;
	};
	
	
	
	
	/**
	  * @function fadeOut
	  * @memberOf angular_module.ofkapp
	  * @params selectedValue (selected model value)
	  * @description  Used to fade out service messages after perios of time
	  */
	$scope.onShippingCountrySelect = function(selectedValue){
		$scope.$parent.shippingCountryIndexLoc = getIndexOf($scope.listOfCountries,selectedValue,"Name");
		$scope.$parent.isShippingAvailable = Boolean($scope.listOfCountries[$scope.$parent.shippingCountryIndexLoc].isShippingAvailable);
		//$scope.$parent.accountModel.country = $scope.$parent.accountModel.oldCountry;
 	};
	
	 /**
	  * @function loadMasterData
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  to get master data like countries,ages and so on	
	  */
	var loadMasterData = function(selectedCountry){
	
		//$scope.accountModel.country = "";
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
	  * @function getCurrentLocation
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  to get current geo location and country
	  */
	$scope.getCurrentLocation = function(accountModel){
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				//$scope.position = position;
				console.log("position - "+ position);
					//lat long
					var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					var geocoder = new google.maps.Geocoder();
					
					geocoder.geocode({ 'latLng': latlng }, function (results, status) {
						if (status == google.maps.GeocoderStatus.OK) { //if status is OK
							if (results[1]) { //if results has content
								//get country from address components array
								var countryName = getCountryFromJson(results);
								$scope.onShippingCountrySelect(countryName);
								$scope.$apply(function () {
									accountModel.country = countryName.trim();
								});
							}
						}
					});
							
			},function(error){
				
				
				//console.log("position - "+ position);
				console.log("error - "+ error);
				  switch(error.code) {
					case error.PERMISSION_DENIED:
						$scope.errorMessage = "User denied the request for Geolocation."
						break;
					case error.POSITION_UNAVAILABLE:
						$scope.errorMessage = "Location information is unavailable."
						break;
					case error.TIMEOUT:
						$scope.errorMessage = "The request to get user location timed out."
						break;
					case error.UNKNOWN_ERROR:
						$scope.errorMessage = "An unknown error occurred."
						break;
					}//end of switch
			},
			{timeout: 30000, enableHighAccuracy: true, maximumAge: 75000});//end of getCurrentPosition
		}else { 
			//Geolocation is not supported by this browser
			console.log("Geolocation is not supported by this browser");
			return;
		}//end of if else

	}
	 /**
	  * @function getCurrentLocation
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  to get country from address components array
	  */
    var getCountryFromJson = function(results){
	
		for (var i = 0; i < results[0].address_components.length; i++){
			var shortname = results[0].address_components[i].short_name;
			var longname = results[0].address_components[i].long_name;
			var type = results[0].address_components[i].types;
			
			if (type.indexOf("country") != -1)
				return longname;
			
		}

	}//end of getCountryFromJson
	 
	  /**
	  * @function isNullOrWhitespace
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  Null & white space check
	  */
	var isNullOrWhitespace = function(text){
		if (text == null)
			return true;
		
		return text.replace(/\s/gi, '').length < 1;
	}//end of isNullOrWhitespace
	 
	 /**
	  * @function redirectTOHD
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirects to HD main website
	  */
	 $scope.redirectTOHD = function(hdLoginURL){
		window.open(hdLoginURL,'_blank');
		
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
			
			var userData = response.data.user; 
			var historyModel = response.data.historyModel; 
			
			console.log('Main COntroller response ', response.data);

			if(isFromOtherSource){
				var headers = response.headers();
				localStorage.setData("authToken", headers['authtoken']);
				localStorage.setData("userId", headers['userid']);
			}
			
			
			if(userData.isSuccess){
					
				if(userData.representerType && userData.representerType == 5){ //if selected spouse
					$scope.$parent.userAccountType = "spouse";
				}else if(userData.representerType && userData.representerType == 6){ //if selected parent
					$scope.$parent.userAccountType = "child";
				}else if(userData.representerType && userData.representerType == 7){ //if selected friend or loved one
					$scope.$parent.userAccountType = "friend or loved one";
				}else if(userData.representerType && userData.representerType == 8){ //if selected Hair Stylist
					$scope.$parent.userAccountType = "customer";
				} 
								
				$scope.$parent.isAtStep = userData.isAtStep;
				$scope.$parent.progressStep = userData.progressStep;
				
				var hdURL = BuildURL.getHDURL();
				hdURL = hdURL + "?id=" + userData.accountId + "&f=" + userData.firstName + "&l=" + userData.lastName;
				
				$scope.$parent.hdLoginURL = hdURL;
				$scope.$parent.enableProgressBar = true;
				$scope.isLogin = userData.IsLogin;
				$scope.$parent.accountModel = userData;
					
				if(historyModel && historyModel.isSuccess)
					$scope.$parent.historyModel = historyModel;
				
												
				if(!angular.isUndefinedOrNull(userData.dob))
				  dob = userData.dob;
							
				if(!angular.isUndefinedOrNull(dob)){
					var dateArray = dob.split('-');
					$scope.$parent.accountModel.dobChanged = false;
					$scope.$parent.accountModel.genderChanged = false;
					
					$scope.$parent.accountModel.DD = dateArray[2];
					$scope.$parent.accountModel.MM = dateArray[1];
					$scope.$parent.accountModel.YYYY = dateArray[0];

					$scope.$parent.isAgeNotValid = isDateOfBirthValid(dob);
					
				}else{
					$scope.$parent.isAgeNotValid = -1;
				}
				
				setUsertype(userData); //set user type
				
				nextOrPreviousView($scope.$parent.accountModel);

				loadMasterData(userData.country);
				
				

				
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

	
	$scope.onMenuClick = function ($event) {
		//$(e.currentTarget)
		
		var $ul = $($event.currentTarget).next('ul');
		$ul.slideToggle(function(){ 
			//run function again
			NavigationMenu.displayArrows()
		});
	 
    }
	
	
	/**
	  * @function initializeMenu
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  To hide/show menu items
	  */	
	var initializeMenu = function(accountModel,historyModel,listOfModels,isOnStep){
	
		
		var isAtStep = 0;
		var isAgeNotValid = $scope.$parent.isAgeNotValid;
		var progressStep = 0;
		
		if(accountModel){
		
			if(accountModel.userType == 0){
				subMenuItem[0].isRequired = false;
			}else if (accountModel.userType == 1){
				if(accountModel.repFirstName){
					if(progressStep <= progressStep + 1)
						progressStep = progressStep + 1;
					
					//set disbale state to false
					subMenuItem[0].disableState = false;
					
					//set next sub menu item disbale state to false
					subMenuItem[1].disableState = false;
					
					subMenuItem[0].isCompleted = 1;
				}else if(!progressFlag){
					progressFlag = true;
					subMenuItem[0].isCompleted = 0;
				}
			}
			
			if(!progressFlag && !accountModel.dob){
				progressFlag = true;
				subMenuItem[1].isCompleted = 0;
			}
			
			//if dob is not null & undefined
			if(accountModel.dob){
			
				//set disbale state to false
				subMenuItem[1].disableState = false;
				
				//set next sub menu item disbale state to false
				subMenuItem[2].disableState = false;
				
				progressStep = progressStep + 1;
				
				if(isAgeNotValid == 1){ //if age is below 18 & above 5
					subMenuItem[0].isRequired = true;
					
					var historySubMenuItem = $scope.$parent.listOfMenuItems[1].subMenuItems;
					historySubMenuItem[0].isRequired = false;
					
					if(accountModel.repFirstName){
						progressStep = progressStep + 1;
						subMenuItem[0].isCompleted = 1;
					}else if(!progressFlag){
						progressFlag = true;
						subMenuItem[0].isCompleted = 0;
					}
				}
					
				subMenuItem[1].isCompleted = 1;
			}else if(!progressFlag){
				progressFlag = true;
				if (accountModel.userType != 1)
					subMenuItem[1].isCompleted = 0;
				else
					subMenuItem[2].isCompleted = 0;
			}
			
			if(accountModel.gender && accountModel.gender != -1){
				//set disbale state to false
				subMenuItem[2].disableState = false;
				//set next sub menu item disbale state to false
				subMenuItem[3].disableState = false;
				
				subMenuItem[2].isCompleted = 1;
				progressStep = progressStep + 1;
			}else if(!progressFlag){
				progressFlag = true;
				if (accountModel.userType != 1)
					subMenuItem[2].isCompleted = 0;
				else
					subMenuItem[3].isCompleted = 0;
			}
			
			if(accountModel.country){
				//set disbale state to false
				subMenuItem[3].disableState = false;
				//set next sub menu item disbale state to false
				subMenuItem[4].disableState = false;
				
				subMenuItem[3].isCompleted = 1;
				progressStep = progressStep + 1;
				//$scope.$parent.progressStep = progressStep;
			}else if(!progressFlag){
				progressFlag = true;
				if (accountModel.repFirstName)
					_this.listOfMenuItems[0].subMenuItems[3].isCompleted = 0;
				else
					_this.listOfMenuItems[0].subMenuItems[4].isCompleted = 0;
			}
			
			nextOrPreviousView(accountModel);
		}
		
		
		//for history
		if(historyModel){
			var historySubMenuItem = $scope.$parent.listOfMenuItems[1].subMenuItems;
			
			if(historyModel.triedMethodIds){
				
				//set disbale state to false
				subMenuItem[4].disableState = false;
				
				//set next sub menu item disbale state to false
				historySubMenuItem[0].disableState = false;
				
				subMenuItem[4].isCompleted = 1;
				progressStep = progressStep + 1;
				mainMenuItem.isCompleted = 1;
				//to open next menu item
				historyMenuItem.isCompleted = 0;
			}else if(!progressFlag){
				progressFlag = true;
				subMenuItem[4].isCompleted = 0;
				historySubMenuItem[0].isCompleted = 0;
			}
			
			if(historyModel.hairLossThumbId && historyModel.hairLossThumbId != -1){
				//to open next menu item
				historyMenuItem.isCompleted = 0;
				
				//hair treatments is not mandatory so enable it after hair loss pattern
				subMenuItem[4].disableState = false;
				//set disbale state to false
				historySubMenuItem[0].disableState = false;
				//set next sub menu item disbale state to false
				historySubMenuItem[1].disableState = false;
				
				// show/hide measurement options on selecting hair loss pattern or invalid age or no front hair line option
				if(!historyModel.isMeasurementRequired 
					|| historyModel.isMeasurementRequired == false
					|| $scope.$parent.isAgeNotValid == 1
					|| historyModel.frontHairLineOption == 3){
					
					historySubMenuItem[3].isRequired = false; 
				}else{
					historySubMenuItem[3].isRequired = true; 
				}
				
				historySubMenuItem[0].isCompleted = 1;
				progressStep = progressStep + 1;
			}else if(!progressFlag){
				progressFlag = true;
				historySubMenuItem[0].isCompleted = 0;
			}
			
			if(historyModel.frontHairLineOption && historyModel.frontHairLineOption != -1){
				//set disbale state to false
				historySubMenuItem[1].disableState = false;
				//set next sub menu item disbale state to false
				historySubMenuItem[2].disableState = false;
				
				historySubMenuItem[1].isCompleted = 1;
				progressStep = progressStep + 1;
			}else if(!progressFlag){
				progressFlag = true;
				historySubMenuItem[1].isCompleted = 0;
			}
			
			if(historyModel.preferredAttachmentType 
				&& historyModel.preferredAttachmentType != -1){
				//set disbale state to false
				historySubMenuItem[2].disableState = false;
				
				//set next sub menu item disbale state to false
				historySubMenuItem[3].disableState = false;
				
				historySubMenuItem[2].isCompleted = 1;
				
				if(!historyModel.isMeasurementRequired && historyModel.isMeasurementRequired == false){
					$scope.$parent.listOfMenuItems[1].isCompleted = 1;
					historySubMenuItem[3].isCompleted = 0;
				}
				
				progressStep = progressStep + 1;
				
				if($scope.$parent.isAgeNotValid == 1){
					$scope.$parent.listOfMenuItems[2].isRequired = false;
					$scope.$parent.listOfMenuItems[3].isRequired = false;
				//	$scope.$parent.listOfMenuItems[4].isRequired = true;
				//	$scope.$parent.listOfMenuItems[5].isRequired = true;
				}else if(historyModel.frontHairLineOption == 3){
					$scope.$parent.listOfMenuItems[2].isRequired = false;
					$scope.$parent.listOfMenuItems[3].isRequired = false;
					$scope.$parent.listOfMenuItems[4].isRequired = false;
					$scope.$parent.listOfMenuItems[5].isRequired = false;
				}
				
				$scope.$parent.listOfMenuItems[6].isRequired = true;
				$scope.$parent.listOfMenuItems[7].isRequired = true;
				$scope.$parent.listOfMenuItems[8].isRequired = true;
				$scope.$parent.listOfMenuItems[9].isRequired = true;
			}else if(!progressFlag){
				progressFlag = true;
				historySubMenuItem[2].isCompleted = 0;
			}
		}else if(!progressFlag){
			progressFlag = true;
			subMenuItem[4].isCompleted = 0;
		}
		
		if(progressStep > $scope.$parent.progressStep)
			$scope.$parent.progressStep = progressStep;
					
		if(listOfModels &&  listOfModels.measurementsModel && historyModel){			
			var measurementsModel = listOfModels.measurementsModel;
			
			//if(measurementsModel){
				measurementMenu(accountModel,historyModel,listOfModels,isOnStep);
			//}
			
			var isFrontalDone = false;
			
			if(historyModel.isFrontalGuideRequired)
				isFrontalDone = frontalGuideMenu(historyModel,isOnStep);
			
			if(!historyModel.isMeasurementRequired && isFrontalDone)
				moldMenu(accountModel,listOfModels.templateModel,isOnStep);
						
		}
		
		if(listOfModels &&  listOfModels.personalizationModel){
			var personalizationModel = listOfModels.personalizationModel;
			
			if(personalizationModel.isSuccess)
				personalizationMenu(listOfModels.personalizationModel);
		}
		
		if(listOfModels &&  listOfModels.hairModel){
			var hairModel = listOfModels.hairModel;
			
			if(hairModel.isSuccess)
				hairColroAndStyleMenu(listOfModels.hairModel);
		}
		
		if(listOfModels &&  listOfModels.consultationModel){
			var consultationModel = listOfModels.consultationModel;
			
			if(consultationModel.isSuccess)
				consultationMenu(listOfModels.consultationModel);
		}
			
		//progressBarCalculation($scope.$parent.progressStep);
	};
	
	/**
	  * @function measurementMenu
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  changing menu dynamically of measurementMenu
	  */
	var measurementMenu  = function(accountModel,historyModel,listOfModels,isOnStep){
			var measurementsModel = listOfModels.measurementsModel;
				
			//enable mold template menu items
			if(!historyModel.isMeasurementRequired && historyModel.isMeasurementRequired === 0){
				historySubMenuItem[3].isRequired = false;
				$scope.listOfMenuItems[5].isRequired = true;
			}
			
			//enable frontal guide menu items
			if(!historyModel.isFrontalGuideRequired){
				$scope.$parent.listOfMenuItems[4].isRequired = false;
			}else{
				$scope.$parent.listOfMenuItems[4].isRequired = true;
			}
			
			if(!historyModel.isFrontalNeedsToBeMarked  && historyModel.isFrontalNeedsToBeMarked === 0){
				frontalGuideSubMenuItem[4].isRequired = false;
			}	
			
			if(measurementsModel.virtualorrmanual && measurementsModel.virtualorrmanual != -1){
				//change state of diable
				historySubMenuItem[3].disableState = false;
				$scope.$parent.listOfMenuItems[1].isCompleted = 1;
				
				historySubMenuItem[3].isCompleted = 1; //measurement options selected
				
				//virtual
				if(measurementsModel.virtualorrmanual == 1){
					
					vmMenuItem.isRequired = true;
					
					if(measurementsModel.isSelfRecording != -1){//assist
					
						vmSubMenuItem[0].isCompleted = 1;
						vmSubMenuItem[1].isRequired = true;
						vmSubMenuItem[2].isRequired = true;
						
						var requiredCount = requiredVideosCount(accountModel,historyModel)
						
						//to enable upload sub menu dynamically
						enableVirtualUploadSubMenu(measurementsModel,vmSubMenuItem,listOfModels.metaDataModelArray,requiredCount);
					
						for(var i = 0; i < vmSubMenuItem.length ; i++ ){
							var viewOfMeasurement = vmSubMenuItem[i].refUrl;
							if(viewOfMeasurement.length == 0){
								if(measurementsModel.isSelfRecording == 1)
									vmSubMenuItem[i].refUrl = assistViews[i];
								else if(measurementsModel.isSelfRecording == 2)
									vmSubMenuItem[i].refUrl = selfViews[i];
							}
						}
						
					}else if(!progressFlag){
						progressFlag = true;
						vmSubMenuItem[0].isCompleted = 0;
					}
					
					if(isOnStep >= 23){
						vmSubMenuItem[1].isCompleted = 1;
						vmSubMenuItem[2].isCompleted = 0;
					}else if(!progressFlag){
						progressFlag = true;
						vmSubMenuItem[1].isCompleted = 0;
					}
					
					/*var requiredCount = requiredVideosCount(accountModel,historyModel);
					
					if(measurementsModel.videoUploadedCount >= 1){
						vmSubMenuItem[2].isCompleted = 1;
						$scope.$parent.listOfMenuItems[3].isCompleted = 1;
					}else if(!progressFlag){
						progressFlag = true;
						vmSubMenuItem[2].isCompleted = 0;
					}*/
					
				}else if(measurementsModel.virtualorrmanual == 2){//manual
					
					manualMenuItem.isRequired = true;
					
					var viewOfMeasurementSize = manualSubMenuItem[2].refUrl;
					var viewOfMeasurementSupply = manualSubMenuItem[0].refUrl;
					
					if(viewOfMeasurementSize){ //update the measurement size view dynamically
						manualSubMenuItem[2].refUrl = nextPathOfManualSize();
					}
						
					if(isOnStep >= 15){
						manualSubMenuItem[0].isCompleted = 1;
						
					}else if(!progressFlag){
						progressFlag = true;
						manualSubMenuItem[0].isCompleted = 0;
					}
					
					if(measurementsModel.headContourMeasurement){
						manualSubMenuItem[1].isCompleted = 1;
						
					}else if(!progressFlag){
						progressFlag = true;
						manualSubMenuItem[1].isCompleted = 0;
					}
					
					
					if(measurementsModel.lengthMeasurement){
						manualSubMenuItem[2].isCompleted = 1;
						
					}else if(!progressFlag){
						progressFlag = true;
						manualSubMenuItem[2].isCompleted = 0;
					}
					
					if(accountModel.isHairSystemExists == 1 || accountModel.isHairSystemExists == 3){//non hair wearer
						if(measurementsModel.measurementUploadedCount >=  4){
							manualSubMenuItem[3].isCompleted = 1;
							
							$scope.$parent.listOfMenuItems[2].isCompleted = 1;
						}else if(!progressFlag){
							progressFlag = true;
							manualSubMenuItem[3].isCompleted = 0;
						}
					}else if(accountModel.isHairSystemExists == 2){//hair wearer
						if(measurementsModel.measurementUploadedCount >=  8){
							manualSubMenuItem[3].isCompleted = 1;
							$scope.$parent.listOfMenuItems[2].isCompleted = 1;
						}else if(!progressFlag){
							progressFlag = true;
							manualSubMenuItem[3].isCompleted = 0;
						}
					}
					
				}
			}else if(!progressFlag){
				historySubMenuItem[3].isCompleted = 0;
			}
	}
	
	 /**
	  * @function enableVirtualUploadSubMenu
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  to enable upload instructions in vitual sub menu dynamically
	  */
	var enableVirtualUploadSubMenu = function(measurementsModel,vmSubMenuItem,metaDataModelArray,requiredCount){
	
		//get no of videos to be uploaded
		var	isCompleted = false,
			completedCount = 0,
			isRemoved,
			index;
		
		
		
			for(var i = 0; i< requiredCount ; i++){
			
				//check whether video is uploaded or not
				if(metaDataModelArray 
							&& metaDataModelArray.length > i)
					isRemoved = metaDataModelArray[i].isRemoved;
				
				if(isRemoved == 0)
					isCompleted = true;
				
				if(i == 0){
					if(requiredCount == 3){
						index = 3;
					}else if(requiredCount == 2){
						index = 3;
					}else if(requiredCount == 1){
						index = 5;
					}
					
				}else if(i == 1){
					if(requiredCount == 3){
						index = 4;
					}else if(requiredCount == 2){
						index = 5;
					}
				}else if(i == 2){
					index = 5;
				}
				
				//update isRequired & isCompleted flags
				vmSubMenuItem[index].isRequired = true;
				vmSubMenuItem[index].isCompleted = isCompleted;
				
				
				if(measurementsModel.isSelfRecording == 1)//for assist
					vmSubMenuItem[index].refUrl = 'vmassistuploadinstruc';
				else if(measurementsModel.isSelfRecording == 2)//for self
					vmSubMenuItem[index].refUrl = 'vmselfuploadinstruc';
					
				//updating index for refering in future uploads
				vmSubMenuItem[index].videoIndex = i;
					
				//increment variable to know how many are uploaded
				if(isCompleted)
					completedCount++;
					
				//check if all videos are uploaded and set upload instructions to completed
				if(completedCount == requiredCount) 
					vmSubMenuItem[2].isCompleted = true;
				
			}//end of for
			
	}
	
	
	/**
	  * @function moldMenu
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  changing menu dynamically of Template
	  */
	var moldMenu = function(accountModel,templateModel,isAtStep){
	
			if(templateModel.isSuppliesDone){
				moldSubMenuItem[0].isCompleted = 1;
				
			}else if(!progressFlag){
				progressFlag = true;
				moldSubMenuItem[0].isCompleted = 0;
			}
			
			if(templateModel.isInstructionsDone){
				moldSubMenuItem[1].isCompleted = 1;
				
			}else if(!progressFlag){
				progressFlag = true;
				moldSubMenuItem[1].isCompleted = 0;
			}
			
			if(templateModel.isShippmentDone){
				moldSubMenuItem[2].isCompleted = 1;
				
			}else if(!progressFlag){
				progressFlag = true;
				moldSubMenuItem[2].isCompleted = 0;
			}
			
			//non hair wearer
			if(accountModel.isHairSystemExists == 1 || accountModel.isHairSystemExists == 3){
				if(templateModel.isSetOneUploaded >= 1){
					moldSubMenuItem[3].isCompleted = 1;
					$scope.$parent.listOfMenuItems[5].isCompleted = 1;
				}else if(!progressFlag){
					progressFlag = true;
					moldSubMenuItem[3].isCompleted = 0;
				}
			}else if(accountModel.isHairSystemExists == 2){//hair wearer
				if(templateModel.isSetOneUploaded >= 1 && templateModel.isSetTwoUploaded >= 1){
					moldSubMenuItem[3].isCompleted = 1;
					$scope.$parent.listOfMenuItems[5].isCompleted = 1;
				}else if(!progressFlag){
					progressFlag = true;
					moldSubMenuItem[3].isCompleted = 0;
				}
			}
	}
	
	/**
	  * @function frontalGuideMenu
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  changing menu dynamically of frontal guide
	  */
	var frontalGuideMenu   = function(historyModel,isAtStep){
	
		if(historyModel.frontHairLineOption == 1)
			frontalGuideSubMenuItem[2].isRequired = true; 
		else if(historyModel.frontHairLineOption == 2)
			frontalGuideSubMenuItem[2].isRequired = false; 
			
		frontalGuideSubMenuItem[4].refUrl = nextPathOfFrontalGuideMeasure(historyModel);
		
		if(isAtStep >= 25){
			frontalGuideSubMenuItem[0].isCompleted = 1;
		}else if(!progressFlag){
			progressFlag = true;
			frontalGuideSubMenuItem[0].isCompleted = 0;
		}
		
		if(isAtStep >= 26){
			frontalGuideSubMenuItem[1].isCompleted = 1;
		}else if(!progressFlag){
			progressFlag = true;
			frontalGuideSubMenuItem[1].isCompleted = 0;
		}
		
		
		if(isAtStep >= 27){
			frontalGuideSubMenuItem[2].isCompleted = 1;
			
		}else if(!progressFlag){
			progressFlag = true;
			frontalGuideSubMenuItem[2].isCompleted = 0;
		}
		
		
		if(isAtStep >= 28){
			frontalGuideSubMenuItem[3].isCompleted = 1;
			
		}else if(!progressFlag){
			progressFlag = true;
			frontalGuideSubMenuItem[3].isCompleted = 0;
		}
		
		if(isAtStep >= 29){
			frontalGuideSubMenuItem[4].isCompleted = 1;
			$scope.$parent.listOfMenuItems[4].isCompleted = 1;
			return true;
		}else if(!progressFlag){
			progressFlag = true;
			frontalGuideSubMenuItem[4].isCompleted = 0;
		}
		
		return false;
	}
	
	/**
	  * @function personalizationMenu
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  changing menu dynamically of Life Style & Environment
	  */
	var personalizationMenu   = function(personalizationModel){
	
			if(personalizationModel.ethnicBackgroundId && personalizationModel.ethnicBackgroundId != -1){
				personalizationSubMenuItem[0].isCompleted = 1;
				personalizationSubMenuItem[1].isCompleted = 1;
			}else if(!progressFlag){
				progressFlag = true;
				personalizationSubMenuItem[1].isCompleted = 0;
			}
			
			
			if((personalizationModel.climateId || personalizationModel.climateId == 0) && personalizationModel.climateId != -1){
				personalizationSubMenuItem[2].isCompleted = 1;
				
			}else if(!progressFlag){
				progressFlag = true;
				personalizationSubMenuItem[2].isCompleted = 0;
			}
			
			if((personalizationModel.profuselyId || personalizationModel.profuselyId == 0)
				&& personalizationModel.profuselyId != -1){
				personalizationSubMenuItem[3].isCompleted = 1;
				
			}else if(!progressFlag){
				progressFlag = true;
				personalizationSubMenuItem[3].isCompleted = 0;
			}
			
			if((personalizationModel.scalpSkinTypeId || personalizationModel.scalpSkinTypeId == 0)
				&& personalizationModel.scalpSkinTypeId != -1){
				personalizationSubMenuItem[4].isCompleted = 1;
				
			}else if(!progressFlag){
				progressFlag = true;
				personalizationSubMenuItem[4].isCompleted = 0;
			}
			
			if((personalizationModel.typeOfExposure || personalizationModel.typeOfExposure == 0)
				&& personalizationModel.typeOfExposure != -1){
				personalizationSubMenuItem[5].isCompleted = 1;
				
			}else if(!progressFlag){
				progressFlag = true;
				personalizationSubMenuItem[5].isCompleted = 0;
			}
			
			if((personalizationModel.hairSystemMaintenanceScheduleId || personalizationModel.hairSystemMaintenanceScheduleId == 0)
				&& personalizationModel.hairSystemMaintenanceScheduleId != -1){
				personalizationSubMenuItem[6].isCompleted = 1;
				$scope.$parent.listOfMenuItems[6].isCompleted = 1;
			}else if(!progressFlag){
				progressFlag = true;
				personalizationSubMenuItem[6].isCompleted = 0;
			}
			
	}
	
	/**
	  * @function hairColroAndStyleMenu
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  changing menu dynamically of Hair Colour & Style
	  */
	var hairColroAndStyleMenu   = function(hairModel){
		if(hairModel){
			//for hair style Menu
		    if(hairModel.hairStyleSourceId && hairModel.hairStyleSourceId != -1){
				hairStyleSubMenuItem[0].isCompleted = 1;
				
				if(hairModel.hairStyleSourceId == 1){
					if(hairModel.hairStyleLinkOne){
						hairStyleSubMenuItem[1].isCompleted = 1;
						$scope.$parent.listOfMenuItems[7].isCompleted = 1;
				    }
					hairStyleSubMenuItem[1].isRequired = true;
					
				}else if(hairModel.hairStyleSourceId == 2){
					if(hairModel.hairStyleUploadOne){
						hairStyleSubMenuItem[2].isCompleted = 1;
						$scope.$parent.listOfMenuItems[7].isCompleted = 1;
					}
					hairStyleSubMenuItem[2].isRequired = true;
				}else if(hairModel.hairStyleSourceId == 3){
					if(hairModel.hairStyleGalleryLinkOne || hairModel.hairStyleGalleryLinkTwo 
							|| hairModel.hairStyleGalleryLinkThree){
						hairStyleSubMenuItem[3].isCompleted = 1;
						$scope.$parent.listOfMenuItems[7].isCompleted = 1;
					}
					hairStyleSubMenuItem[3].isRequired = true;
				}
			}else if(!progressFlag){
				progressFlag = true;
				hairStyleSubMenuItem[0].isCompleted = 0;
			}
			//for hair color Menu
			if(hairModel.hairColorId){
				if(hairModel.isGrowingHairColored && hairModel.isGrowingHairColored != -1){
					hairColorSubMenuItem[0].isCompleted = 1;
					hairColorSubMenuItem[1].isCompleted = 1;
				}else if(!progressFlag){
					progressFlag = true;
					hairColorSubMenuItem[0].isCompleted = 0;
				}
				
				
				if(hairModel.isCurrentHairColored && hairModel.isCurrentHairColored != -1){
					hairColorSubMenuItem[2].isCompleted = 1;
					
				}else if(!progressFlag){
					progressFlag = true;
					hairColorSubMenuItem[2].isCompleted = 0;
				}
				
				if(hairModel.highlightsOrLowlights 
					&& hairModel.highlightsOrLowlights != -1){
					hairColorSubMenuItem[3].isCompleted = 1;
					
				}else if(!progressFlag){
					progressFlag = true;
					hairColorSubMenuItem[3].isCompleted = 0;
				}
				
				if(hairModel.hairColorDominant 
					&& hairModel.hairColorDominant != -1){
					hairColorSubMenuItem[4].isCompleted = 1;
					
				}else if(!progressFlag){
					progressFlag = true;
					hairColorSubMenuItem[4].isCompleted = 0;
				}
				
				if(hairModel.isGrayHairRequired 
					&& hairModel.isGrayHairRequired != -1){
					hairColorSubMenuItem[5].isCompleted = 1;
					
				}else if(!progressFlag){
					progressFlag = true;
					hairColorSubMenuItem[5].isCompleted = 0;
				}
				
				if(hairModel.highlightColorType 
					&& hairModel.highlightColorType != -1){
					hairColorSubMenuItem[6].isCompleted = 1;
					
				}else if(!progressFlag){
					progressFlag = true;
					hairColorSubMenuItem[6].isCompleted = 0;
				}
				
				if(hairModel.hairColorHighColor 
					&& hairModel.hairColorHighColor != -1){
					hairColorSubMenuItem[7].isCompleted = 1;
					
				}else if(!progressFlag){
					progressFlag = true;
					hairColorSubMenuItem[7].isCompleted = 0;
				}
				
				if(hairModel.lowhlightColorType 
					&& hairModel.lowhlightColorType != -1){
					hairColorSubMenuItem[8].isCompleted = 1;
					
					if(hairModel.lowhlightColorType == 2 || hairModel.lowhlightColorType == 3)
						$scope.$parent.listOfMenuItems[8].isCompleted = 1;
				}else if(!progressFlag){
					progressFlag = true;
					hairColorSubMenuItem[8].isCompleted = 0;
				}
				
				if(hairModel.hairColorLowColor 
					&& hairModel.hairColorLowColor != -1){
					hairColorSubMenuItem[9].isCompleted = 1;
					$scope.$parent.listOfMenuItems[8].isCompleted = 1;
				}else if(!hairModel.hairColorLowColor){
					progressFlag = true;
					hairColorSubMenuItem[9].isCompleted = 0;
				}else if(!progressFlag){
					progressFlag = true;
					hairColorSubMenuItem[9].isCompleted = 0;
				}
			}//end of hair color
		}//end of hairmodel
	}
	
	
	/**
	  * @function consultationMenu
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  changing menu dynamically of consultation
	  */
	var consultationMenu   = function(consultationModel){
		if(consultationModel){
				if(consultationModel.scheduleDateTime){
					consultationSubMenuItem[1].isCompleted = 1;
					consultationSubMenuItem[0].isCompleted = 1;
				}else if(!progressFlag){
					progressFlag = true;
					consultationSubMenuItem[1].isCompleted = 0;
				}
			
				if(consultationModel.shippingContactSFID){
					consultationSubMenuItem[2].isCompleted = 1;
					
				}else if(!progressFlag){
					progressFlag = true;
					consultationSubMenuItem[2].isCompleted = 0;
				}
				
				
				if(consultationModel.paymentId){
					consultationSubMenuItem[3].isCompleted = 1;
					
				}else if(!progressFlag){
					progressFlag = true;
					consultationSubMenuItem[3].isCompleted = 0;
				}
				
				
				if(consultationModel.orderId){
					consultationSubMenuItem[4].isCompleted = 1;
					$scope.$parent.listOfMenuItems[9].isCompleted = 1;
				}else if(!progressFlag){
					progressFlag = true;
					consultationSubMenuItem[4].isCompleted = 0;
				}
		}//end of hairmodel
	}
	
	
	/**
	  * @function setUsertype
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  To define user account type
	  */
	var setUsertype = function(accountModel){
	
		if(accountModel.representerType == 5){ //if selected spouse
			$scope.$parent.userAccountType = "spouse";
		}else if(accountModel.representerType == 6){ //if selected parent
			$scope.$parent.userAccountType = "child";
		}else if(accountModel.representerType == 7){ //if selected friend or loved one
			$scope.$parent.userAccountType = "friend or loved one";
		}else if(accountModel.representerType == 8){ //if selected Hair Stylist
			$scope.$parent.userAccountType = "customer";
		}
	
	};
	
	
	 
	
	
	/**
	  * @function updateCheck
	  * @memberOf angular_module.ofkapp
	  * @params accountModel (model to be saved into salesforce)
	  * @description  Check whether update is required or not
	  */
	var updateCheck = function(accountModel,type,isAgeNotValid){
	
		var nextView = nextPath(accountModel,type,isAgeNotValid);
		
		if(type == 2){ //for date of birth
			if(accountModel.oldDOB && accountModel.oldDOB == accountModel.dob){
				$location.path('/'+ nextView);
				return false;
			}
			
		}else if(type == 3){ //for gender	
			if(accountModel.oldGender && accountModel.gender && accountModel.oldGender == accountModel.gender){
				$location.path('/'+ nextView);
				return false;
			}
		}else if(type == 4){//for location
			if(accountModel.oldCountry && accountModel.country && accountModel.oldCountry == accountModel.country){
				$location.path('/'+ nextView);
				return false;
			}
		}
		
		return true;
	}
	
	/**
	  * @function userUpdate
	  * @memberOf angular_module.ofkapp
	  * @params accountModel (model to be saved into salesforce)
	  * @description  updating profile 
	  */
	$scope.userUpdate = function(accountModel,type, isAgeNotValid,isDateValid){
	
			//for updating age
			if(type == 2){
				
				$scope.$parent.disableDOBContinue = true;
				$scope.$parent.disableGenderConButton = false;
				$scope.$parent.disableLocContButton = false;

				if(accountModel.dob){
					isAgeNotValid = isDateOfBirthValid(accountModel.dob);
					isDateValid = true;
				}
				$scope.$parent.isAgeNotValid = isAgeNotValid;

				//if undefined
				if(angular.isUndefinedOrNull(isDateValid)) {
					$scope.onError = true;
					$scope.serviceMessage = ageValidationMessages.requiredValidationMessages;
					return;
				}else if(!isDateValid){
					$scope.onError = true;
					$scope.serviceMessage = ageValidationMessages.requiredValidationMessages;
					return;
				}
				
				if(isAgeNotValid == 2 || isAgeNotValid == 1){
					accountModel.dob = accountModel.YYYY + '-' + accountModel.MM + '-' + accountModel.DD; 
					
					//check for the update
					var checkFlag = updateCheck(accountModel,type, isAgeNotValid); 
					if(!checkFlag) return;
					
				}else{
					return false;
				}
	
			}
			if(type == 3){
				$scope.$parent.disableDOBContinue = false;
				$scope.$parent.disableGenderConButton = true;
				$scope.$parent.disableLocContButton = false;
				var checkFlag = updateCheck(accountModel,type, isAgeNotValid);  //check for the update
					if(!checkFlag) return;
			}
					
			
			//if we doesn't ship to the location
			if(type == 4){
				$scope.$parent.disableDOBContinue = false;
				$scope.$parent.disableGenderConButton = false;
				$scope.$parent.disableLocContButton = true;
				var isFormValid = $scope.locationForm.$valid;
				//please exit if form is not valid
				if(!isFormValid) {
					$scope.isGettingStartedFromValid = isFormValid; 
					return false;
				}
				$scope.onShippingCountrySelect($scope.$parent.accountModel.country);
				if(!$scope.$parent.isShippingAvailable && $scope.$parent.shippingCountryIndexLoc != -1){
					if($scope.$parent.accountModel.oldCountry){
						$scope.$parent.accountModel.country = $scope.$parent.accountModel.oldCountry;
						//$scope.onShippingCountrySelect($scope.$parent.accountModel.country);
					}
					$location.path('/locationunavail');
					return false;
				}
				
				var checkFlag = updateCheck(accountModel,type, isAgeNotValid); 
					if(!checkFlag){
						$scope.$parent.disableLocContButton = false;
						return;
					} 
			}
			
			// instantiate Getting Started Service
			var userService = new GettingStartedService(accountModel,type);//user service
		
			
			//update data to server
			userService.updateProfile(commonDataServiceInit.userId,commonDataServiceInit.authToken).then(function(response) {
					
					var responseData = response.data;
					$scope.$parent.isAtStep = responseData.isAtStep;
					$scope.$parent.disableDOBContinue = false;
					$scope.$parent.disableGenderConButton = false;
					$scope.$parent.disableLocContButton = false;
					if(responseData.isSuccess){
						var nextView = nextPath(accountModel,type,isAgeNotValid);
						
						if(type == 2)
							accountModel.oldDOB = responseData.oldDOB;
						else if(type == 3)
							accountModel.oldGender = responseData.oldGender;
						else if(type == 4)
							accountModel.oldCountry = responseData.oldCountry;
							
						$location.path('/'+ nextView);
					

					}else if(!responseData.isSuccess){ 
						$scope.isGettingStartedFromValid = responseData.isSuccess; 
						$scope.validationMsgCode = responseData.validationMsgCode;
						$scope.serviceMessage = responseData.serviceMessage;
					}else{//to do error handling
						$scope.onError = !(responseData.IsSuccess);
						$scope.serviceMessage = responseData.serviceMessage;
					}
					
			}).catch(function(error) {
                // This is set in the event of an error.
                errorHandling(error);
            });
	};
	
	
	/**
	  * @function userUpdateOtherSource
	  * @memberOf angular_module.ofkapp
	  * @params accountModel (model to be saved into salesforce)
	  * @description  updating profile 
	  */
	$scope.userUpdateOtherSource = function(accountModel,type, isAgeValid){
	
			// instantiate Getting Started Service
			var userService = new GettingStartedService(accountModel,6);//user service
			
			//update data to server
			userService.updateProfile(commonDataServiceInit.userId,commonDataServiceInit.authToken).then(function(response) {
					
					var responseData = response.data;
					
					if(responseData.isSuccess){
					
						if(type == 6){
							if(accountModel.userType){
										
								if(accountModel.representerType == 5){ //if selected spouse
									$scope.$parent.userAccountType = "spouse";
								}else if(accountModel.representerType == 6){ //if selected parent
									$scope.$parent.userAccountType = "child";
								}else if(accountModel.representerType == 7){ //if selected friend or loved one
									$scope.$parent.userAccountType = "friend or loved one";
								}else if(accountModel.representerType == 8){ //if selected Hair Stylist
									$scope.$parent.userAccountType = "customer";
									if($scope.$parent.isFromOtherSource){//if from HD prompt user about account
										$location.path('/userroleaccttypehd');
										return false;
									}
								} 
									$location.path('/userroleaccttypenewhd');
							}else{
								$location.path('/age');
							}
						}else if(type == 7){
							$location.path('/createaccountstylisthd');
						}else if(type == 8){
							if(accountModel.isAccountYours)
								$location.path('/age');
							else
								$location.path('/userroleaccttypenewhd');
						}else if(type == 9){
							$location.path('/userroleaccttyperepinfo');
						}
							
					}else if(!responseData.isSuccess){ 
						$scope.isGettingStartedFromValid = responseData.isSuccess; 
						$scope.validationMsgCode = responseData.validationMsgCode;
						$scope.serviceMessage = responseData.serviceMessage;
					}else{//to do error handling
						$scope.onError = !(responseData.IsSuccess);
						$scope.serviceMessage = responseData.serviceMessage;
					}
					
			}).catch(function(error) {
                // This is set in the event of an error.
                errorHandling(error);
            });
	};//end of userUpdate
	
	var nextPath = function(accountModel,type,isAgeNotValid){
		if(type == 2){
			if(accountModel.userType == 0 && isAgeNotValid == 1){
				$scope.$parent.isFromAge = true;
				$scope.$parent.userAccountType = 'Parent';
				return 'userroleaccttyperepinfo';
			}else{	
				return 'gender';
			}
		}else if(type == 3){
			return 'location';
		}else if(type == 4){
			$scope.$parent.isGettingStartedDone = true;
			return 'fittingtreatments';
		}
	}
	
	
	 /**
	  * @function contactRegistration
	  * @memberOf angular_module.ofkapp
	  * @params accountModel (model to be saved into salesforce)
	  * @description  creating contact for representative
	  */
	$scope.contactRegistration = function(accountModel,type){
		
			var isFormValid = $scope.repContactForm.$valid;
			
			if(!isFormValid) {//please exit if form is not valid
				$scope.$parent.onRepContactFormSubmit = true; 
				return false;
			}
			

			
			// instantiate Getting Started Service
			var userService = new GettingStartedService(accountModel,type);
			
			// fetch data and publish on scope
			userService.createRepresentativeContact(commonDataServiceInit.userId,commonDataServiceInit.authToken).then(function(response) {
					var responseData = response.data;
					
					if(responseData.isSuccess){
							$scope.$parent.accountModel.representativeId = responseData.representativeId;
							$scope.$parent.accountModel.representativeSFID =  responseData.representativeSFID;
							//calculate progress bar
							
							if(accountModel.userType == 1)
								$location.path('/age');
							else
								$location.path('/gender');
								
							
							
					}else{//to do error handling
						$scope.onError = !(responseData.isSuccess);
						$scope.serviceMessage = responseData.serviceMessage;
					}
			}).catch(function(error) {
                // This is set in the event of an error.
                errorHandling(error);
            });
	};

	 /**
	  * @function contactUpdate
	  * @memberOf angular_module.ofkapp
	  * @params accountModel (model to be saved into salesforce)
	  * @description  updating contact info of representative
	  */
	$scope.contactUpdate = function(accountModel,type){
		
			var isFormValid = $scope.repContactForm.$valid;
			
			if(!isFormValid) {//please exit if form is not valid
				$scope.isGettingStartedFromValid = isFormValid; 
				return false;
			}
			
			// instantiate Getting Started Service
			var userService = new GettingStartedService(accountModel,type);
			
			// fetch data and publish on scope
			userService.updateRepresentativeContact(commonDataServiceInit.userId,commonDataServiceInit.authToken).then(function(response) {
					var responseData = response.data;
					
					if(responseData.isSuccess){
							//calculate progress bar
							

							if(accountModel.userType == 1)
								$location.path('/age');
							else
								$location.path('/gender');

					}else{//to do error handling
						$scope.onError = !(responseData.IsSuccess);
						$scope.serviceMessage = responseData.serviceMessage;
					}
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
	  * @function goToUserAccountTypeView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view based on type of user select
	  */
	$scope.goToUserAccountTypeView = function(accountModel){
	
		//$scope.userUpdateOtherSource(accountModel,6,false);
		
		//if undefined
		if(!accountModel) 
			return false;
		
		
		//if self
		if(!accountModel.userType){
			
			if(accountModel.isHairSystemExists == 0){//if nothing selected
				$scope.onError = true;
				return false;
			}

			// check if authenticated from hd
			if(accountModel.isFromOtherSource  == 0)
				$location.path('/createaccounthd');
			else if(accountModel.isFromOtherSource  == 1)
				$scope.userUpdateOtherSource(accountModel,6,false);
				
			
		}else if(accountModel.userType == -1){ //if not selected any option
			$scope.onError = true;
			return false;
		}else{ //if selected representer
			
			if(accountModel.representerType == -1){ //if nothing selected
				$scope.onError = true;
				return false;
			}
			
			if(accountModel.isFromOtherSource  == 1)
				$scope.userUpdateOtherSource(accountModel,6,false);
				
			
		}
		
		return;
	};
	
	/**
	  * @function goToCreateAccountView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view based on type of user
	  */
	$scope.goToCreateAccountView = function(accountModel){
	
		if(!accountModel)
			return false;
		if(!accountModel.isHairSystemExistsForRepresentative){
			$scope.onError = true;
			return false;
		};
		
		if(accountModel.isHairSystemExistsForRepresentative == 0){ // if nothing is selected
			$scope.onError = true;
			return false;
		}
		
		// if stylist option is selected
		if((accountModel.isAccountYours && accountModel.isAccountYours != -1) || accountModel.representerType == 8){ 
			$scope.userUpdateOtherSource(accountModel,8,false);
			
		}else{
			// check if authenticated from hd
			if(accountModel.isFromOtherSource  == 1)
				$scope.userUpdateOtherSource(accountModel,9,false);
		}
		
	};
	
	
	/**
	  * @function goToNextView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view based on type of user
	  */
	$scope.goToNextView = function(accountModel){
	
		if(!accountModel)return false;
			
		if(accountModel.isAccountYours == -1){
			$scope.onError = true;
			return false;
		};
		
		if(!accountModel.isAccountYours && 
			accountModel.isHairSystemExistsForRepresentative == 0){ // if nothing is selected
			$scope.onError = true;
			return false;
		}
			
		if(accountModel.isAccountYours){ // if account belongs to stylist
			$location.path('/userroleaccttypenewhd');
		}else{
			$scope.userUpdateOtherSource(accountModel,7,false);
		}
	};
	
	/**
	  * @function redirectToContactView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view based on type of user
	  */
	$scope.redirectToContactView = function(accountModel){
		if(!accountModel)
			return false;
			
			if(!accountModel.userType){
				$location.path('/age');
				$scope.isFromAge = false;
			}else{	
				$location.path('/userroleaccttyperepinfo');
			}
		
	};
	
	/**
	  * @function redirectToGenderView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view based on type of user
	  */
	$scope.redirectToGenderView = function(isAgeNotValid){
	
		if(angular.isUndefinedOrNull(isAgeNotValid)){
			$scope.onError = true;
			$scope.serviceMessage = ageValidationMessages.requiredValidationMessages;
			return;
		}
		if(isAgeNotValid == 1){
			$scope.onError = false;
			$scope.$parent.isFromAge = true;
			$scope.$parent.userAccountType = 'Parent';
			$location.path('/userroleaccttyperepinfo');
		}else{	
			$location.path('/gender');
		}
		
	};
	
	
	/**
	  * @function init nextAndPreviousStep View
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description to decide the next or previous view based on user selection
	  */
	var nextOrPreviousView = function(accountModel){
		//age
		if(accountModel.DD && accountModel.DD != "" && accountModel.DD != null){
			accountModel.dobExist = true;
			
		}else{
			accountModel.dobExist = false;	
		}
		
		//gender
		if(accountModel.gender && accountModel.gender != -1){
			accountModel.genderExist = true;
			
		}else{
			accountModel.genderExist = false;	
		}
		
		//location
		if(accountModel.country && accountModel.country != -1 && accountModel.country != null){
			accountModel.locationExist = true;
			
		}else{
			accountModel.locationExist = false;	
		}	
	};
	
	/**
	  * @function redirectToPreviousViewFromGender
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view based on type of user
	  */
	$scope.redirectToPreviousViewFromGender = function(isAgeNotValid){
			var isAgeNotValid = $scope.$parent.isAgeNotValid;
			//$scope.$parent.disableGenderConButton = false;
			if(isAgeNotValid == 1){
				$location.path('/userroleaccttyperepinfo');
			}else{	
				$location.path('/age');
			}
		
	};
	
	
	/**
	  * @function redirectToParentContactView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view based on type of user
	  */
	$scope.redirectToParentContactView = function(){
		$scope.$parent.userAccountType = "Parent";
		$location.path('/userroleaccttyperepinfo');
		
	};

	/**
	  * @function redirectToStylistView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view mentioned as per the angular route
	  */
	$scope.redirectToStylistView = function(accountModel){
		$location.path('/'+view);
	};
	
	/**
	  * @function redirectToView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view mentioned as per the angular route
	  */
	$scope.redirectToView = function(view){
		$scope.$parent.disableLocContButton = false;
		$location.path('/'+view);
	};
	
	/**
	  * @function redirectToSignIn
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view mentioned as per the angular route
	  */
	$scope.redirectToSignIn = function(view){
		console.log('redirectToSignIn main controller '+view)
		window.location.href = staticURL+ "views/gettingstarted.html#/" + view;
	};
	
	/**
	  * @function enableAndRedirect
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view mentioned as per the angular route and enable * the progress bar if required
	  */
	$scope.enableAndRedirect = function(view,isEnable){
		$scope.$parent.enableProgressBar = isEnable;
		$location.path('/'+view);
	};
	
	/**
	  * @function redirectToUploadView
	  * @memberOf angular_module.ofkapp
	  * @params measurementsModel measurements model holding all input data
	  * @params view view to be redirected
	  * @params uploads holding video upload content
	  * @params index current uplaoding index
	  * @description  redirect to the view mentioned as per the angular route
	  */
	$scope.$parent.redirectToUploadView = function(measurementsModel,view,uploads,index){
			//if uploads is null
			if(!uploads){
				var subMenuItem = measurementsModel;
				view = subMenuItem.refUrl; //view name
				
				if(!view)
					return false;
					
				index = subMenuItem.videoIndex;
				measurementsModel = $scope.$parent.measurementsModel;
				uploads = $scope.$parent.noOfUploads[index];
			}
			 
			measurementsModel.vmIndex = index;
			
			// instantiate measurementService
			var measurementsService = new MeasurementsService(measurementsModel,11);
			
			// fetch data and publish on scope
			measurementsService.updateMeasurementsInfo(commonDataServiceInit.userId,commonDataServiceInit.authToken,measurementsModel).then(function(response) {
				
				var responseData = response.data;
				
					if(responseData.isSuccess){ //on success true
						
						var isSelfRecording = measurementsModel.isSelfRecording
	
						measurementsModel.currentUploadIndex = index;
						measurementsModel.labelId = uploads.labelId;
						$scope.$parent.isHeadBand = uploads.isHeadBand;
						$scope.$parent.isCurrentVideoUploaded = uploads.isCompleted;
						$scope.$parent.uploadedVideoName = uploads.fileName;
						
						if(isSelfRecording == 1)
							$location.path('/vmassistuploadinstruc');
						else
							$location.path('/vmselfuploadinstruc');
								
					}else if(!responseData.isSuccess){  //on success false
						$scope.validationMsgCode = responseData.validationMsgCode;
						$scope.serviceMessage = responseData.serviceMessage;
					}else{//to do error handling
						$scope.onError = !(responseData.IsSuccess);
						$scope.serviceMessage = responseData.serviceMessage;
					}
						
			}).catch(function(error) {
                // This is set in the event of an error.
				errorHandling(error);
					
            });
	};
	
	
	 /**
	  * @function getIndexOf
	  * @memberOf angular_module.ofkapp
	  * @params arr (array of records), comparableValue (value to be compared),prop (property to find out) 
	  * @description  Used to find out the location in json by seraching with value and key
	  */
	var getIndexOf =  function (arr, comparableValue, prop) {
		var l = arr.length,
		k = 0;
		for (k = 0; k < l; k = k + 1) {
			var indexValue = String(arr[k][prop].trim());
			var searcValue = String(comparableValue.trim());
			if (indexValue == searcValue) {
				return k;
			}
		}
		return -1;
	};//end
	
	/**
	  * @function isDateOfBirthValid
	  * @memberOf angular_module.ofkapp
	  * @params val to be checked
	  * @description get no of years using moment library & check the validity of DOB
	  */
	var  isDateOfBirthValid = function(dob){
	
		var years = moment().diff(dob, 'years'); 
		
		if(years > 100 || years <= 5) { //above age 100  & below age 5
			return 3;
		}else if(years < 100 && years > 18) { //between age 18 & 100
			return  2;
		}else if(years < 18 && years > 5) {//between age 5 & 18
			return  1;
		}
		
		return  -1;
	};
	
	/**
	  * @function nextPathOfManual
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view mentioned as per the angular route
	  */
	var nextPathOfManual = function(frontHairLineOption){
		
		if(!frontHairLineOption) return;//if front Line option is not selected
		if(frontHairLineOption == -1) return;//if front Line option is not selected
		
		/*if(frontHairLineOption == 1)
			return 'manualmeasuremarkfhl';
		else if(frontHairLineOption == 2) */
			return 'manualmeasuresupplies';
	};
	
	/**
	  * @function nextPathOfManualSize
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view mentioned as per the angular route
	  */
	var nextPathOfManualSize = function(hairLossThumbId){
		
		
		if(!hairLossThumbId) return;//if pattern is not selected
		if(hairLossThumbId == -1) return;//if pattern is not selected
		
		if(hairLossThumbId == 3 || hairLossThumbId == 8)//if fullcap
			return 'manualmeasuresizefc';
		else if(hairLossThumbId == 5 || hairLossThumbId == 12)//if Oval
			return 'manualmeasuresizeov';
		else if(hairLossThumbId == 1 || hairLossThumbId == 7 || hairLossThumbId == 6 || hairLossThumbId == 11)//if Peanut
			return 'manualmeasuresizepa';
	};
	
	/**
	  * @function nextPathOfFrontalGuideMeasure
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  return the view as per type of head
	  */
	var nextPathOfFrontalGuideMeasure = function(historyModel){
		
		if(!historyModel) return; //if model is undefined
		
		var typeOfHead = historyModel.typeOfHead;
		
		if(!typeOfHead) return;//if front Line option is not selected
		
		if(historyModel.isFrontalNeedsToBeMarked){
			if(typeOfHead == 3)
				return 'frontalguidemeasure';
			else 
				return 'frontalguidemeasureth';
		}else{
			if($scope.$parent.isAgeNotValid || !historyModel.isMeasurementRequired) // under age and odd shapes
				return 'templatesupplies';
		}
	};
	
	/**
	  * @function requiredVideosCount
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  get required videos count
	  */
	var requiredVideosCount = function(accountModel,historyModel){
		if(accountModel.isHairSystemExists == 2)
			return 3;
		else if(accountModel.isHairSystemExists == 1  || accountModel.isHairSystemExists == 3)
			return 2;
		else if(historyModel.hairLossFullId == 26 || historyModel.hairLossFullId == 27)
			return 1;
	}
	
	
	
	/**
	  * @function enableMenuOnReload
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  calculate the width based on no of functions done by the user 
	  */
	var enableMenuOnReload  = function(menutItems){
		
		for(var i = 0; i < menutItems.length ; i++ ){
			var isMenuItemCompleted = menutItems[i].isCompleted;
			if(isMenuItemCompleted != 1)
				menutItems[i].isCompleted = 1;
		}
	}
	
	
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