'use strict';

/**
 * Application server configuration & exporting to access it outside of the file
 */

exports.Build = {
	Type : 'Local', //Production OR Staging OR Local 
	Environment : {
        Production : {
            Host : '54.166.208.91',
            Domain: 'http://eshop.com',
            Port : 3000,
            Protocol: 'HTTP',
            CurrentLogType : 'file',
            CurrentLogLevel : 'debug',
            DB : {
                ConnectionLimit : 10,
                Database : 'eshop',
                Host : '127.0.0.1',
                Password : 'password',
                UserName : 'root'
            }
        },
		Staging : {
            Host : '52.207.21.34',
            Domain: 'http://test.eshop.com',
            Port : 3000,
            Protocol: 'HTTP',
            CurrentLogType : 'file',
            CurrentLogLevel : 'debug',
            DB : {
                ConnectionLimit : 1000,
                Database : 'eshop',
                Host : '127.0.0.1',
                Password : 'password',
                UserName : 'root'
            }
		},
        Local : {
            Host : 'loclahost',
            Domain: '',
            Port : 3000,
            Protocol: 'HTTP',
            CurrentLogType : 'console',
            CurrentLogLevel : 'debug',
            DB : {
                ConnectionLimit : 10,
                Database : 'eshop',
                Host : 'localhost',
                Password : 'password',
                UserName : 'root'
            }
		}
		
    }
};
