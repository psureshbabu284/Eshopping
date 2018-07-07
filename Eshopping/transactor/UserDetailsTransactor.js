'use strict';

var _ = require('underscore');
var corelibs = require('../corelibs');
var logger = corelibs.logger;
var Dal = require('../dal');
var throwError = require('../controller/throwErrors').ThrowError();
var config = require('../config');
var sps = config.dbConfig.SP;
var constants = config.Constants;

var mandatoryToRead = {
    userId : true
};
/**
 * @method UserDetailsTransactor
 * @description: is a class that can handle all the http verb operations under
 * this route
 */
function UserDetailsTransactor() {}

/**
 * @class UserDetailsTransactor
 * @method READ
 * @description: it can handle http verb GET operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or suitable response
 */
UserDetailsTransactor.prototype.READ =
    function UserDetailsTransactorRead(req, res, next) {
	
    var objUser = new Dal.Users();
	
	var userObj ={};
	userObj.userId = req.headers.userid;

	corelibs.DecryptAES128(constants.EncryptionKey,decodeURIComponent(userObj.userId),function(err, resp){
		logger.info(' DecryptAES128 ERR - ' + JSON.stringify(err));
		logger.info(' DecryptAES128 responseObj - ' + JSON.stringify(resp));
	});

	logger.info(' UserDetailsTransactor userObj - ' + JSON.stringify(userObj));
	
    return objUser.ExecuteProcedure(sps.UserDetails, mandatoryToRead,
            [userObj], function(err, responseObj) {
		logger.info(' UserDetailsTransactorRead ERR - ' + JSON.stringify(err));
		logger.info(' UserDetailsTransactorRead responseObj - ' + JSON.stringify(responseObj.Record));

						
		res.setHeader('AuthToken', 'OFGbksLOSWtfJR6UJMyjqoS4NBL%2BhkZKO9fJrVhN%2BHzb0RkDTefp%2BHBoCs7sUp6p');
		res.setHeader('userId', responseObj.Record.Id);
		var responseData = {};
		responseData.isSuccess = 1;
		return res.end(JSON.stringify(responseObj.Record));
        
        
    });
};

module.exports = UserDetailsTransactor;