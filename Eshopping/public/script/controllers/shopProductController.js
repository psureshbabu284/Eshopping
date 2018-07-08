(function () {

    'use strict';

ofkapp.controller("shopProductController", ["$scope", "$location","localStorage","GettingStartedService","shopProductService", "CommonDataService",
	function($scope,$location,localStorage,GettingStartedService,shopProductService,CommonDataService) {
	
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
	
	$scope.deleteCart = function(productobject){
		console.log("Product Delete Model", JSON.stringify(productobject));
		shopProductService.deleteCart(commonDataServiceInit.userId,commonDataServiceInit.authToken, productobject).then(function(response) {
			console.log(response.data)
		})
    }
    
    $scope.addToCart = function(cartItem){
		var quantityList = [];
		$scope.CartModel = cartItem;
        for(var i=1 ; i <= cartItem.quantity; i++)
                quantityList.push(i);
        $scope.quantityList = quantityList;
		$scope.enablediv = true;
	}

	$scope.updateCart = function(productobject){
		console.log("Product Delete Model", JSON.stringify(productobject));
		var requestObject = productobject;
		requestObject.isActive = 1;
		
		productService.updateCart(commonDataServiceInit.userId,commonDataServiceInit.authToken, requestObject).then(function(response) {
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

	$scope.placeOrder = function(item){
		$location.path('order');
	}

	$scope.onQuantityChange = function(quantity){
		var cartModel = $scope.CartModel;

		$scope.totalPrice = cartModel.selectedQuantity * quantity.price;
		console.log('Quantity Change', $scope.CartModel)
        
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