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
        'ValidateAuthToken' : 'call usp_authtokens_Select(?)',
        'UserDetails' : 'call usp_accounts_Details(?)',
        'productsDetails' : 'call usp_products_select(?)',
        'productInsert' : 'call usp_products_insert(?)',
        'productDelete' : 'call usp_products_delete(?)',
        'DeleteProduct' : 'call usp_products_delete(?)',
        'Login' : 'call usp_authtokens_insert(?)',
        'productUpdate' : 'call usp_products_update(?)',
        'productsInfo' : 'call usp_products_details(?)',
        'cartInsert' : 'call usp_cart_insert(?)',
        'orderDetails' : 'call usp_order_Details(?)',
        'orderInsert' : 'call usp_order_insert(?)',
        'orderDelete' : 'call usp_order_delete(?)'
    }
};

module.exports = dbConfig;
