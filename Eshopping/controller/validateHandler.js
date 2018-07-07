'use strict';

var urlRoutes = require('../server/urlroutes').APIs;

var corelibs = require('../corelibs');
var logger = corelibs.logger;
/**
 * ValidateHandler Description:
 *  This is a class that can handle different validater in generic
 * 
 * @method ValidateHandler
 * @param req {object} request object
 * @param res {object} response object
 * @param next {object} function that needs to execute after success
 * @return handler {object} returns validater
 *         function, corresponding to URL and CRUD Method
 */

var ValidateHandler = function ValidateHandler(req, res, next) {
    logger.debug('ValidateHandler - headers start...'+ JSON.stringify(req.query));
	logger.debug('ValidateHandler - start...'+ JSON.stringify(urlRoutes[req.url]));
    var handler = new urlRoutes[req.url].Validator();
    return handler[req.curdMethod](req, res, next);
};

/**
 * Validater Description: server.use will take function as input
 * so we are exporting the ValidateHandler function from this page
 * 
 * @returns {Function}
 */

var Validate = function Validate() {
    return ValidateHandler;
};

exports.Validate = Validate;