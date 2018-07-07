'use strict';

var corelibs = require('../corelibs');
var logger = corelibs.logger;
var config = require('../config');
var errorCodes = config.ErrorCodes;
var constants = config.Constants;
var Dal = require('../dal');
/**
 * @method UserDetailsEnforcer
 * @description: is a class that can 
 * handle all the http verb operations under this route
 */
function UserDetailsEnforcer() {}

/**
 * @class UserDetailsEnforcer
 * @method READ
 * @description: it can handle http verb GET operations(Business
 *  logic validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
UserDetailsEnforcer.prototype.READ =
    function UserDetailsEnforcerRead(req, res, next) {
    logger.debug('UserDetailsEnforcer - done...');

	//return next();
	var ua = req.body.userAgent, device = ua.device.family, objUser, input;
	if (device === 'Other') {
		device = ua.os.family; 
	}

    var objUser = new Dal.Users();

	var auth = req.query.auth;

	logger.info('auth - ' + auth);

	if(!auth) return next();
	
	

		var decryptedText = JSON.parse(corelibs.DecryptAES256(constants.AESKEY256, constants.AESIV256, req.query.auth));
		logger.info('decryptedText - ' + JSON.stringify(decryptedText));

		var input = [{
				loginId : decryptedText.email,
				password : decryptedText.password,
				Session: constants.SessionTime,
				Device : device,
				IPAddress: req.connection.remoteAddress
			}];
		
		logger.info('input - ' + JSON.stringify(input));

		//return res.end(JSON.stringify(input));
		
		return objUser.ExecuteProcedure(sps.usp_Login_usersauthtokens_insert, mandatoryToCreate,
				input, function(err, responseObj) {
			logger.error('responseObj - ' + JSON.stringify(responseObj.Record));
				var record;
				 if (err) {
						logger.error('UserDetailsEnforcer - ' + err.message);
						return throwError.InternalError(req, res, next);
				}

				if(responseObj.Record)
					record = responseObj

			
					req.query.userID = record.UserID;
					res.setHeader('userId', record.UserID);
				return next();
		   
	});
	
    //return next();
};

module.exports = UserDetailsEnforcer;