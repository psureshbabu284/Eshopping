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
    quantity : true,
    price : true,
	prodCatId : true,
    vendorId : true
};

var mandatoryToRead = {
    userId : true
}

/**
 * @method ProductTransactor
 * @description: is a class that can handle all the http verb operations under
 * this route
 */
function ProductTransactor() {}

/**
 * @class ProductTransactor
 * @method CREATE
 * @description: it can handle http verb POST operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
ProductTransactor.prototype.CREATE = function ProductTransactorCreate(
        req, res, next) {
		
    var productModel = req.body;
	var dbResponse = {};
    var objUser = new Dal.Users();
	var accountId = req.query.userId;
    
	var	input = {
		quantity : productModel.productQuantiry,
        price : productModel.price,
        prodCatId : productModel.prodCatId,
        vendorId : accountId
		
	};
	
        async.waterfall([
            //Customer is not exists create customer in Gather
            function(callback){
                logger.info('input ProductTransactor READ- ' + JSON.stringify(input));
				//get db instance
				
				//execute procedure
				objUser.ExecuteProcedure(sps.productInsert, mandatoryToCreate,
                        [ input ], function(err, response) {
						logger.info('DB err'+ err);
					//if error is thrown
					if (err) { 
						logger.info('In IF');
						return throwError.InternalError(req, res, next);
                    }
					//get record
					dbResponse = response.Record; 
					logger.info('Record - ' + JSON.stringify(dbResponse));
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
 * @class ProductTransactor
 * @method UPDATE
 * @description: it can handle http verb PUT operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
ProductTransactor.prototype.UPDATE = function ProductTransactorUpdate(
        req, res, next) {
	//input body to be sent to db
    var user = req.body.inputBody;
	
	var sfInput = req.body.sfInput;
	logger.info('user - ' +JSON.stringify(user));

	//req.headers.userid = req.headers.userid ;
	user.userId = req.headers.userid;
	
	logger.info('req.headers.userId - ' +req.headers.userid);
	
	var recordId; 
    var objUser = new Dal.Users();
	
    async.waterfall([
           
            function(callback) { 
				var dbConnection = objUser.getInstance;
				
				 objUser.ExecuteProcedure(sps.UpdateUser, mandatoryToUpdate,
                        [ user ], function(err, dbResponse) {
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
				logger.info('sfInput ProductTransactor------- ' + JSON.stringify(sfInput));
				logger.info('sfInput ProductTransactor------- ' +  Object.keys(sfInput).length);
				
					return res.end(JSON.stringify(responseObj));
				
				
			});
};

/**
 * @class ProductTransactor
 * @method READ
 * @description: it can handle http verb GET operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
ProductTransactor.prototype.READ = function ProductTransactorRead(req,
        res, next) {
    var objUser = new Dal.Users();
    var input = {
        userId : req.query.userId
    };
	logger.info(' ProductTransactor userId------- ' + JSON.stringify(input));
	//Executing procedure 
    objUser.ExecuteProcedure(sps.productsDetails, mandatoryToRead, input,
            function(err, responseObj) {
        var responseData = {};
        logger.info(' ProductTransactor------- ' + JSON.stringify(err));
                logger.info(' ProductTransactor Response Object------- ' +   JSON.stringify(responseObj));
        responseData.productCategories = responseObj.Tables[0];
        responseData.isSuccess = 1;
        responseData.products = responseObj.Records;

        return res.end(JSON.stringify(responseData));
    });
};

module.exports = ProductTransactor;