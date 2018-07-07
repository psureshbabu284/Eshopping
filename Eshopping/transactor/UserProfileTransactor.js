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
    firstName : true,
    lastName : true,
    email : true,
    Dob : true,
    Gender : true,
    passwordhash : true,
    IsCustomer : true,
};

/**
 * @method UserProfileTransactor
 * @description: is a class that can handle all the http verb operations under
 * this route
 */
function UserProfileTransactor() {}

/**
 * @class UserProfileTransactor
 * @method CREATE
 * @description: it can handle http verb POST operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
UserProfileTransactor.prototype.CREATE = function UserProfileTransactorCreate(
        req, res, next) {
		
    var user = req.body.inputBody;
	var dbResponse = {};
    var objUser = new Dal.Users();
	var ua = req.body.userAgent, device = ua.device.family, objUser;
	
	
	var	input = {
		firstName : user.firstName,
		lastName : user.lastName,
		email : user.email,
		Dob : user.dateOfBirth,
		Gender : user.gender == 'male'? 1 : 0,
		passwordhash : "",
		IsCustomer : user.accountType == 'Vendor'? 0 : 1,
		
	};
	
        async.waterfall([
			function(callback) {
				logger.info("password - "+user.password);
				
                // encrypting password
                corelibs.GenerateEncryptedPassword(user.password, 
					function(err,encryptedPassword) {
					logger.info('GenerateEncryptedPassword - done...'+ encryptedPassword);
                    input.passwordhash = encryptedPassword;
					
                    return callback(null);
                });
            },
            //Customer is not exists create customer in Gather
            function(callback){
                logger.info('input UserProfileTransactor READ- ' + JSON.stringify(input));
				//get db instance
				
				//execute procedure
				objUser.ExecuteProcedure(sps.RegisterUser, mandatoryToCreate,
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
					//if response isn't success
                    if (!dbResponse.isSuccess) { 
                       return res.end(JSON.stringify(response.Record));
                    }
					//encrypt user id
					var encryptedUserId = encodeURIComponent(
					corelibs.EncryptAES128(constants.EncryptionKey, ''+dbResponse.userId));
					
					//encrypt auth token
					var authToken = encodeURIComponent(corelibs.EncryptAES128(constants.EncryptionKey + dbResponse.userId,dbResponse.TokenID));
					
					//set headers to be accessible on client
					res.setHeader('AuthToken', authToken);
					res.setHeader('userId', dbResponse.userId);
					
					
					//if response is success
					if (dbResponse.isSuccess) {
						logger.info('dbResponse - ' + JSON.stringify(dbResponse));
						logger.info('response response - ' + JSON.stringify(response));
						return callback(null,response);
					}
					
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
 * @class UserProfileTransactor
 * @method UPDATE
 * @description: it can handle http verb PUT operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
UserProfileTransactor.prototype.UPDATE = function UserProfileTransactorUpdate(
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
				logger.info('sfInput UserProfileTransactor------- ' + JSON.stringify(sfInput));
				logger.info('sfInput UserProfileTransactor------- ' +  Object.keys(sfInput).length);
				
					return res.end(JSON.stringify(responseObj));
				
				
			});
};

/**
 * @class UserProfileTransactor
 * @method READ
 * @description: it can handle http verb GET operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
UserProfileTransactor.prototype.READ = function UserProfileTransactorRead(req,
        res, next) {
    var objUser = new Dal.Users();
    var input = [{
        UserID : req.body.user.UserID
    }];
	
	//Executing procedure 
    objUser.ExecuteProcedure(sps.UserProfileByUserID, mandatoryToRead, input,
            function(err, responseObj) {
        var responseData = {};
        if (err  || !response.isSuccess) {
            logger.error('UserProfileTransactorRead - ' + err.message);
            return throwError.InternalError(req, res, next);
        }
        if (responseObj.IsSuccess === 0) {
            req.ErrorMessage = 'Invalid User';
            req.ErrorCode = errorCodes.PreconditionFailed;
            return throwError.CustomError(req, res, next);
        }
        responseData.IsSuccess = responseObj.IsSuccess;
        responseData.User = corelibs.CloneObjectUsingTemplate(
                modileResponseRead, responseObj.Record);
        logger.info('UserProfileTransactorRead - done...');
        return res.end(JSON.stringify(responseData));
    });
};

module.exports = UserProfileTransactor;