ofkapp.service('ProductService', ['$q', '$http',  function($q, $http){

   //common service url endpoint
   var apiUrl = BuildURL.getServiceURL();
   var requestObj = {};
   
    //list of service url's
    var ServiceURLs = {
		getProductsURL : apiUrl + "/user/products"
	};
   
    
	// instantiate our initial ProductService object
    var Product = function(ProductModel) {
	
		if(!(angular.isUndefined(ProductModel) || ProductModel === null)){
		
			requestObj = {}; //to clear previous input object
			
			if(!(angular.isUndefined(ProductModel.firstName) || ProductModel.ProductId === null))
					requestObj.ProductId = ProductModel.ProductId;
				
			

			
	 	}//end of main if
		return false;
    };
	
	
	

    // define the getProfile method which will fetch data
    Product.prototype.getProduceDetails = function(ProductId, authToken) {

		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		
        $http({
		  method: 'GET',
          url: ServiceURLs.getProductsURL,
					params: {'ProductId':ProductId},
					headers: {
						'authtoken': authToken,
						'ProductId':ProductId
						},
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
	

	
	// register the Product
    Product.prototype.saveProduct = function(ProductId,authToken, productObjectModel) {
			
		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		console.log("productObjectModels - "+JSON.stringify(productObjectModel));
        $http({
		  method: 'POST',
		  data: JSON.stringify(productObjectModel),
		  headers: {
			'authtoken': authToken,
			'ProductId':ProductId
		  },
		  url: ServiceURLs.getProductsURL, 
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
	
	// update the Product
    Product.prototype.updateProduct  = function(ProductId,authToken, productModel) {
		// We make use of Angular's $q library to create the deferred instance
        var deferred = $q.defer();
		console.log("requestObj - "+JSON.stringify(productModel));
        $http({
		  method: 'PUT',
		  data: JSON.stringify(productModel),
		  headers: {
			'authtoken': authToken,
			'ProductId':ProductId
		  },
		  url: ServiceURLs.getProductsURL, 
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

	

    return Product;
}]);
