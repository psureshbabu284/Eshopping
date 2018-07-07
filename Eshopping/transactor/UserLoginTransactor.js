'use strict';

var corelibs = require('../corelibs');
var logger = corelibs.logger;
var Dal = require('../dal');
var throwError = require('../controller/throwErrors').ThrowError();
var config = require('../config');

var errorCodes = config.ErrorCodes;
var constants = config.Constants;
var sps = config.dbConfig.SP;
var async = require('async');

var mandatoryToCreate = {
	loginId : 1,
	password : 1,
	Device : 1,
	IPAddress: 1
};
var mandatoryToDelete = {
		UserID : 1,
		AuthToken : 1,

};


/**
 * @method UserLoginTransactor
 * @description: is a class that can handle all the http verb operations under
 * this route
 */
function UserLoginTransactor() {}

/**
 * @class UserLoginTransactor
 * @method CREATE
 * @description: it can handle http verb POST operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or suitable response
 */
UserLoginTransactor.prototype.CREATE =
	function UserLoginTransactorCreate(req, res, next) {
	var ua = req.body.userAgent, device = ua.device.family, objUser, input;

	var responseData = {};
	var driveFolderId = "";
	
	objUser = new Dal.Users();
	var userID;

	
	async.waterfall([
		//Check Google Folder Exisists for the Account or not
		
		function(callback) { 
			
			var loginId = req.body.loginId;
			input = [{
				loginId : loginId,
				password : req.body.password,
				Device : device,
				IPAddress: req.connection.remoteAddress
			}];
			
			logger.info('input loginId User Login Transactor---=- ' + JSON.stringify(input));
			
			return objUser.ExecuteProcedure(sps.Login, mandatoryToCreate, [input],
					function(err, responseObj) {
				
				responseObj = responseObj.Record;
				logger.info('User Login Transactor User details - ' + JSON.stringify(responseObj));
				
				return callback(null, responseData);
		});

	}], function(err,result){
		//console.log(result);
		return res.end(JSON.stringify(result));
	});
};

/**
 * @class UserLoginTransactorDelete
 * @method CREATE
 * @description: it can handle http verb DELETE operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or suitable response
 */
UserLoginTransactor.prototype.DELETE =
	function UserLoginTransactorDelete(req, res, next) {
	var objUser = new Dal.Users();
	var input = [{
		UserID: req.body.user.UserID,
		AuthToken: req.body.user.AuthToken
	}];
	return objUser.ExecuteProcedure(sps.Logout, mandatoryToDelete,
			input, function(err, responseObj) {
		if (err || responseObj.IsSuccess !== 1) {
			var msg = err ? err.message : 'Invalid User'; 
			logger.error('UserLoginTransactorDelete - ' + msg);
			if (responseObj.IsSuccess === 0) {
				req.ErrorMessage = msg;
				req.ErrorCode = errorCodes.PreconditionFailed;
				return throwError.CustomError(req, res, next);
			}
			return throwError.InternalError(req, res, next);
		}
		logger.info('UserLoginTransactorDelete - done...');
		return res.end(JSON.stringify({'IsSuccess' : 1,
			Message: 'Successfully logged out.'}));
	}); 
};
module.exports = UserLoginTransactor;
