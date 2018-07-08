(function () {

    'use strict';
/**
 * @author gopal.atla@appshark.com>
 * @copyright 2016 Appshark Ltd. All rights reserved.
 */
ofkapp.controller("shopProductController", ["$scope", "$http","$location","$timeout","localStorage","GettingStartedService","ProductService", "CommonDataService","ageValidationMessages", "userRoleValidationMessages","menuConstants","createAccountValidationMessages",
	function($scope,$http,$location,$timeout,localStorage,GettingStartedService,ProductService,CommonDataService,ageValidationMessages,userRoleValidationMessages,menuConstants,createAccountValidationMessages) {
	
	//common angular service to fetch common data like userId,session and so on
	var commonDataServiceInit = new CommonDataService();
	var productService = new ProductService();
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
		 var userId = localStorage.getData("userId");
		 if(!userId) return;
		 productService.getProduceDetails(userId).then(function(response) {
			$scope.productobjectmodel = response.data;
			console.log($scope.productobjectmodel)
		})

		
	};
	
	
	$scope.saveProduct = function(productobjectmodel){
		console.log("Product Object Model", JSON.stringify(productobjectmodel));
		productService.saveProduct(commonDataServiceInit.userId,commonDataServiceInit.authToken, productobjectmodel).then(function(response) {
			console.log(response.data)
		});
	}
	
	$scope.deleteProduct = function(productobject){
		console.log("Product Delete Model", JSON.stringify(productobject));
		productService.deleteProduct(commonDataServiceInit.userId,commonDataServiceInit.authToken, productobject).then(function(response) {
			console.log(response.data)
		})
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