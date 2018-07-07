'use strict';

/**
 * exporting the functions/methods to outside of this module(folder)
 */
var UserProfileValidator = require('./UserProfileValidator');
var UserDetailsValidator = require('./UserDetailsValidator');
var AuthTokenValidator = require('./AuthTokenValidator');



exports.UserProfileValidator = UserProfileValidator;
exports.UserDetailsValidator = UserDetailsValidator;
exports.AuthTokenValidator = AuthTokenValidator;
