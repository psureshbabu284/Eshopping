'use strict';

/**
 * HTTP error codes and exporting
 * to access it outside of the file 
 */

var errorCodes = {
    'OK' : 200,
    'PartialContent' : 206,
    'RedirectionTimeout' : 399,
    'BadRequest' : 400,
    'Unauthorized' : 401,
    'Forbidden' : 403,
    'NotFound' : 404,
    'NotAllowed' : 405,
    'NotAcceptable' : 406,
    'Conflict' : 409,
    'PreconditionFailed' : 412,
    'RequestTooLarge' : 413,
    'TooManyRequests' : 429,
    'AlreadyCompleted' : 460,
    'AlreadyFailed' : 461,
    'NotCompletedWithPG' : 462,
    'NoSufficientAmount' : 463,
    'Closed' : 464,
    'Suspended' : 465,
    'EmailLimitsExceed' : 466,
    'InternalError' : 500,
    'RequestTimeout' : 503
};

exports.ErrorCodes = errorCodes;