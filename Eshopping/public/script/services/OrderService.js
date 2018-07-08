ofkapp.service('OrderService', ['$q', '$http',  function($q, $http){

    //common service url endpoint
    var apiUrl = BuildURL.getServiceURL();
    var requestObj = {};
    
     //list of service url's
     var ServiceURLs = {
         getOrdersURL : apiUrl + "/user/order"
     };
    
     
     // instantiate our initial OrderService object
     var OrderService = function(ProductModel) {
     
         if(!(angular.isUndefined(ProductModel) || ProductModel === null)){
         
             requestObj = {}; //to clear previous input object
             
             if(!(angular.isUndefined(ProductModel.firstName) || ProductModel.ProductId === null))
                     requestObj.ProductId = ProductModel.ProductId;
                 
             
 
             
          }//end of main if
         return false;
     };
     
     
     
 
     // define the getProfile method which will fetch data
     OrderService.prototype.getOrderDetails = function(cartId,authToken) {
 
         // We make use of Angular's $q library to create the deferred instance
         var deferred = $q.defer();
         
         $http({
           method: 'GET',
           url: ServiceURLs.getOrdersURL,
           headers: {
            'authtoken': authToken,
            'cartId':cartId
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
     OrderService.prototype.placeOrder = function(cartId,authToken, OrderModel) {
 
         // We make use of Angular's $q library to create the deferred instance
         var deferred = $q.defer();
         console.log("ordermodels - "+JSON.stringify(OrderModel));
         $http({
           method: 'POST',
           data: JSON.stringify(OrderModel),
           headers: {
             'authtoken': authToken,
             'cartId':cartId
           },
           url: ServiceURLs.getOrdersURL, 
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
     OrderService.prototype.deleteOrder  = function(orderId,authToken, OrderModel) {
 
         // We make use of Angular's $q library to create the deferred instance
         var deferred = $q.defer();
         console.log("requestObj - "+JSON.stringify(OrderModel));
         $http({
           method: 'DELETE',
           data: JSON.stringify(OrderModel),
           headers: {
             'authtoken': authToken,
             'orderId':orderId
           },
           url: ServiceURLs.getOrdersURL, 
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
     OrderService.prototype.updateOrder  = function(cartId,authToken, OrderModel) {
      // We make use of Angular's $q library to create the deferred instance
          var deferred = $q.defer();
      console.log("requestObj - "+JSON.stringify(OrderModel));
          $http({
        method: 'PUT',
        data: JSON.stringify(OrderModel),
        headers: {
        'authtoken': authToken,
        'cartId':cartId
        },
        url: ServiceURLs.getOrdersURL, 
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
 
     return OrderService;
 }]);
 