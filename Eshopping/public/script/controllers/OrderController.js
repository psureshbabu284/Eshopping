(function () {

    'use strict';

ofkapp.controller("orderController", ["$scope", "$http","$location","$timeout","localStorage","GettingStartedService","OrderService", "CommonDataService",
	function($scope,$http,$location,$timeout,localStorage,GettingStartedService,OrderService,CommonDataService) {
	
	//common angular service to fetch common data like userId,session and so on
	var commonDataServiceInit = new CommonDataService();
	var OrderService = new OrderService();
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
		 OrderService.getOrderDetails(commonDataServiceInit.userId,commonDataServiceInit.authToken).then(function(response) {
			$scope.OrderModel = response.data;
			console.log($scope.OrderModel)
		})

		
	};
	
	
	$scope.placeOrder = function(OrderModel){
		console.log("Product Object Model", JSON.stringify(OrderModel));
		OrderService.placeOrder(commonDataServiceInit.userId,commonDataServiceInit.authToken, OrderModel).then(function(response) {
			var serviceResponse = response.data;
			$scope.CartModel = serviceResponse;
			if(serviceResponse.IsSuccess){
				$scope.serviceSuccess = true;
				$scope.serviceMessage = serviceResponse.serviceMessage;
			}else{
					$scope.onError = !(serviceResponse.IsSuccess);
					$scope.serviceMessage = serviceResponse.serviceMessage;
			}
			
		}).catch(function(error) {
			// This is set in the event of an error.
			errorHandling(error);
		});;
	}
	
	$scope.removeOrder = function(productobject){
		console.log("Product Delete Model", JSON.stringify(productobject));
		OrderService.deleteOrder(commonDataServiceInit.userId,commonDataServiceInit.authToken, productobject).then(function(response) {
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
		});
    }
    
    

	$scope.updateOrder = function(productobject, OrderConfirmed){
		console.log("Product Delete Model", JSON.stringify(productobject));
        var requestObject = productobject;
        if(OrderConfirmed ==1)
            requestObject.orderRemoved = 1;
        else
		    requestObject.OrderConfirmed = OrderConfirmed;
		
		OrderService.updateOrder(commonDataServiceInit.userId,commonDataServiceInit.authToken, requestObject).then(function(response) {
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