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

var mandatoryToDelete = {
    userId : 1,
    authToken : 1,
	deviceName : 1,
	reqFromSFDC : 1
};

/**
 * @method AuthTokenTransactor
 * @description: is a class that can handle all the http verb operations under
 * this route
 */
function AuthTokenTransactor() {}

/**
 * @class AuthTokenTransactor
 * @method DELETE
 * @description: it can handle http verb POST operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
AuthTokenTransactor.prototype.DELETE = function AuthTokenTransactorDelete(
        req, res, next) {
   
			var responseObj = {};
			responseObj.isSuccess = 1;
			return res.end(JSON.stringify(responseObj));

   
};


/**
 * @class AuthTokenTransactor
 * @method DELETE
 * @description: it can handle http verb POST operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
AuthTokenTransactor.prototype.READ = function AuthTokenTransactorRead(
        req, res, next) {
		
	var ua = req.body.userAgent, device = ua.device.family, objUser, input;
	if (device === 'Other') {
		device = ua.os.family; 
	}
	var objUser = new Dal.Users();
	var input = {};
	input.userId = req.headers.userid;
	input.authToken = req.headers.authtoken;
    input.deviceName = device;
	//logger.info("input json "+JSON.stringify(input));
	
    async.waterfall([
           
            function(callback) {
				var dbConnection = objUser.getInstance;
				
				 objUser.ExecuteProcedure(sps.ValidateSession, mandatoryToDelete,
                        [ input ], function(err, resp) {
                    if (err) {
                        return callback(err, resp, {
                            Message: err.message,
                            ErrorCode: errorCodes.InternalError
                        });
                    }
                    if (!resp.isSuccess) {
                        resp.ErrorCode = errorCodes.PreconditionFailed;
                        return callback(new Error(resp.Message), null, resp);
                    }
					logger.info('resp - ' + JSON.stringify(resp));
                    return callback(err, null, resp.Record);
                });
            }], function(err, info, responseObj) {
				logger.info('responseObj - ' + JSON.stringify(responseObj));
				logger.info('err - ' + err);
				var responseData = {}; 
					if (!err || responseObj.Success) {
						return res.end(JSON.stringify(responseObj));
					}else{
						return throwError.CustomError(req, res, next);
					}
					return throwError.InternalError(req, res, next);
			});
};



/**
 * @class AuthTokenTransactor
 * @method DELETE
 * @description: it can handle http verb POST operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
AuthTokenTransactor.prototype.GET = function AuthTokenTransactorRead(
        req, res, next) {
		
	var ua = req.body.userAgent, device = ua.device.family, objUser, input;
	if (device === 'Other') {
		device = ua.os.family; 
	}
	var objUser = new Dal.Users();
	var input = {};
	input.userId = req.params.email;
    input.deviceName = device;
	input.Session =  constants.SessionTime;
	input.IPAddress =  req.connection.remoteAddress;
	//logger.info("input json "+JSON.stringify(input));
	
    async.waterfall([
           
            function(callback) {
				var dbConnection = objUser.getInstance;
				
				 objUser.ExecuteProcedure(sps.GetAuthToken, mandatoryToGet,
                        [ input ], function(err, resp) {
                    if (err) {
                        return callback(err, resp, {
                            Message: err.message,
                            ErrorCode: errorCodes.InternalError
                        });
                    }
                    if (!resp.isSuccess) {
                        resp.ErrorCode = errorCodes.PreconditionFailed;
                        return callback(new Error(resp.Message), null, resp);
                    }
					logger.info('resp - ' + JSON.stringify(resp));
                    return callback(err, null, resp.Record);
                });
            }], function(err, info, responseObj) {
				logger.info('responseObj - ' + JSON.stringify(responseObj));
				logger.info('err - ' + err);
				var responseData = {}; 
					if (!err || responseObj.Success) {
						return res.end(JSON.stringify(responseObj));
					}else{
						return throwError.CustomError(req, res, next);
					}
					return throwError.InternalError(req, res, next);
			});
};



module.exports = AuthTokenTransactor;