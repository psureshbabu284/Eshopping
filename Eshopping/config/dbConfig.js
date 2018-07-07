'use strict';

/**
 * MySQL database configuration and exporting to access it outside of the file
 */

var build = require('./build').Build;

var dbConfig = {
    'ConnectionLimit' : build.Environment[build.Type].DB.ConnectionLimit,
    'Database' : build.Environment[build.Type].DB.Database,
    'Host' : build.Environment[build.Type].DB.Host,
    'Password' : build.Environment[build.Type].DB.Password,
    'User' : build.Environment[build.Type].DB.UserName,
    'SP' : {
        'RegisterUser' : 'call usp_accounts_insert(?)',
        'UserDetailsBySFID' : 'call usp_UserDetailsBySFID_Users_Select(?)',
        'ValidateAuthToken' : 'call usp_authtokens_Select(?)',
        'UserDetails' : 'call usp_accounts_Details(?)',
        'productsDetails' : 'call usp_products_select(?)',
        'productInsert' : 'call usp_products_insert(?)'
    }
};

module.exports = dbConfig;
