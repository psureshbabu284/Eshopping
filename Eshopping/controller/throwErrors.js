'use strict';

var errorCodes = require('../config').ErrorCodes;

/**
 * Throw Error : it is a class that can handle different types of errors!
 */
function ThrowErrors() {}

/**
 * Bad Request function is extending ThrowErrors class 
 * @return next {object} returns the next function with error object
 *  as a parameter! 
 */
ThrowErrors.prototype.BadRequest = function throwBadRequest(req, res, next) {
    var err = new Error('Bad Request');
    err.status = errorCodes.BadRequest;
    return next(err);
};
/**
 * Not Found function is extending ThrowErrors class 
 * @return next {object} returns the next function with error object
 *  as a parameter! 
 */
ThrowErrors.prototype.UserNotFound = function throwUserNotFound(req, res, next) {
    var err = new Error('User Not Found');
    err.status = errorCodes.OK;
    return next(err);
};
/**
 * USer Not Found function is extending ThrowErrors class 
 * @return next {object} returns the next function with error object
 *  as a parameter! 
 */
ThrowErrors.prototype.NotFound = function throwNotFound(req, res, next) {
    var err = new Error('Not Found');
    err.status = errorCodes.NotFound;
    return next(err);
};

/**
 * Method Not Allowed function is extending ThrowErrors class 
 * @return next {object} returns the next function with error object
 *  as a parameter! 
 */
ThrowErrors.prototype.NotAllowed = function throwNotAllowed(req, res, next) {
    var err = new Error('Method Not Allowed');
    err.status = errorCodes.NotAllowed;
    return next(err);
};
/**
 * Unauthorized function is extending ThrowErrors class 
 * @return next {object} returns the next function with error object
 *  as a parameter! 
 */
ThrowErrors.prototype.Unauthorized = function throwUnauthorized(req, res,
        next) {
    var err = new Error('Session Expired');
    err.status = errorCodes.Unauthorized;
    return next(err);
};
/**
 * InternalError function is extending ThrowErrors class 
 * @return next {object} returns the next function with error object
 *  as a parameter! 
 */
ThrowErrors.prototype.InternalError = function throwInternalError(req, res,
        next) {
    var err = new Error('InternalError');
    err.status = errorCodes.InternalError;
    return next(err);
};

/**
 * Custom Error and Message function is extending ThrowErrors class 
 * @return next {object} returns the next function with error object
 *  as a parameter! 
 */
ThrowErrors.prototype.CustomError = function throwCustomError(req, res, next) {
    var err = new Error(req.ErrorMessage);
    err.status = req.ErrorCode;
    return next(err);
};
/**
 * ErrorHandler Description: server.use will take function as input so
 * we are exporting the ErrorHandler function from this page 
 * @returns {Function} returns the ThrowErrors instance 
 * 
 */
function ErrorHandler() {
    return new ThrowErrors();
}
exports.ThrowError = ErrorHandler;