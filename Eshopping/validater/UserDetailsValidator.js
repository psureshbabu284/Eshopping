'use strict';

var corelibs = require('../corelibs');
var _ = require('underscore');
var logger = corelibs.logger;
var JsonValidater = corelibs.JsonValidater;
var throwError = require('../controller/throwErrors').ThrowError();

var readTemplate = {
    userId : 1
};

/**
 * @method UserDetailsValidator
 * @description: is a class that can handle all the http verb operations under
 * this route
 */
function UserDetailsValidator() {}

/**
 * @class UserDetailsValidator
 * @method READ
 * @description: it can handle http verb READ operations
 * (data type validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
UserDetailsValidator.prototype.READ =
    function UserDetailsValidatorRead(req, res, next) {
    
    logger.debug('UserDetailsValidatorRead - done...');
    return next();
};

module.exports = UserDetailsValidator;