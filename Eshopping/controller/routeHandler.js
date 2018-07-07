'use strict';

var url = require('url');
var uaParser = require('ua-parser');
var logger = require('../corelibs').logger;
var objAPIs = require('../server/urlroutes').APIs;
var throwError = require('../controller/throwErrors').ThrowError();

var methods = {
    POST : 'CREATE',
    GET : 'READ',
    PUT : 'UPDATE',
    DELETE : 'DELETE'
};

/**
 * RouteHandler Description: Validates the route(URL).
 * If it is valid, it will go further otherwise throws an error
 * 
 * @method RouteHandler
 * @param req {object} request object
 * @param res {object} response object
 * @param next {object} function that needs to execute after success
 * @return next {object} Returns the next function that needs
 *       to execute after success
 */

function RouteHandler(req, res, next) {
    var requrl = url.parse(req.url, true);
    var apis = Object.keys(objAPIs);
    req.originalURL = req.url;
    
    console.log("Req = " + JSON.stringify(req.url));
    console.log("pathname  Headers = " + JSON.stringify(req.headers));
    console.log("pathname  = " + requrl.pathname);
    console.log("pathname  req.originalURL= " + req.originalURL);
    console.log("pathname  req.body= " + JSON.stringify(req.body));
	
	if (requrl.pathname !== '/ofk/' &&
            requrl.pathname.substring(requrl.pathname.length - 1) === '/ofk/') {
        req.url = requrl.pathname.substring(0, requrl.pathname.length - 1);
    }else if(requrl.pathname === '/') {
        logger.info('Path is empty - '  );
        return res.redirect('/public/views/gettingstarted.html');
    }else{
        req.url = requrl.pathname;
    }
	
	logger.info('body - ' + JSON.stringify(req.body));
	logger.info('header - ' + JSON.stringify(req.header));
    logger.info('files - ' + JSON.stringify(req.files));
    logger.info('query params - ' + JSON.stringify(req.query));
   
    req.body.userAgent = uaParser.parse(req.headers['user-agent']);
    req.query = requrl.query;
    req.curdMethod = methods[req.method];
    res.setHeader('Content-Type', 'application/json');
	
	if (req.url.indexOf('/ofk/images/') !== -1 &&
            req.curdMethod === methods.GET) {
			logger.info("index of images");
        var arrRoute = req.url.split('/ofk/images/');
        if (arrRoute.length > 0 && arrRoute[1].length > 0) {
            req.query.Image = arrRoute[1];
            req.url = '/ofk/images/';
            logger.debug('Route - done...');
            return next();
        }
    }

	
	if (req.url.indexOf('/ofk/public/') !== -1 &&
            req.curdMethod === methods.GET) {
			logger.info("ofk public");
        
            return next();
    }

	if (apis.indexOf(req.url) !== -1) {
		logger.info("IN apis.index of condition" + req.url);
	    if (objAPIs[req.url].methods.hasOwnProperty(req.curdMethod)) {
            return next();
        } else {
	        req.ErrorMessage = req.method + ':' + req.url +
                ' - Invalid HTTP Method';
            logger.error(req.ErrorMessage);
            return throwError.NotAllowed(req, res, next);
        }
    } else {
        req.ErrorMessage = req.method + ':' + req.url +
            ' - Invalid Route';
        logger.error(req.ErrorMessage);
        return throwError.NotFound(req, res, next);
    }
}

/**
 * Router Description: server.use will take function as input so
 * we are exporting the RouteHandler function from this page
 * 
 * @returns {Function} returns the RouteHandler function
 */
function Router() {
    return RouteHandler;
}

exports.Router = Router;