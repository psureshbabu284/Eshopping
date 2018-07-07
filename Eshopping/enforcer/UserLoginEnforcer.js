'use strict';

var corelibs = require('../corelibs');
var logger = corelibs.logger;
var Dal = require('../dal');
var config = require('../config');
var sps = config.dbConfig.SP;
var constants = config.Constants;
var JsonValidater = corelibs.JsonValidater;
var throwError = require('../controller/throwErrors').ThrowError();
var _ = require('underscore');

var mandatoryToCreate = {
    Email : 1
};


var createTemplate = {
    loginId : "",
    password : ""
}

/**
 * @method UserLoginEnforcer
 * @description: is a class that can 
 * handle all the http verb operations under this route
 */
function UserLoginEnforcer() {

}

/**
 * @class UserLoginEnforcer
 * @method CREATE
 * @description: it can handle http verb POST operations
 * (Business logic validations)
 * encrypting the password with the original salt of the user
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
UserLoginEnforcer.prototype.CREATE =
    function UserLoginEnforcerCreate(req, res, next) {
	
	var objUser = new Dal.Users();
	var auth = req.body.auth;
	var loginId,decryptedText,password,decryptedArray;
	var isGatherMailSent = 0;
	var ReqFromSfdc = 0;
	logger.info('auth UserLoginEnforcerCreate- ' + auth);
	logger.info('UserLoginEnforcerCreate RequestFromSFDC - ' + ReqFromSfdc);

		if(auth && auth.length > 0){
			var sfdcStr = constants.SFDCREQSUBSTR;
			logger.info('qauth UserLoginEnforcerCreate auth- '+ auth);
			if(auth && auth.indexOf(sfdcStr) > -1){
				loginId = auth.split('||')[0];
				ReqFromSfdc = 1;
				logger.info('email sfdc UserLoginEnforcerCreate loginId- '+ loginId);
				password = 'test';
			}else {
				decryptedText = corelibs.DecryptAES256(constants.AESKEY256, constants.AESIV256, auth);
				logger.info('decryptedText - ' + decryptedText);
				decryptedArray = decryptedText.split('_p_'); 
				logger.info('decryptedArray - ' + decryptedArray);
				loginId = decryptedArray[0];
				password = decryptedArray[1];
			}
			
			if(!loginId) return;
			if(!password) return;
			
			req.body.loginId = loginId;
			req.body.password = password;
			
			logger.info('req.body.- ' + req.body);
			
		}else{
		
			loginId = req.body.loginId;
			password = req.body.password;
			
		}

		logger.info('UserLoginValidatorCreate loginId - ' + loginId);
		logger.info(' UserLoginValidatorCreate password - ' + password);

		var errors, validator = new JsonValidater();
		validator.validateJson(createTemplate, req.body);
		errors = validator.getAllErrors();
		if (!_.isEmpty(errors)) {
			req.ErrorMessage = 'UserLoginValidatorCreate error - ' +
				errors.join('; ');
			logger.error(req.ErrorMessage);
			return throwError.BadRequest(req, res, next);
		}
		req.body.user = corelibs.CloneObjectUsingTemplate(createTemplate, req.body);
		logger.debug('UserLoginEnforcerCreate - done...');
	
		var input = [{
			Email: loginId
		}];
	
		logger.info('UserLoginEnforcerCreate input - ' + JSON.stringify(input));
		return next();
       
};

/**
 * @class UserLoginEnforcerDelete
 * @method CREATE
 * @description: it can handle http verb DELETE operations (Business logic
 * validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or returns next function that needs to
 * be executed after this
 */
UserLoginEnforcer.prototype.DELETE =
    function UserLoginEnforcerDelete(req, res, next) {
    req.body.user.UserID = req.headers.userid;
    req.body.user.AuthToken = req.headers.authtoken;
    logger.debug('UserLoginEnforcerDelete - done...');
    return next();
};

module.exports = UserLoginEnforcer;