(function () {

    'use strict';
/**
 * @author gopal.atla@appshark.com>
 * @copyright 2016 Appshark Ltd. All rights reserved.
 */
ofkapp.controller("shopProductController", ["$scope", "$http","$location","$timeout","localStorage","GettingStartedService","shopProductService", "CommonDataService","ageValidationMessages", "userRoleValidationMessages","menuConstants","createAccountValidationMessages",
	function($scope,$http,$location,$timeout,localStorage,GettingStartedService,shopProductService,CommonDataService,ageValidationMessages,userRoleValidationMessages,menuConstants,createAccountValidationMessages) {
	
	//common angular service to fetch common data like userId,session and so on
	var commonDataServiceInit = new CommonDataService();
	var shopProductService = new shopProductService();
	var staticURL;
	
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
	  * @function initialize
	  * @memberOf angular_module.ofkapp
	  * @params 
	  * @description Initialize user model
	  */
	$scope.initialize = function(){
		 shopProductService.getCartDetails(commonDataServiceInit.userId).then(function(response) {
			$scope.cartobjectmodel = response.data;
			console.log($scope.cartobjectmodel)
		})

		
	};
	
	
	$scope.saveCart = function(cartobjectmodel){
		console.log("Product Object Model", JSON.stringify(cartobjectmodel));
		shopProductService.saveCart(commonDataServiceInit.userId,commonDataServiceInit.authToken, cartobjectmodel).then(function(response) {
			console.log(response.data)
		});
	}
	
	$scope.deleteCart = function(productobject){
		console.log("Product Delete Model", JSON.stringify(productobject));
		shopProductService.deleteCart(commonDataServiceInit.userId,commonDataServiceInit.authToken, productobject).then(function(response) {
			console.log(response.data)
		})
    }
    
    $scope.addToCart = function(cartItem){
        var quantityList = [];
        for(var i=1 ; i <= cartItem.quantity; i++)
                quantityList.push(i);
        $scope.quantityList = quantityList;
		$scope.enablediv = true;
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