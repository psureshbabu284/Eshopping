'use strict';

/**
 * Dependency modules 
 */
var _ = require('underscore');
var config = require('../config');
var dbUtils = require('./dbutils');
var errorCodes = config.ErrorCodes;

function ExecuteProcedure(sp, template, records, callback) {
    var responseObj = {}, options = {}, pool;
    var errors = [], recs = [], recordsOrder = [];
    recordsOrder = Object.keys(template);
    // Checking mandatory fields
    errors = dbUtils.CheckMandatoryFields(template, records);
	
    if (_.isArray(errors)) {
        if (!_.isEmpty(errors)) {
            responseObj.IsSuccess = 0;
            responseObj.ErrorCode = errorCodes.PreconditionFailed;
            responseObj.Message = 'Mandatory fields are missing - ' + errors.join(', ');
            return callback(new Error(responseObj.Message), responseObj);
        }
        
        // Preparing records to insert
        _.each(records, function(obj) {
            var rec = [];
            _.each(recordsOrder, function(field) {
             	if (obj[field] && obj[field].constructor === String) {
			       obj[field] = obj[field].trim();
                }
                rec.push(obj[field]);    
            });
            recs.push(rec);
        });
		
		// Getting db connection
       var connection = dbUtils.GetDBInstance();
		
        options.sql = sp;
        // Executing Stored Procedure with the parameters(recs)
        

        
        
        /*return pool.query(options, recs, function(err, rows) {
            responseObj.IsSuccess = 0;
            if (err) {
                responseObj.ErrorCode = errorCodes.InternalError;
                responseObj.Message = err.message;
                return callback(err, responseObj);
            }
            responseObj.Tables = rows;
            //Throw an Error if it didn't get any response from StoredProcedure
            if (!rows || !rows[0] || !rows[0][0]) {
                responseObj.ErrorCode = errorCodes.PreconditionFailed;
                responseObj.Message = 'INVALID_DATA';
                return callback(new Error(responseObj.Message), responseObj);
            }

            if (rows[0][0].Success === 0) {
                responseObj.IsSuccess = 0;
                responseObj.Record = rows[0][0];
            } else {
                responseObj.IsSuccess = 1;
                responseObj.Records = rows[0];
                responseObj.Record = rows[0][0];
            }
            return callback(null, responseObj);
        });*/
        
        
       // pool.getConnection(function(err, connection) {
      	  // Use the connection
      	
      	
      	 return connection.query(options, recs, function(err, rows) {
               
               if (err) {
				   responseObj.isSuccess = 0;
                   responseObj.ErrorCode = errorCodes.InternalError;
                   responseObj.Message = err.message;
                   return callback(err, responseObj);
               }
			   
               responseObj.Tables = rows;
			  // console.log("rows - "+ JSON.stringify(rows));
               //Throw an Error if it didn't get any response from StoredProcedure
               if (!rows || !rows[0] || !rows[0][0]) {
				   responseObj.isSuccess = 0;
                   responseObj.ErrorCode = errorCodes.PreconditionFailed;
                   responseObj.Message = 'INVALID_DATA';
                   return callback(new Error(responseObj.Message), responseObj);
               }
				
               if (rows[0][0].isSuccess === 0) {
                   responseObj.isSuccess = 0;
                   responseObj.Record = rows[0][0];
               } else {
                   responseObj.isSuccess = 1;
                   responseObj.Records = rows[0];
                   responseObj.Record = rows[0][0];
               }
               // And done with the connection.
       	      //connection.release();
               return callback(null, responseObj);
           });
      	 
      	 
      //	});
        
    } else {
        responseObj.IsSuccess = 0;
        responseObj.ErrorCode = errorCodes.PreconditionFailed;
        responseObj.Message = 'INVALID_INPUT';
        return callback(new Error(responseObj.Message), responseObj);
    }
}

exports.ExecuteProcedure = ExecuteProcedure;