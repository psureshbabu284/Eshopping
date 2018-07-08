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
		function(callback) { 
			
			var loginId = req.body.loginId;
			input = [{
				loginId : loginId,
				password : req.body.password,
				Device : device,
				IPAddress: req.connection.remoteAddress
			}];
			
			logger.info('input loginId User Login Transactor---=- ' + JSON.stringify(input));
			
			return objUser.ExecuteProcedure(sps.Login, mandatoryToCreate, input,
					function(err, responseObj) {
				
				responseData = responseObj.Record;
				logger.info('User Login Transactor User details - ' + JSON.stringify(responseData));
				
				return callback(null, responseData);
		});

	},function(responseData, callback){
		//var isPasswordvalid = corelibs.ComparePasswordWithDBPassword(req.body.password,responseObj.passwordHash);
		logger.info('passwordhash UserLoginTransactorCreate- ' + responseData.passwordHash);
		var passwordHash = responseData.passwordHash;
		var salt = corelibs.GetSalt(passwordHash.toString());
		var passHashStr = passwordHash.toString();
		var dbPassword = passHashStr.split('.')[1];
		var password = req.body.password;
		logger.info('salt - ' + salt);
		logger.info('passwordHash.toString() - ' + passwordHash.toString());
		return corelibs.EncryptPasswordBySalt(password,salt, function(err, pwd) {
			
			if(pwd == dbPassword){
				logger.info('Password Same  - ' + pwd);
				//encrypt auth token
				var authToken = encodeURIComponent(corelibs.EncryptAES128(constants.EncryptionKey + responseData.accountId,responseData.tokenId));
				responseData.IsSuccess = 1;
				//set headers to be accessible on client
				res.setHeader('AuthToken', authToken);
				res.setHeader('userId', responseData.accountId);

				callback(null,responseData);
			}else{
				responseData.IsSuccess = 0;
				callback(null,responseData);
			}
			
		});
	},], function(err,result){
		//console.log(result);
		return res.end(JSON.stringify(responseData));
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
