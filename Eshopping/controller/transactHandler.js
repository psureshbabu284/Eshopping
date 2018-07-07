'use strict';

var urlRoutes = require('../server/urlroutes').APIs;
var corelibs = require('../corelibs');
var logger = corelibs.logger;
/**
 * TransactHandler Description: 
 * This is a class that can handle different transactor's in generic
 * 
 * @method TransactHandler
 * @param req {object} request object
 * @param res {object} response object
 * @param next {object} function that needs to execute after success
 * @return handler {object} returns Transactor function,
 *       corresponding to URL and CRUD Method
 */

var TransactHandler = function TransactHandler(req, res, next) {
	logger.debug('TransactHandler - done...');
    var handler = new urlRoutes[req.url].Transactor();
	return handler[req.curdMethod](req, res, next);
};

/**
 * Transact Description: server.use will take function as input
 * so we are exporting the Transactor function from this page
 * 
 * @returns {Function}
 */

var Transact = function Transact() {
    return TransactHandler;
};

exports.Transact = Transact;