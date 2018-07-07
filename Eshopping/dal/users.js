'use strict';

var common = require('./common');

/**
 * @method User
 * @description it is a class that can handle all database operations related to
 * user table
 */
function User() {}

User.prototype.ExecuteProcedure = common.ExecuteProcedure;

module.exports = User;

