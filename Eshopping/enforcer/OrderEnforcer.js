'use strict';

var corelibs = require('../corelibs');
var logger = corelibs.logger;
var config = require('../config');
var errorCodes = config.ErrorCodes;
var constants = config.Constants;
var Dal = require('../dal');
/**
 * @method OrderEnforcer
 * @description: is a class that can 
 * handle all the http verb operations under this route
 */
function OrderEnforcer() {}

/**
 * @class OrderEnforcer
 * @method READ
 * @description: it can handle http verb GET operations(Business
 *  logic validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
OrderEnforcer.prototype.READ =
    function OrderEnforcerRead(req, res, next) {
    logger.debug('OrderEnforcer - done...');

        return next();
		
    //return next();
};

OrderEnforcer.prototype.CREATE =
    function OrderEnforcerCreate(req, res, next) {
    logger.debug('OrderEnforcer - done...');

        return next();
		
    //return next();
};

OrderEnforcer.prototype.UPDATE =
    function OrderEnforcerUpdate(req, res, next) {
    logger.debug('OrderEnforcer - done...');

        return next();
		
    //return next();
};

OrderEnforcer.prototype.DELETE =
    function OrderEnforcerDelete(req, res, next) {
    logger.debug('OrderEnforcer delete - done...');

        return next();
		
    //return next();
};

module.exports = OrderEnforcer;