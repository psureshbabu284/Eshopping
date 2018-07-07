'use strict';

var urlRoutes = require('../server/urlroutes').APIs;

/**
 * EnforceHandler Description:
 *  This is a class that can handle different Enforcers in generic
 * 
 * @method EnforceHandler
 * @param req {object} request object
 * @param res {object} response object
 * @param next {object} function that needs to execute after success
 * @return handler {object} returns Enforcer
 *         function, corresponding to URL and CRUD Method
 */

var EnforceHandler = function EnforceHandler(req, res, next) {
    var handler = new urlRoutes[req.url].Enforcer();
    return handler[req.curdMethod](req, res, next);
};

/**
 * Enforcer Description: server.use will take function as input
 * so we are exporting the EnforceHandler function from this page
 * 
 * @returns {Function}
 */

var Enforce = function Enforce() {
    return EnforceHandler;
};

exports.Enforce = Enforce;