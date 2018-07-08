'use strict';

var async = require('async');
var corelibs = require('../corelibs');
var Dal = require('../dal');
var throwError = require('../controller/throwErrors').ThrowError();
var config = require('../config');
var logger = corelibs.logger;
var errorCodes = config.ErrorCodes;
var constants = config.Constants;
var sps = config.dbConfig.SP;


var mandatoryToCreate = {
    transId : true,
    cartId : true
};

var mandatoryToRead = {
    userId : true
}

var mandatoryToDelete = {
    Id : true
}

var mandatoryToUpdate = {
    Id : true,
    OrderConfirmed : true
}

/**
 * @method OrderTransactor
 * @description: is a class that can handle all the http verb operations under
 * this route
 */
function OrderTransactor() {}

/**
 * @class OrderTransactor
 * @method CREATE
 * @description: it can handle http verb POST operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
OrderTransactor.prototype.CREATE = function OrderTransactorCreate(
        req, res, next) {
	
	var dbResponse = {};
    var objUser = new Dal.Users();
	
	var	input = {};
    input.cartId= req.body.cartId
	
        async.waterfall([
            function(callback){
                input.transId = '22222';
                callback();
            },
            //Customer is not exists create customer in Gather
            function(callback){
                logger.info('input OrderTransactor Create- ' + JSON.stringify(input));
                logger.info('input req.req.body READ- ' + JSON.stringify(req.body));
				//get db instance
				//execute procedure
				objUser.ExecuteProcedure(sps.orderInsert, mandatoryToCreate,
                        [ input ], function(err, response) {
						logger.info('DB err '+ err);
					//if error is thrown
					if (err) { 
						logger.info('In IF');
						return throwError.InternalError(req, res, next);
                    }
					//get record
					dbResponse = response.Record; 
					logger.info('Record OrderTransactor Read- ' + JSON.stringify(dbResponse));
					callback(null, dbResponse);
					
                });
            },
        ],function(err, info, response) {
            //Calling HD service to insert user details
            if(!err){
                
                
            } //end of if loop
            //Calling HD service to insert user details
            return res.end(JSON.stringify(dbResponse));
       });
	
};



/**
 * @class OrderTransactor
 * @method UPDATE
 * @description: it can handle http verb PUT operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
OrderTransactor.prototype.UPDATE = function OrderTransactorUpdate(
        req, res, next) {
	//input body to be sent to db
    var user = req.body.inputBody;
	logger.info('user - ' +JSON.stringify(user));

	
    var input = {
        Id : req.body.prodid,
        OrderConfirmed : req.body.OrderConfirmed
    }
	logger.info('req.headers.userId - ' +JSON.stringify(input));
    
    logger.info('req.req.body.userId - ' +JSON.stringify(req.body));
    var objUser = new Dal.Users();
	
    async.waterfall([
           
            function(callback) { 
				
				 objUser.ExecuteProcedure(sps.orderDelete, mandatoryToUpdate,
                        [ input ], function(err, dbResponse) {
						logger.info('err - ' + JSON.stringify(err));
						logger.info('dbResponse - ' + JSON.stringify(dbResponse));
                    if (err) {
                        return callback(err, dbResponse, {
                            Message: err.message,
                            ErrorCode: errorCodes.InternalError
                        });
                    }
					
                    if (!dbResponse.isSuccess) {
                        return res.end(JSON.stringify(dbResponse.Record));
                    }
					
                    if (dbResponse.isSuccess) 
						return callback(err, null, dbResponse.Record);
					
                });//
				
				
            }], function(err, info, responseObj) {
				return res.end(JSON.stringify(responseObj));
				
				
			});
};

/**
 * @class OrderTransactor
 * @method READ
 * @description: it can handle http verb GET operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
OrderTransactor.prototype.READ = function OrderTransactorRead(req,
        res, next) {
    var objUser = new Dal.Users();
    var input = {
        userId : req.headers.cartid
    };
    logger.info(' OrderTransactor READ ----####------- ' + JSON.stringify(input));
    logger.info(' OrderTransactor READ ----req.headers####------- ' + JSON.stringify(req.headers));
	//Executing procedure 
    objUser.ExecuteProcedure(sps.orderDetails, mandatoryToRead, [input],
            function(err, responseObj) {
        var responseData = {};
        logger.info(' OrderTransactor------- ' + JSON.stringify(err));
                logger.info(' OrderTransactor Response Object------- ' +   JSON.stringify(responseObj));
        responseData.productCategories = responseObj.Tables[0];
        responseData.isSuccess = 1;
        
        return res.end(JSON.stringify(responseData));
    });
};

OrderTransactor.prototype.DELETE = function OrderTransactorRead(req,
    res, next) {
    var objUser = new Dal.Users();
    var input = {
        id : req.body.orderid
    };
    logger.info(' OrderTransactor Delete------- ' + JSON.stringify(req.body));
    //Executing procedure 
    objUser.ExecuteProcedure(sps.orderDelete, mandatoryToDelete, [input],
            function(err, responseObj) {
        var responseData = {};
        logger.info(' OrderTransactor------- ' + JSON.stringify(err));
        logger.info(' OrderTransactor Response Object------- ' +   JSON.stringify(responseObj));
        return res.end(JSON.stringify(responseData));
    });
};

module.exports = OrderTransactor;