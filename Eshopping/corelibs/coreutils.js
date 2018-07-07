'use strict';

/**
 * this is the core library for Hair Direct that contains Utility functions!
 */
var _ = require('underscore');
var fs = require('fs');
var async = require('async');
var config = require('../config');
var constants = config.Constants;
var winston = require('winston');
var crypto = require('crypto');
crypto.DEFAULT_ENCODING = 'binary';
var pkcs7 = require('pkcs7');
winston.remove(winston.transports.Console);
winston.addColors(config.winstonLogsConfig.colors);

var logger = new (winston.Logger)(config.winstonConfig);
if (config.winstonLogsConfig.currentLogType.toLowerCase() !== 
    config.winstonLogsConfig.defaultLogType.toLowerCase()) {
    //logger.add(winston.transports.File, config.winstonTransports.File);   
	logger.add(winston.transports.Console, config.winstonTransports.Console);
} else {
    logger.add(winston.transports.Console, config.winstonTransports.Console);
}

/**
 * @method getSalt
 * @description: it will return the salt from encrypted string!
 * @param key: encrypted string!
 * @returns it will return the salt from encrypted string!
 */
function getSalt(key) {
    return key.substr(0, key.indexOf('.'));
}

/**
 * @method getKey
 * @description: it will return the key from encrypted string!
 * @param key: encrypted string!
 * @returns it will return the key from encrypted string!
 */
function getKey(key) {
    return key.substr(key.indexOf('.') + 1, key.length);
}

/**
 * @method generateRandomHash 
 * @description: it will generate randomHash for encryption !
 * @returns it will return the generated random hash!
 */
function generateRandomHash() {
    var set, salt = '', iteration, value;
    set = constants.Numbers + constants.LowerChars + constants.UpperChars;
    for (iteration = 0; iteration < constants.SaltLength; iteration++) {
        value = Math.floor(Math.random() * set.length);
        salt += set[value];
    }
    return salt;
}
//testintserverapi@apps.com
/**
 * @method cryptoPasswordHash
 * @description : it will use pbkdf2 algorithm for one way encryption!
 * @param pass: Password or the string that needs encryption
 * @param salt: random hash that can be used at the time of encryption
 * @param callback: is a function that can be invoked after
 *  executing pbkdf2 function  
 * @returns encrypted string
 */
function cryptoPasswordHash(pass, salt, callback) {
    return crypto.pbkdf2(pass, salt, constants.PBKDF2Iterations,
            constants.PBKDF2KeyLength,'sha512', callback);
}
/**
 * @method GenerateEncryptedPassword
 * @description this function generates the salt(string) first 
 *  after that encrypt's the password(string) with salt
 *  this encryption is - one way encryption 
 * @param password is a string that needs to be encrypted
 * @param callback is a function that can be invoked
 *  after generation of encrypted string
 * @returns returns the function instance with encrypted string 
 */
function GenerateEncryptedPassword(password, callback) {
    var salt = generateRandomHash();
    return cryptoPasswordHash(password, salt, function(err, d1) {
        //console.log(salt + '.' + d1);
        return callback(null, salt + '.' + d1);
    });
}

/**
 * @method ComparePasswordWithDBPassword
 * @param password string that needs for comparison 
 * @param dbPassword encrypted string
 * @description: This function compares the dbPassword(encrypted string)
 *  with password(string) by encrypting password with
 *  the salt of dbPassword(encrypted string)
 * @returns
 */
function ComparePasswordWithDBPassword(password, dbPassword) {
    var dbSalt, dbKey;
    dbSalt = getSalt(dbPassword);
    dbKey = getKey(dbPassword);
	
    return cryptoPasswordHash(password, dbSalt, function(err, d1) {
		
        if (d1 === dbKey) {
            return true;
        }
        return false;
    });
}

/**
 * @method GenerateRandomPassword
 * @description: It will generates the random string that contains at least
 *  one UpperCase letter, One LowerCase letter, One Number
 *  and One Special Character
 * @returns {String} returns the string
 */
function GenerateRandomPassword() {
    var randomNumner = '', length = constants.PasswordLength;
    for (var i = 0; i < length; i++) {
        if (i < length) {
            randomNumner += constants.Numbers.charAt(Math.floor(
                    Math.random() * constants.Numbers.length));
        }
        i = randomNumner.length;
        if (i < length) {
            randomNumner += constants.UpperChars.charAt(Math.floor(
                    Math.random() * constants.UpperChars.length));
        }
        i = randomNumner.length;
        if (i < length) {
            randomNumner += constants.LowerChars.charAt(Math.floor(
                    Math.random() * constants.LowerChars.length));
        }
        i = randomNumner.length;
        /*if (i < length) {
            randomNumner += constants.SpecialChars.charAt(Math.floor(
                    Math.random() * constants.SpecialChars.length));
        }*/
        i = randomNumner.length;
    }
    randomNumner = randomNumner.split('').sort(function() {
        return 0.5 - Math.random()
    }).join('');
    return randomNumner;
}

/**
 * @method CloneObjectUsingTemplate
 * @param template is a JSON object used as a reference
 * @param obj is a JSON object that needs to be cloning
 * @returns the cloned JSON object
 * @description it will clones the obj by taking template as a reference
 * 
 */
var cloneObjectUsingTemplate =
    function CloneObjectUsingTemplate(template, obj) {
    if (_.isArray(obj)) {
        var cloneArray = [];
        _.each(obj, function(actObj) {
            cloneArray.push(cloneObjectUsingTemplate(template, actObj));
        });
        return cloneArray;
    } else {
        var clone = {};
        if (template === null || obj === null) {
            return null;
        }
        if (typeof (template) !== 'object') {
            if (obj.constructor === Date) {
                return new Date(obj);
            }
            if (typeof (obj) === 'object') {
                return null;
            }
            return obj;
        }
        _.each(template, function(val, key){
			
            if (obj.hasOwnProperty(key)) {
                clone[key] = cloneObjectUsingTemplate(template[key], obj[key]);
            }
        });
        console.log("hasOwnProperty clone- ",clone);
        return clone;
    }
}

/**
 * @method GetFileExtensionFromPath
 * @param filepath is a file location (string) 
 * @description: it will returns the extension of the files
 *  by using regular expression
 * @returns it will returns the an array that contains
 *  the file extensio information
 */
function GetFileExtensionFromPath(filePath) {
    var regExpression = /(?:\.([^.]+))?$/;
    return regExpression.exec(filePath);
}

/**
 * @method DeleteFileSynchronously
 * @description Synchronously delete the files in given array of paths
 * @param paths array of file paths
 */
function DeleteFileSynchronously(paths, key) {
    _.each(paths, function(path) {
        fs.exists(path[key], function (exists) {
            if (exists === true) {
                fs.unlinkSync(path[key]);
            }
        });
    });
}
/**
 * @method RenameFilesAsynchronously
 * @description it will rename the files Asynchronously
 * @param paths array of paths
 * @param cb
 */
function RenameFilesAsynchronously(paths, cb) {
    async.eachSeries(paths, function(path, callback) {
        fs.rename(path.OldPath, path.NewPath, callback)
    }, function(err) {
        return cb(err);
    });
}


/**
 * @method EncryptAES256
 * @description encrypts the given data with given key using AES 256 ECB
 * @param cryptkey
 * @param iv
 * @param textToBeEncrypted
 * @returns
 */
function EncryptAES256(cryptkey, iv, textToBeEncrypted) {
	 var encoding = "base64" || "binary";
	 var encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv);
	 var encryptdata = encipher.update(textToBeEncrypted, 'utf8', 'binary');
	
	encryptdata += encipher.final('binary');
	logger.info("encryptdata final - "+ encryptdata);
	var encode_encryptdata = new Buffer(encryptdata, 'binary').toString('base64');
	logger.info("encryptdata encoded - "+ encode_encryptdata);
	
	return encode_encryptdata;
    
}

/**
 * @method DecryptAES256
 * @description decrypts the given data with given key using AES 256 ECB
 * @param cryptkey
 * @param iv
 * @param decryptedText
 * @returns
 */
function DecryptAES256(cryptkey, iv, decryptedText) {
	logger.info("decryptedText string - "+ decryptedText);
	decryptedText = new Buffer(decryptedText, 'base64').toString('binary');
//	var decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv).setAutoPadding(false),
	var decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv),
        decoded  = decipher.update(decryptedText,'binary', 'utf8');
		logger.info("decoded - "+ decoded);
	
    decoded += decipher.final('utf8');
	logger.info("decoded final - "+ decoded);
	return decoded;
}


/**
 * @method EncryptAES128
 * @description encrypts the given data with given key using AES 128 ECB
 * @param key
 * @param data
 * @returns
 */
function EncryptAES128(key, data) {
    var cipher, crypted;
    cipher = crypto.createCipher('aes-128-ecb', key);
    crypted = cipher.update(data, 'utf-8', 'base64');
    crypted += cipher.final('base64');
	logger.info("crypted string - "+ crypted);
    return crypted;
}

/**
 * @method DecryptAES128
 * @description decrypts the given data with given key using AES 128 ECB
 * @param key
 * @param data
 * @returns
 */
function DecryptAES128(key, data, callback) {
    var decipher, chunks, output, decrypted = '';
    logger.info("key exception -----------" + key);
    logger.info("data exception -----------" + data);
    try {
        decipher = crypto.createDecipher('aes-128-ecb', key);
        chunks = [];
        chunks.push(decipher.update(new Buffer(
                data, 'base64').toString('binary')));
        chunks.push(decipher.final('binary'));
        output = chunks.join('');
        decrypted = (new Buffer(output, 'binary').toString('utf-8')).toString();
        return callback(null, decrypted);
    } catch(ex) {
		logger.info("DecryptAES128 exception -----------" + ex);
        return callback(ex);
    }
    
}

function encrypt(secret, data) {
    var cipher = crypto.createCipher('aes-256-cbc', secret);
    cipher.setAutoPadding(false);
    var ciphertext = '';
    for (var i=0; i < data.length; i+=16) {
        ciphertext += cipher.update(data.substr(i, i+16), 'utf8', 'base64');
    }
    return ciphertext.toString('base64');
}

function decrypt(secret, data, callback) {
    var decipher = crypto.createDecipher('aes-256-cbc', secret);
    decipher.setAutoPadding(false);
    var plaintext = decipher.update(ciphertext, 'base64', 'utf8');
    return plaintext.toString('utf8');
}


function prepareUpdateQuery(listOfItems, listOfUploadedFileInfo) {
	
	var isRemoveFlag = false;
    var sqlUpdateStmt = "UPDATE `OnlineFittingKit`.`MetaDataOfOFK` SET ";
	var whereCondition = " WHERE Id IN( ";
    var fileIdFieldStr = " fileId = CASE ";
    var URLFieldStr = "URL = CASE ";
	var fileNameFieldStr = " fileName = CASE ";
	var mimeTypeFieldStr = " mimeType = CASE ";
	var removeFieldStr = "isRemoved = CASE ";
	var idStr = " WHEN Id = "
	var counter = 0;
	logger.info('listOfItems- ' + listOfItems.length);
			for (var key in listOfItems) {
				logger.info('counter  prepareUpdateQuery prepareUpdateQuery prepareUpdateQuery- ' + counter);
				var uplaodedObj = listOfItems[key];
				logger.info('counter  uplaodedObj uplaodedObj uplaodedObj- ',JSON.stringify(uplaodedObj));
				logger.info('uplaodedObj - ' + JSON.stringify(uplaodedObj));
				
					if(uplaodedObj.isRemoved && uplaodedObj.metaDataId != -1){
						
						var multipartData = listOfUploadedFileInfo[counter];
						
						logger.info('multipartData - ' + multipartData);
						if(multipartData){
						
							fileIdFieldStr = fileIdFieldStr + idStr + uplaodedObj.metaDataId + "  THEN '" +  multipartData.id + "' ";
							
							URLFieldStr = URLFieldStr + idStr + uplaodedObj.metaDataId  + " THEN '" + multipartData.URL + "' ";
							
							fileNameFieldStr = fileNameFieldStr + idStr + uplaodedObj.metaDataId + " THEN '" + multipartData.name + "' ";
							
							mimeTypeFieldStr = mimeTypeFieldStr + idStr + uplaodedObj.metaDataId + " THEN '" + multipartData.mimeType + "' ";
							logger.info('uplaodedObj.isRemoved ---- ' + uplaodedObj.isRemoved);
							
							if(uplaodedObj.isRemoved){
								isRemoveFlag = true;
								removeFieldStr = removeFieldStr + idStr + uplaodedObj.metaDataId + " THEN '" + 0 + "' ";
								logger.info('Inside If---removeFieldStr '+removeFieldStr);
							}
							
							whereCondition = whereCondition + uplaodedObj.metaDataId + ",";
						}
						counter++;
					}//end of if
					
			}//end of for
			
			fileIdFieldStr = fileIdFieldStr + " END ,";
			URLFieldStr = URLFieldStr + " END ,";
			fileNameFieldStr = fileNameFieldStr + " END ,";
			
			if(isRemoveFlag){
				mimeTypeFieldStr = mimeTypeFieldStr + " END ,";
				removeFieldStr = removeFieldStr + " END ";
				
				sqlUpdateStmt =  sqlUpdateStmt + fileIdFieldStr + URLFieldStr + fileNameFieldStr + mimeTypeFieldStr + removeFieldStr;
			}else{
				mimeTypeFieldStr = mimeTypeFieldStr + " END";
				sqlUpdateStmt =  sqlUpdateStmt + fileIdFieldStr + URLFieldStr + fileNameFieldStr + mimeTypeFieldStr;
			}
			
            whereCondition =  whereCondition.replace(/.$/,")"); 
            logger.info('whereCondition **************** - ' + whereCondition);

			sqlUpdateStmt =  sqlUpdateStmt + whereCondition;
    
            logger.info('sqlUpdateStmt sqlUpdateStmt- ' + sqlUpdateStmt);
			logger.info('counter corelibs **************** - ' + counter);
    
            
	if(counter > 0)
		return sqlUpdateStmt;
	else
		return 'zero';
}


function prepareInsertQuery(listOfItems, listOfUploadedFiles, noOfFiles,userId, inputObj) {
 
	  var isInsertStmtExist = false;
	  var sqlInsertStmt = "INSERT INTO `OnlineFittingKit`.`MetaDataOfOFK`(`userId`,`typeId`,`fileId`,`displayOrder`,`typeOfMeasurement`,`fileName`,`URL`,`mimeType`,`createdBy`) values ";
    logger.info('listOfUploadedFiles prepareInsertQuery corelibs **************** - ' + listOfUploadedFiles);
    logger.info('listOfItems prepareInsertQuery corelibs **************** - ' + JSON.stringify(listOfItems));
		var counter = 0;
		//loop to prepare insert statement of multiple rows to be inserted
		for (var key in listOfItems) {
		  
		  var uplaodedObj = listOfItems[key];
		  logger.info('uplaodedObj corelibs prepareInsertQuery**************** - ' + JSON.stringify(uplaodedObj));
		  if((uplaodedObj.metaDataId == -1 || uplaodedObj.isChanged) && uplaodedObj.isUploaded){
			  
		   var multipartData = listOfUploadedFiles[counter];
			  logger.info('multipartData **************** - ' + JSON.stringify(multipartData));
		   //preparing insert statement values
		   if(counter != (noOfFiles -1)){
			sqlInsertStmt = sqlInsertStmt + 
			 "( "+userId+" , " + inputObj.typeId + ",'" + multipartData.id + "'," + uplaodedObj.index + "," + inputObj.typeOfMeasurement + ",'" + multipartData.name + "','" + multipartData.URL + "','" + multipartData.mimeType + "'," +userId + "),"; 
		   }else{
			sqlInsertStmt = sqlInsertStmt + 
			 "( "+userId+" , " + inputObj.typeId + ",'" + multipartData.id + "'," + uplaodedObj.index + "," + inputObj.typeOfMeasurement + ",'" + multipartData.name + "','" + multipartData.URL + "','" + multipartData.mimeType + "'," +userId + ")"; 
		   }
		   logger.info('prepareInsertQuery sqlInsertStmt **************** - ' + sqlInsertStmt);
		   isInsertStmtExist = true;
		   
		  }else if(!isInsertStmtExist){
		    isInsertStmtExist = false;
		  }
		  
		  if(uplaodedObj.isUploaded)
			counter++;
		  
		 }//end of for loop
		 
		 logger.info('prepared Insert Statement is  ---- ' + isInsertStmtExist);
		 
		 if(isInsertStmtExist)
		  return sqlInsertStmt;
		 else
		  return 'zero';
		
}

function prepareInsertQueryForHairStyleUploads(listOfItems, noOfFiles, userId, inputObj) {
 
	  var isInsertStmtExist = true;
	  var sqlInsertStmt = "INSERT INTO `OnlineFittingKit`.`MetaDataOfOFK`(`userId`,`typeId`,`fileId`,`displayOrder`,`typeOfMeasurement`,`fileName`,`URL`,`mimeType`,`createdBy`) values ";
	logger.info('noOfFiles corelibs **************** - ' + noOfFiles);
	
		//loop to prepare insert statement of multiple rows to be inserted
		for (var key in listOfItems) {
		  
		  var uplaodedObj = listOfItems[key];
		  logger.info('uplaodedObj corelibs **************** - ' + JSON.stringify(uplaodedObj));
		  if(uplaodedObj.metaDataId == -1 || !uplaodedObj.metaDataId){
			  
		   var multipartData = noOfFiles[noOfFiles.length - 1];
			  
		   //preparing insert statement values
		   if(key != (noOfFiles -1)){
			sqlInsertStmt = sqlInsertStmt + 
			 "( "+userId+" , " + inputObj.typeId + ",'" + multipartData.id + "'," + uplaodedObj.index + "," + inputObj.typeOfMeasurement + ",'" + multipartData.name + "','" + multipartData.URL + "','" + multipartData.mimeType + "'," +userId + ")"; 
		   }else{
			sqlInsertStmt = sqlInsertStmt + 
			 "( "+userId+" , " + inputObj.typeId + ",'" + multipartData.id + "'," + uplaodedObj.index + "," + inputObj.typeOfMeasurement + ",'" + multipartData.name + "','" + multipartData.URL + "','" + multipartData.mimeType + "'," +userId + ")"; 
		   }
		   isInsertStmtExist = true;
		   
		  }else{
		   isInsertStmtExist = false;
		  }
		 }//end of for loop
		 
		 logger.info('prepared Insert Statement is  ---- ' + isInsertStmtExist);
		 
		 if(isInsertStmtExist)
		  return sqlInsertStmt;
		 else
		  return 'zero';
		
}

exports.logger = logger;
exports.CloneObjectUsingTemplate = cloneObjectUsingTemplate;
exports.GenerateEncryptedPassword = GenerateEncryptedPassword;
exports.ComparePasswordWithDBPassword = ComparePasswordWithDBPassword;
exports.GenerateRandomPassword = GenerateRandomPassword;
exports.GetFileExtensionFromPath = GetFileExtensionFromPath;
exports.DeleteFileSynchronously = DeleteFileSynchronously;
exports.RenameFilesAsynchronously = RenameFilesAsynchronously;
exports.EncryptAES128 = EncryptAES128;
exports.DecryptAES128 = DecryptAES128;
exports.EncryptAES256 = EncryptAES256;
exports.DecryptAES256 = DecryptAES256;
exports.GetSalt = getSalt;
exports.EncryptPasswordBySalt = cryptoPasswordHash;
exports.prepareUpdateQuery = prepareUpdateQuery;
exports.prepareInsertQuery = prepareInsertQuery;
