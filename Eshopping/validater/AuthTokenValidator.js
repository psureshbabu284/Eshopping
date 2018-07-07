'use strict';

var corelibs = require('../corelibs');
var _ = require('underscore');
var logger = corelibs.logger;
var JsonValidater = corelibs.JsonValidater;
var throwError = require('../controller/throwErrors').ThrowError();

/**
 * @method AuthTokenValidator
 * @description: is a class that can 
 * handle all the http verb operations(data type validations) under this route
 */
function AuthTokenValidator() {

}

/**
 * @class AuthTokenValidator
 * @method Delete
 * @description: it can handle http verb POST operations(data type validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
AuthTokenValidator.prototype.DELETE =
    function AuthTokenValidatorDelete(req, res, next) {

    logger.debug('AuthTokenValidatorDelete - done...');
    return next();
};


/**
 * @class AuthTokenValidator
 * @method Read
 * @description: it can handle http verb GET operations(data type validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
AuthTokenValidator.prototype.READ =
    function AuthTokenValidatorRead(req, res, next) {

    logger.debug('AuthTokenValidatorRead - done...');
    return next();
};


/**
 * @class AuthTokenValidator
 * @method Read
 * @description: it can handle http verb GET operations(data type validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
AuthTokenValidator.prototype.GET =
    function AuthTokenValidatorRead(req, res, next) {

    logger.debug('AuthTokenValidatorRead - done...');
    return next();
};


module.exports = AuthTokenValidator;