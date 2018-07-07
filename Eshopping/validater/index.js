'use strict';

/**
 * exporting the functions/methods to outside of this module(folder)
 */
var UserProfileValidator = require('./UserProfileValidator');
var UserDetailsValidator = require('./UserDetailsValidator');
var AuthTokenValidator = require('./AuthTokenValidator');
var ProductValidator = require('./ProductValidator');



exports.UserProfileValidator = UserProfileValidator;
exports.UserDetailsValidator = UserDetailsValidator;
exports.AuthTokenValidator = AuthTokenValidator;
exports.ProductValidator = ProductValidator
