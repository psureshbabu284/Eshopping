ofkapp.service('shopProductService', ['$q', '$http',  function($q, $http){

    //common service url endpoint
    var apiUrl = BuildURL.getServiceURL();
    var requestObj = {};
    
     //list of service url's
     var ServiceURLs = {
         getShopProductsURL : apiUrl + "/user/shopproducts"
     };
    
     
     // instantiate our initial shopProductService object
     var shopProductService = function(ProductModel) {
     
         if(!(angular.isUndefined(ProductModel) || ProductModel === null)){
         
             requestObj = {}; //to clear previous input object
             
             if(!(angular.isUndefined(ProductModel.firstName) || ProductModel.ProductId === null))
                     requestObj.ProductId = ProductModel.ProductId;
                 
             
 
             
          }//end of main if
         return false;
     };
     
     
     
 
     // define the getProfile method which will fetch data
     shopProductService.prototype.getCartDetails = function(customerId, authToken) {
 
         // We make use of Angular's $q library to create the deferred instance
         var deferred = $q.defer();
         
         $http({
           method: 'GET',
           url: ServiceURLs.getShopProductsURL,
           headers: {
            'authtoken': authToken,
            'customerId':customerId
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
     shopProductService.prototype.saveCart = function(customerId,authToken, cartModel) {
 
         // We make use of Angular's $q library to create the deferred instance
         var deferred = $q.defer();
         console.log("cartobjectmodels - "+JSON.stringify(cartModel));
         $http({
           method: 'POST',
           data: JSON.stringify(cartModel),
           headers: {
             'authtoken': authToken,
             'customerId':customerId
           },
           url: ServiceURLs.getShopProductsURL, 
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
     shopProductService.prototype.deleteCart  = function(customerId,authToken, cartModel) {
 
         // We make use of Angular's $q library to create the deferred instance
         var deferred = $q.defer();
         console.log("requestObj - "+JSON.stringify(cartModel));
         $http({
           method: 'PUT',
           data: JSON.stringify(cartModel),
           headers: {
             'authtoken': authToken,
             'customerId':customerId
           },
           url: ServiceURLs.getShopProductsURL, 
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
 
     // update the Product
     shopProductService.prototype.updateCart  = function(customerId,authToken, cartModel) {
      // We make use of Angular's $q library to create the deferred instance
          var deferred = $q.defer();
      console.log("requestObj - "+JSON.stringify(cartModel));
          $http({
        method: 'PUT',
        data: JSON.stringify(cartModel),
        headers: {
        'authtoken': authToken,
        'customerId':customerId
        },
        url: ServiceURLs.getShopProductsURL, 
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
 
     return shopProductService;
 }]);
 