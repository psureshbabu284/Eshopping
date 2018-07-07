'use strict';

var corelibs = require('../corelibs');
var logger = corelibs.logger;
var config = require('../config');
var errorCodes = config.ErrorCodes;
var constants = config.Constants;
var Dal = require('../dal');
/**
 * @method ProductEnforcer
 * @description: is a class that can 
 * handle all the http verb operations under this route
 */
function ProductEnforcer() {}

/**
 * @class ProductEnforcer
 * @method READ
 * @description: it can handle http verb GET operations(Business
 *  logic validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
ProductEnforcer.prototype.READ =
    function ProductEnforcerRead(req, res, next) {
    logger.debug('ProductEnforcer - done...');

        return next();
		
    //return next();
};

ProductEnforcer.prototype.CREATE =
    function ProductEnforcerCreate(req, res, next) {
    logger.debug('ProductEnforcer - done...');

        return next();
		
    //return next();
};

module.exports = ProductEnforcer;