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
 * @method ShopProductValidator
 * @description: is a class that can handle all the http verb operations under
 * this route
 */
function ShopProductValidator() {}

/**
 * @class ShopProductValidator
 * @method READ
 * @description: it can handle http verb READ operations
 * (data type validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
ShopProductValidator.prototype.READ =
    function ShopProductValidatorRead(req, res, next) {
    
    logger.debug('ShopProductValidatorRead - done...');
    return next();
};

ShopProductValidator.prototype.CREATE =
    function ShopProductValidatorCreate(req, res, next) {
    
    logger.debug('ShopProductValidatorRead - done...');
    return next();
};

ShopProductValidator.prototype.UPDATE =
    function ShopProductValidatorUpdate(req, res, next) {
    
    logger.debug('ShopProductValidatorRead - done...');
    return next();
};

ShopProductValidator.prototype.DELETE =
    function ShopProductValidatorDelete(req, res, next) {
    
    logger.debug('ShopProductValidatorDelete - done...');
    return next();
};

module.exports = ShopProductValidator;