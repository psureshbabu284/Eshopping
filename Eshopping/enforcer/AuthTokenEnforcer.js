'use strict';

var corelibs = require('../corelibs');
var logger = corelibs.logger;
var config = require('../config');
var constants = config.Constants;
/**
 * @method AuthTokenEnforcer
 * @description: is a class that can 
 * handle all the http verb operations(Business logic validations)
 *  under this route
 */
function AuthTokenEnforcer() {

}

/**
 * @class AuthTokenEnforcer
 * @method DELETE
 * @description: it can handle http verb POST operations(Business
 *  logic validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
AuthTokenEnforcer.prototype.DELETE =
    function AuthTokenEnforcerDelete(req, res, next) {

    logger.debug('AuthTokenEnforcerDelete - done...');
    return next();
};


/**
 * @class AuthTokenEnforcer
 * @method READ
 * @description: it can handle http verb GET operations(Business
 *  logic validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
AuthTokenEnforcer.prototype.READ =
    function AuthTokenEnforcerRead(req, res, next) {

    logger.debug('AuthTokenEnforcerRead - done...');
    return next();
};



module.exports = AuthTokenEnforcer;