'use strict';

var dbConfig = require('../config').dbConfig;
var uuid = require('node-uuid');
var mysql = require('mysql');
var _ = require('underscore');
var logger = require('../corelibs').logger;
/**
 * @method SingletonContainer
 * @returns: it will return Singleton instance of DB
 * @description: it is a singleton design pattern 
 * that will return Singleton instance of DB.
 */
function SingletonContainer() {
    var instance;

    function createInstance() {
	
        var connection = mysql.createPool({
            connectionLimit : dbConfig.ConnectionLimit, 
            host : dbConfig.Host,
            user : dbConfig.User,
            password : dbConfig.Password,
            database : dbConfig.Database,
            multipleStatements : true,
			connectTimeout  : 60 * 60 * 1000,
			aquireTimeout   : 60 * 60 * 1000,
			timeout         : 60 * 60 * 1000,
        });
	
		return connection;
    }

    return {
        getInstance : function() {
		logger.info("instance - "+ instance);
            if (!instance) {
				logger.info("Creating DB Connection");
                instance = createInstance();
            }
			logger.info("Returning already created DB Connection");
            return instance;
        }
    };
}

/**
 * DALSingleton contains the instance of a DB for later usage!
 */
var DALSingleton = new SingletonContainer();

/**
 * @method openDBInstance
 * @description: it is a singleton design pattern 
 * that will return Singleton instance of DB.
 * @returns it will return Singleton instance of DB
 */
function openDBInstance() {
    return DALSingleton.getInstance();
}

/**
 * @method generateUUID
 * @description: it will generate unique UUID
 * @returns the unique value
 */
function generateUUID() {
    return uuid.v4();
}

/**
 * @method checkMandatoryFields
 * @description: this function will compare two objects such that
 *  object must contain all the fields available in template
 * @param template is a reference
 * @param object is an actual object
 * @returns it returns null if no errors are found else
 * returns array of errors
 */
function checkMandatoryFields(template, object) {
    var errors = [];
    if (object.constructor === Object) {
        for ( var key in template) {
            if (template.hasOwnProperty(key)) {
                if (template[key] === 1) {
                    if (object[key] === undefined) {
                        errors.push(key + ' is Mandatory');
                    }
                }
            }
        }
    } else if (_.isArray(object)) {
        for (var i = 0; i < object.length; i++) {
            var tmpErrors = checkMandatoryFields(template, object[i]);
            if (tmpErrors !== null) {
                errors = _.union(tmpErrors, errors);
            } else {
                return null;
            }
        }
    } else {
        return null;
    }
	logger.info("errors - "+ errors);
    return _.uniq(errors);
}

exports.GetDBInstance = openDBInstance;
exports.GenerateUUID = generateUUID;
exports.CheckMandatoryFields = checkMandatoryFields;