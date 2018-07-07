'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var config = require('../config');
var constants = config.Constants;
var swig = require('swig');
var controller = require('../controller');
var bugsnag = require("bugsnag");
	bugsnag.register("023ed72ac6b9ff1c13fe66dbe5510102");
	bugsnag.notify(new Error("Non-fatal"));
var logger = require('../corelibs').logger;
var cors = require('cors');	

/**
 * @method CreateServer
 * @description: To Create a Server instance & to execute the middleware
 * functions in a specified manner
 * @returns server {Object} instance of a server
*/

function CreateServer() {

    var server = express();
   
	server.use(favicon(constants.FavIcon));
    server.set('view engine', 'html');
    server.set('views', constants.ViewsDirectory);
    server.engine('html', swig.renderFile);
	
    server.use('/public', express.static(constants.StaticDirectory));
	logger.info("server intiation starts ..");
    server.use(bodyParser.urlencoded({
        extended : true
    }));
    	
    //  content-type: text/plain; charset=UTF-8 - for Amazon SES-SNS
    server.use(bodyParser.text({
        limit : constants.JSONPayLoadLimit
    }));
    
    //  content-type: application/json - for VideoCRM
    server.use(bodyParser.json({
        limit : constants.JSONPayLoadLimit
    }));
    
   
	server.use(cors({origin: 'http://localhost:8888'}));
    server.use(controller.RouteHandler());
    server.use(controller.Authenticator());
    server.use(controller.ValidateHandler());
    server.use(controller.EnforceHandler());
    server.use(controller.TransactHandler());
    server.use(controller.ErrorHandler());
	
	
    server.listen(config.build.Environment[config.build.Type].Port);
		
	
    return server;
}

module.exports = CreateServer;
