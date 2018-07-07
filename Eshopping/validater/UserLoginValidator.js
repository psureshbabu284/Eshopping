'use strict';

var corelibs = require('../corelibs');
var _ = require('underscore');
var logger = corelibs.logger;
var JsonValidater = corelibs.JsonValidater;
var throwError = require('../controller/throwErrors').ThrowError();

var createTemplate = {
    loginId : "",
    password : ""
}

/**
 * @method UserLoginValidator
 * @description: is a class that can 
 * handle all the http verb operations under this route
 */
function UserLoginValidator() {

}

/**
 * @class UserLoginValidator
 * @method CREATE
 * @description: it can handle http verb POST operations(data type validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
UserLoginValidator.prototype.CREATE = function UserLoginValidatorCreate(req,
        res, next) {
	logger.info(req.body);
    return next();
};

/**
 * @class UserLoginValidator
 * @method DELETE
 * @description: it can handle http verb DELETE operations
 * (data type validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
UserLoginValidator.prototype.DELETE =
    function UserLoginValidatorDelete(req, res, next) {
    logger.debug('UserLoginValidatorDelete - done...');
    return next();
};
module.exports = UserLoginValidator;
