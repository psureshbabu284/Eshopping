'use strict';

var corelibs = require('../corelibs');
var logger = corelibs.logger;
var config = require('../config');
var constants = config.Constants;
/**
 * @method UserProfileEnforcer
 * @description: is a class that can 
 * handle all the http verb operations(Business logic validations)
 *  under this route
 */
function UserProfileEnforcer() {

}

/**
 * @class UserProfileEnforcer
 * @method CREATE
 * @description: it can handle http verb POST operations(Business
 *  logic validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
UserProfileEnforcer.prototype.CREATE =
    function UserProfileEnforcerCreate(req, res, next) {
    logger.debug('UserProfileEnforcerCreate - done...');
	
	/*req.body.user.passwordHash = encodeURIComponent(
						corelibs.EncryptAES128(constants.EncryptionKey,
								'' + req.body.user.Password));*/
	
    return next();
};


/**
 * @class UserProfileEnforcer
 * @method CREATE
 * @description: it can handle http verb POST operations(Business
 *  logic validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
UserProfileEnforcer.prototype.UPDATE =
    function UserProfileEnforcerUpdate(req, res, next) {
    
	logger.debug('UserProfileEnforcerUpdate - done...');
	
    return next();
};


/**
 * @class UserProfileEnforcer
 * @method READ
 * @description: it can handle http verb GET operations(Business
 *  logic validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
UserProfileEnforcer.prototype.READ =
    function UserProfileEnforcerRead(req, res, next) {
    // we are checking req.headers.userid is exist or not
    // in authentication so here we are not checking
    req.body.user.UserID = req.headers.userid;
    logger.debug('UserProfileEnforcerRead - done...');
    return next();
};
module.exports = UserProfileEnforcer;