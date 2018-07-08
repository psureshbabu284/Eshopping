'use strict';

var corelibs = require('../corelibs');
var logger = corelibs.logger;
var config = require('../config');
var errorCodes = config.ErrorCodes;
var constants = config.Constants;
var Dal = require('../dal');
/**
 * @method ShopProductEnforcer
 * @description: is a class that can 
 * handle all the http verb operations under this route
 */
function ShopProductEnforcer() {}

/**
 * @class ShopProductEnforcer
 * @method READ
 * @description: it can handle http verb GET operations(Business
 *  logic validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
ShopProductEnforcer.prototype.READ =
    function ShopProductEnforcerRead(req, res, next) {
    logger.debug('ShopProductEnforcer - done...');

        return next();
		
    //return next();
};

ShopProductEnforcer.prototype.CREATE =
    function ShopProductEnforcerCreate(req, res, next) {
    logger.debug('ShopProductEnforcer - done...');

        return next();
		
    //return next();
};

ShopProductEnforcer.prototype.UPDATE =
    function ShopProductEnforcerUpdate(req, res, next) {
    logger.debug('ShopProductEnforcer - done...');

        return next();
		
    //return next();
};

ShopProductEnforcer.prototype.DELETE =
    function ShopProductEnforcerDelete(req, res, next) {
    logger.debug('ShopProductEnforcer delete - done...');

        return next();
		
    //return next();
};

module.exports = ShopProductEnforcer;