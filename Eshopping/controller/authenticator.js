'use strict';

var corelibs = require('../corelibs');
var logger = corelibs.logger;
var objAPIs = require('../server/urlroutes').APIs;
var Dal = require('../dal');
var throwError = require('../controller/throwErrors').ThrowError();
var config = require('../config');
var constants = config.Constants;
var async = require('async');

var mandatory = {
    UserID : 1,
    AuthToken : 1,
    Device : 1,
    Session : 1,
    IPAddress: 1
};

var mandatoryValidateAuthToken = {
	UserID: 1, 
	AuthToken: 1,
	Device: 1,
	Session : 1,
	IPAddress : 1,
	requfromsfdc : 1
}

/**
 * @method AuthenticateHandler
 * @description It will read the header content and authenticates the user
 * @param req {object} request object
 * @param res {object} response object
 * @param next {object} function that needs to execute after success
 * @returns {object} function that needs to execute after success or throws the
 * exceptions
 */
function AuthenticateHandler(req, res, next) {
	 logger.info("IN AuthenticateHandler function"+req.curdMethod);
	 
    if (objAPIs[req.url].methods[req.curdMethod]) {
	 logger.info("IN AuthenticateHandler if");
		if (req.url.indexOf('/test/service') >= 0) {
				logger.info(req.method + ':' + req.url + ' - Authentication(skip) done...');
				return next();
		}
		if (req.url.indexOf('/gettingstarted/masterdata') >= 0) {
				logger.info(req.method + ':' + req.url + ' - Authentication(skip) done...');
				return next();
		}
		if (req.url.indexOf('/user/register') >= 0) {
				logger.info(req.method + ':' + req.url + ' - Authentication(skip) done...');
				return next();
		}
		
		if (req.url.indexOf('/ofk/password') >= 0) {
				logger.info(req.method + ':' + req.url + ' - Authentication(skip) done...');
				return next();
		}
		/* if (req.url.indexOf('/ofk/password') >= 0) {
				logger.info(req.method + ':' + req.url + ' - Authentication(skip) done...');
				return next();
		} */
		if (req.url.indexOf('/ofk/client/verify') >= 0) {
				logger.info(req.method + ':' + req.url + ' - Authentication(skip) done...');
				return next();
		}

		if (req.url.indexOf('/ofk/livechatstatus') >= 0) {
			logger.info(req.method + ':' + req.url + ' - Authentication(skip) done...');
			return next();
	}


		var userId = req.headers.userid;
		var authToken = req.headers.authtoken;
		logger.info("IN req.headersreq.headers if" , req.headers);
		//if authToken exists 
		if (authToken){ 
			logger.info("IN inside if");
			var ua = req.body.userAgent, device = ua.device.family;
			
			logger.info('device :' + device);
			
			if (device === 'Other') {
				device = ua.os.family; 
			}
			async.waterfall([
				
			function(callback) {
					var auth = req.query.auth;
					logger.info("auth  Authenticator- " + auth);
					 if (userId && userId !== "null"){ 
						logger.info("IN userId :" + userId);
						logger.info('req headers Authenticator- '+ JSON.stringify(req.headers));
						
						corelibs.DecryptAES128(constants.EncryptionKey,decodeURIComponent(userId),callback);
						
						
					}else if (auth){ 
						logger.info("IN auth");
						var ua = req.body.userAgent, device = ua.device.family, 
						  objUser = new Dal.Users(), input;
						
						if (device === 'Other') {
							device = ua.os.family; 
						}
						
						var decryptedText = corelibs.DecryptAES256(constants.AESKEY256, constants.AESIV256, req.query.auth);

						//logger.info('decryptedText - ' + decryptedText);
						
						var email,password;
						email = decryptedText.split('_p_')[0];
						password = decryptedText.split('_p_')[1];
						
						var input = [{
								loginId : email,
								password : password,
								Session: constants.SessionTime,
								Device : device,
								IPAddress: req.connection.remoteAddress
							}];
							
							
						logger.info('input - ' + JSON.stringify(input));

						return objUser.ExecuteProcedure(sps.usp_authtokens_insert, mandatory,
								input, function(err, responseObj) {
							logger.error('responseObj - ' + JSON.stringify(responseObj.Record));
								var record;
								 if (err) {
										logger.error('UserDetailsEnforcer - ' + err.message);
										return throwError.InternalError(req, res, next);
								}

								if(responseObj.Record)
									record = responseObj.Record;

									return callback(null,record.UserID);
																	   
						});	// end of 	ExecuteProcedure				
					}else{
						return callback(null,null);
					}
				},function(decryptedUserId, callback) {
						logger.info("userId - "+ decryptedUserId);
						userId = decryptedUserId;
						req.headers.userid = parseInt(decryptedUserId, 10);
						if(!userId){
							logger.info("IN NOT userId");
							corelibs.DecryptAES128(constants.EncryptionKey,decodeURIComponent(authToken),
								callback);
						}else{
							logger.info("ELSE NOT userId--- " + authToken);
							corelibs.DecryptAES128(constants.EncryptionKey + '0pgI82PkUZGYS70Mq3aVFA%3D%3D',decodeURIComponent(authToken),
								callback);
						}
					},function(authToken, callback) {
						// TODO: userid, authtoken - datatype validation
						
						req.headers.authtoken = authToken;
						var objUser = new Dal.Users();
						var input = [{
							UserID: (!userId) ? -1 : userId,
							AuthToken: authToken,
							Device: '',
							Session : constants.SessionTime,
							IPAddress : req.connection.remoteAddress,
							requfromsfdc : ReqFromSfdc
						}];
						
						logger.info('input :' + JSON.stringify(input));
							 
						//TODO write code to validate accesstoken with salesforce data 
					   objUser.ExecuteProcedure(sps.ValidateAuthToken,
						mandatoryValidateAuthToken, input, function(err, response){
							logger.info('err mandatoryValidateAuthToken:' + JSON.stringify(err));
							logger.info('responseObj mandatoryValidateAuthToken:' + JSON.stringify(response));
						});
								
					}], function(err, responseObj) {
						
						logger.info(req.method + ':' + req.url + ' - Authentication done...');
						return next();
						
					});

        } else {
            req.ErrorMessage = req.method + ':' + req.url + ' - Un Authorized';
            logger.error(req.ErrorMessage);
            return throwError.Unauthorized(req, res, next);
        }
    } else {
        logger.info(req.method + ':' + req.url +
            ' - Authentication(skip) done...');
        return next();
    }
}

/**
 * Authenticator Description: server.use will take function as input so we are
 * exporting the RouteHandler function from this page
 * @returns {Function}
 */
function Authenticator() {
    return AuthenticateHandler;
}

exports.Authenticator = Authenticator;