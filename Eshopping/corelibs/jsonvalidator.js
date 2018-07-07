'use strict';

var _ = require('underscore');
var logger = require('../corelibs').logger;
/**
 * @method recurseValidateJson
 * @param validator is an instance of a Validator module
 * @param template is a reference JSON object used for validation it contains
 * the list of mandatory and optional fields
 * @param actual is a JSON object that needs for validation check
 * @description it will validate the data types of the JSON object(actual) with
 * reference object by using validator instance
 */
var recurseValidateJson = function(validator, template, actual) {

    if (_.isArray(actual)) {
        _.each(actual, function(actObj) {
            recurseValidateJson(validator, template, actObj);  
        });
    } else {
        var method, errMsg = 'missing or misrepresented';
		
        _.each(template, function(val, key) {
		
                if (template.hasOwnProperty(key)) {
			
		            if (template[key].constructor === Object) {
					    if (actual.hasOwnProperty(key) && actual[key].constructor === Object) {
							recurseValidateJson(validator, template[key],actual[key]);
                        } else {
                            validator.addCustomError(key + ' : ' + errMsg);
                        }
                    } else if (_.isArray(template[key])) {
                        if (actual.hasOwnProperty(key) && _.isArray(actual[key])) {
                            recurseValidateJson(validator, template[key],actual[key]);
                        } else {
                            validator.addCustomError(key + ' : ' + errMsg);
                        }
                    } else {
				
                        if (template[key] === 1 || (template[key] === 0 && actual.hasOwnProperty(key) &&
                                actual[key].length > 0)) {
								console.log("template[key] - "+ (actual[key].constructor === String));
                            if (actual[key] && actual[key].constructor === String) {
                                actual[key] = actual[key].trim();
                            }
                            if (actual.hasOwnProperty(key) && (_.isString(actual[key]) || _.isNumber(actual[key]) || 
                                        _.isBoolean(actual[key]))) {
                                method = 'is' + key;
                                if (!validator.hasOwnProperty(method)) {
                                    validator.addCustomError(key + ' : ' + actual[key] + ' - ' + 'unknown type');
                                } else if (!validator[method](actual[key])) {
                                    validator.addCustomError(key + ' : ' +
                                        errMsg + ' - ' + actual[key]);
                                }
                            } else {
                                validator.addCustomError(key + ' : ' + errMsg);
                            }
                        }
                    }
                }
            });
    }
};

/**
 * @method JsonValidater
 * @returns It will returns the JSON object, which contains the two methods
 * ValidateJson and getAllErrors. validateJson method validates the input with
 * given template getAllErrors method will returns the array of errors produced
 * by validateJson method!
 * @description It will returns the JSON object, which contains the two methods
 * ValidateJson and getAllErrors. validateJson method validates the input with
 * given template getAllErrors method will returns the array of errors produced
 * by validateJson method!
 */
var JsonValidater = function JsonValidater() {
    var validator = require('validator');
    validator._errors = [];
    validator.error = function error(msg) {
        this._errors.push(msg);
        return this;
    };
    validator.getErrors = function getErrors() {
        return this._errors;
    };
    validator.addCustomError = function addCustomError(err) {
        this.error(err);
        return this;
    };
    return {
        validateJson : function validateJson(template, actual) {
            recurseValidateJson(validator, template, actual);
        },
        getAllErrors : function getAllErrors() {
            return validator.getErrors();
        }
    };
};

module.exports = JsonValidater;
