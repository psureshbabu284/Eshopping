'use strict';

var corelibs = require('../corelibs');
var logger = corelibs.logger;

/**
 * VideoCRMErrorHandler Description: Sending error messages
 * to client along with HTTP status codes! 
 * 
 * @method VideoCRMErrorHandler
 * @param err {object} error object
 * @param req {object} request object
 * @param res {object} response object
 * @param next {object} function that needs to execute after success
 * @return res {object} Returns the response
 */

function ErrorHandler(err, req, res, next) {
logger.debug('ErrorHandler - done...');
    next = null;
    if (err && err.status) {
        res.statusCode = err.status;
        var errorMessage = {
            'IsSuccess' : 0,
            'Message' : err.message
        };
        
        // by default files will upload to upload directory,
        // if any error comes we need to remove 
        corelibs.DeleteFileSynchronously(req.body.files, 'OldPath');
        logger.error(errorMessage);
        return res.end(JSON.stringify(errorMessage));
    }
}

/**
 * ErrorHandler Description: server.use will take function as input so
 * we are exporting the ErrorHandler function from this page 
 * @returns {Function} returns the VideoCRMErrorHandler function 
 * 
 */
function ErrorHandler() {
    return ErrorHandler;
}

exports.ErrorHandler = ErrorHandler;