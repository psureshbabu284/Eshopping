(function () {

    'use strict';
/**
 * @author gopal.atla@appshark.com>
 * @copyright 2016 Appshark Ltd. All rights reserved.
 */
ofkapp.controller("productController", ["$scope", "$http","$location","$timeout","localStorage","GettingStartedService","ProductService", "CommonDataService","ageValidationMessages", "userRoleValidationMessages","menuConstants","createAccountValidationMessages",
	function($scope,$http,$location,$timeout,localStorage,GettingStartedService,ProductService,CommonDataService,ageValidationMessages,userRoleValidationMessages,menuConstants,createAccountValidationMessages) {
	//NavigationMenu.init();
	$scope.ageValidationMessages = ageValidationMessages;
	$scope.userRoleValidationMessages = userRoleValidationMessages;
	
	$scope.createAccountValidationMessages = createAccountValidationMessages;
	
	$scope.$parent.isGettingStartedDone = false;
	$scope.$parent.listOfMenuItems = menuConstants;
	
	//common angular service to fetch common data like userId,session and so on
	var commonDataServiceInit = new CommonDataService();
	var productService = new ProductService();
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
						
						$scope.$parent.ofkModel.country = $scope.$parent.ofkModel.oldCountry;
						$scope.$parent.shippingCountryIndexLoc = getIndexOf($scope.listOfCountries,$scope.$parent.ofkModel.country,"Name");
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
			
		}
		$scope.$parent.isReqFromHeader = "";
		if(isReqFromHeader){
			$scope.$parent.isReqFromHeader = isReqFromHeader;
			$location.path('/gettingstarted');
		}

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
				localStorage.clearStorage();                    
                    window.location.href = staticURL+ "views/gettingstarted.html#/gettingstarted";	
                }else{ //todo handle logout failure
                }
                
                
        }).catch(function(error) {
            // This is set in the event of an error.
            errorHandling(error);
        });
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
		 productService.getProduceDetails(userId).then(function(response) {
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
	  * @function userUpdate
	  * @memberOf angular_module.ofkapp
	  * @params ofkModel (model to be saved into salesforce)
	  * @description  updating profile 
	  */
	$scope.userUpdate = function(ofkModel,type, isAgeNotValid,isDateValid){
	
			//for updating age
			if(type == 2){
				
				$scope.$parent.disableDOBContinue = true;
				$scope.$parent.disableGenderConButton = false;
				$scope.$parent.disableLocContButton = false;

				if(ofkModel.dob){
					isAgeNotValid = isDateOfBirthValid(ofkModel.dob);
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
					ofkModel.dob = ofkModel.YYYY + '-' + ofkModel.MM + '-' + ofkModel.DD; 
					
					//check for the update
					var checkFlag = updateCheck(ofkModel,type, isAgeNotValid); 
					if(!checkFlag) return;
					
				}else{
					return false;
				}
	
			}
			if(type == 3){
				$scope.$parent.disableDOBContinue = false;
				$scope.$parent.disableGenderConButton = true;
				$scope.$parent.disableLocContButton = false;
				var checkFlag = updateCheck(ofkModel,type, isAgeNotValid);  //check for the update
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
				$scope.onShippingCountrySelect($scope.$parent.ofkModel.country);
				if(!$scope.$parent.isShippingAvailable && $scope.$parent.shippingCountryIndexLoc != -1){
					if($scope.$parent.ofkModel.oldCountry){
						$scope.$parent.ofkModel.country = $scope.$parent.ofkModel.oldCountry;
						//$scope.onShippingCountrySelect($scope.$parent.ofkModel.country);
					}
					$location.path('/locationunavail');
					return false;
				}
				
				var checkFlag = updateCheck(ofkModel,type, isAgeNotValid); 
					if(!checkFlag){
						$scope.$parent.disableLocContButton = false;
						return;
					} 
			}
			
			// instantiate Getting Started Service
			var userService = new GettingStartedService(ofkModel,type);//user service
		
			
			//update data to server
			userService.updateProfile(commonDataServiceInit.userId,commonDataServiceInit.authToken).then(function(response) {
					
					var responseData = response.data;
					$scope.$parent.isAtStep = responseData.isAtStep;
					$scope.$parent.disableDOBContinue = false;
					$scope.$parent.disableGenderConButton = false;
					$scope.$parent.disableLocContButton = false;
					if(responseData.isSuccess){
						var nextView = nextPath(ofkModel,type,isAgeNotValid);
						
						if(type == 2)
							ofkModel.oldDOB = responseData.oldDOB;
						else if(type == 3)
							ofkModel.oldGender = responseData.oldGender;
						else if(type == 4)
							ofkModel.oldCountry = responseData.oldCountry;
							
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
	  * @params ofkModel (model to be saved into salesforce)
	  * @description  updating profile 
	  */
	$scope.userUpdateOtherSource = function(ofkModel,type, isAgeValid){
	
			// instantiate Getting Started Service
			var userService = new GettingStartedService(ofkModel,6);//user service
			
			//update data to server
			userService.updateProfile(commonDataServiceInit.userId,commonDataServiceInit.authToken).then(function(response) {
					
					var responseData = response.data;
					
					if(responseData.isSuccess){
					
						if(type == 6){
							if(ofkModel.userType){
										
								if(ofkModel.representerType == 5){ //if selected spouse
									$scope.$parent.userAccountType = "spouse";
								}else if(ofkModel.representerType == 6){ //if selected parent
									$scope.$parent.userAccountType = "child";
								}else if(ofkModel.representerType == 7){ //if selected friend or loved one
									$scope.$parent.userAccountType = "friend or loved one";
								}else if(ofkModel.representerType == 8){ //if selected Hair Stylist
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
							if(ofkModel.isAccountYours)
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
	
	var nextPath = function(ofkModel,type,isAgeNotValid){
		if(type == 2){
			if(ofkModel.userType == 0 && isAgeNotValid == 1){
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
	  * @params ofkModel (model to be saved into salesforce)
	  * @description  creating contact for representative
	  */
	$scope.contactRegistration = function(ofkModel,type){
		
			var isFormValid = $scope.repContactForm.$valid;
			
			if(!isFormValid) {//please exit if form is not valid
				$scope.$parent.onRepContactFormSubmit = true; 
				return false;
			}
			

			
			// instantiate Getting Started Service
			var userService = new GettingStartedService(ofkModel,type);
			
			// fetch data and publish on scope
			userService.createRepresentativeContact(commonDataServiceInit.userId,commonDataServiceInit.authToken).then(function(response) {
					var responseData = response.data;
					
					if(responseData.isSuccess){
							$scope.$parent.ofkModel.representativeId = responseData.representativeId;
							$scope.$parent.ofkModel.representativeSFID =  responseData.representativeSFID;
							//calculate progress bar
							
							if(ofkModel.userType == 1)
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
	  * @params ofkModel (model to be saved into salesforce)
	  * @description  updating contact info of representative
	  */
	$scope.contactUpdate = function(ofkModel,type){
		
			var isFormValid = $scope.repContactForm.$valid;
			
			if(!isFormValid) {//please exit if form is not valid
				$scope.isGettingStartedFromValid = isFormValid; 
				return false;
			}
			
			// instantiate Getting Started Service
			var userService = new GettingStartedService(ofkModel,type);
			
			// fetch data and publish on scope
			userService.updateRepresentativeContact(commonDataServiceInit.userId,commonDataServiceInit.authToken).then(function(response) {
					var responseData = response.data;
					
					if(responseData.isSuccess){
							//calculate progress bar
							//initializeMenu(ofkModel);
							

							if(ofkModel.userType == 1)
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
	  * @function goToUserAccountTypeView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view based on type of user select
	  */
	$scope.goToUserAccountTypeView = function(ofkModel){
	
		//$scope.userUpdateOtherSource(ofkModel,6,false);
		
		//if undefined
		if(!ofkModel) 
			return false;
		
		
		//if self
		if(!ofkModel.userType){
			
			if(ofkModel.isHairSystemExists == 0){//if nothing selected
				$scope.onError = true;
				return false;
			}

			// check if authenticated from hd
			if(ofkModel.isFromOtherSource  == 0)
				$location.path('/createaccounthd');
			else if(ofkModel.isFromOtherSource  == 1)
				$scope.userUpdateOtherSource(ofkModel,6,false);
				
			
		}else if(ofkModel.userType == -1){ //if not selected any option
			$scope.onError = true;
			return false;
		}else{ //if selected representer
			
			if(ofkModel.representerType == -1){ //if nothing selected
				$scope.onError = true;
				return false;
			}
			
			if(ofkModel.isFromOtherSource  == 1)
				$scope.userUpdateOtherSource(ofkModel,6,false);
				
			
		}
		
		return;
	};
	
	/**
	  * @function goToCreateAccountView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view based on type of user
	  */
	$scope.goToCreateAccountView = function(ofkModel){
	
		if(!ofkModel)
			return false;
		if(!ofkModel.isHairSystemExistsForRepresentative){
			$scope.onError = true;
			return false;
		};
		
		if(ofkModel.isHairSystemExistsForRepresentative == 0){ // if nothing is selected
			$scope.onError = true;
			return false;
		}
		
		// if stylist option is selected
		if((ofkModel.isAccountYours && ofkModel.isAccountYours != -1) || ofkModel.representerType == 8){ 
			$scope.userUpdateOtherSource(ofkModel,8,false);
			
		}else{
			// check if authenticated from hd
			if(ofkModel.isFromOtherSource  == 1)
				$scope.userUpdateOtherSource(ofkModel,9,false);
		}
		
	};
	
	
	/**
	  * @function goToNextView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view based on type of user
	  */
	$scope.goToNextView = function(ofkModel){
	
		if(!ofkModel)return false;
			
		if(ofkModel.isAccountYours == -1){
			$scope.onError = true;
			return false;
		};
		
		if(!ofkModel.isAccountYours && 
			ofkModel.isHairSystemExistsForRepresentative == 0){ // if nothing is selected
			$scope.onError = true;
			return false;
		}
			
		if(ofkModel.isAccountYours){ // if account belongs to stylist
			$location.path('/userroleaccttypenewhd');
		}else{
			$scope.userUpdateOtherSource(ofkModel,7,false);
		}
	};
	
	/**
	  * @function redirectToContactView
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description  redirect to the view based on type of user
	  */
	$scope.redirectToContactView = function(ofkModel){
		if(!ofkModel)
			return false;
			
			if(!ofkModel.userType){
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
	var nextOrPreviousView = function(ofkModel){
		//age
		if(ofkModel.DD && ofkModel.DD != "" && ofkModel.DD != null){
			ofkModel.dobExist = true;
			
		}else{
			ofkModel.dobExist = false;	
		}
		
		//gender
		if(ofkModel.gender && ofkModel.gender != -1){
			ofkModel.genderExist = true;
			
		}else{
			ofkModel.genderExist = false;	
		}
		
		//location
		if(ofkModel.country && ofkModel.country != -1 && ofkModel.country != null){
			ofkModel.locationExist = true;
			
		}else{
			ofkModel.locationExist = false;	
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
	$scope.redirectToStylistView = function(ofkModel){
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