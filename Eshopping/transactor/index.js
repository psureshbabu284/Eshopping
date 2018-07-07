'use strict';

/**
 * exporting the functions/methods to outside of this module(folder)
 */

var UserProfileTransactor = require('./UserProfileTransactor');
var UserDetailsTransactor = require('./UserDetailsTransactor');
var AuthTokenTransactor = require('./AuthTokenTransactor');
var ProductTransactor = require('./ProductTransactor');
var UserLoginTransactor = require('./UserLoginTransactor');


exports.UserProfileTransactor = UserProfileTransactor;
exports.UserDetailsTransactor = UserDetailsTransactor;
exports.AuthTokenTransactor = AuthTokenTransactor;
exports.ProductTransactor = ProductTransactor;
exports.UserLoginTransactor = UserLoginTransactor;
