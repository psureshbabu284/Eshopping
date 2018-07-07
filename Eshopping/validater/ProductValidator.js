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
 * @method ProductValidator
 * @description: is a class that can handle all the http verb operations under
 * this route
 */
function ProductValidator() {}

/**
 * @class ProductValidator
 * @method READ
 * @description: it can handle http verb READ operations
 * (data type validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
ProductValidator.prototype.READ =
    function ProductValidatorRead(req, res, next) {
    
    logger.debug('ProductValidatorRead - done...');
    return next();
};

ProductValidator.prototype.CREATE =
    function ProductValidatorCreate(req, res, next) {
    
    logger.debug('ProductValidatorRead - done...');
    return next();
};

ProductValidator.prototype.UPDATE =
    function ProductValidatorUpdate(req, res, next) {
    
    logger.debug('ProductValidatorRead - done...');
    return next();
};

ProductValidator.prototype.DELETE =
    function ProductValidatorDelete(req, res, next) {
    
    logger.debug('ProductValidatorDelete - done...');
    return next();
};

module.exports = ProductValidator;