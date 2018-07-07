'use strict';

var async = require('async');
var corelibs = require('../corelibs');
var throwError = require('../controller/throwErrors').ThrowError();
var config = require('../config');
var build = config.build;
var logger = corelibs.logger;
var errorCodes = config.ErrorCodes;
var constants = config.Constants;
var multer  = require('multer');

var Dal = require('../dal');

var GoogleDrive = build.Environment[build.Type].GoogleDrive;
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs');
var path = require('path');
//If modifying these scopes, delete your previously saved credentials
//at ~/.credentials/drive-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/drive'];
//var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
 //process.env.USERPROFILE) + '/.credentials/';
 var TOKEN_DIR = process.cwd() + '\\.credentials\\';
 
var TOKEN_PATH = TOKEN_DIR + 'uploadFiles.json';
var stream = require('stream');

var mandatoryToRead = {
    userId : 1
};

/**
 * @method FileUploadTransactor
 * @description: is a class that can handle all the http verb operations under
 * this route
 */
function CommonFileUpload() {}

		   
//file upload to google drive
/**
 * @class CommonFileUpload
 * @method CREATE
 * @description: it can handle http verb POST operations
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns either it will throw an error or suitable response
 */
 function getGoogleDriveAuthInfo(callback) {
	
	
		logger.info('TOKEN_DIR:', TOKEN_DIR);
		
		return fs.readFile('client_secret.json', function processClientSecrets(err, content) {
			 if (err) {
			   console.log('Error loading client secret file: ' + err);
			   return;
			 }
			 // Authorize a client with the loaded credentials, then call the
			 // Drive API.
			 authorize(JSON.parse(content), callback);
		}); // end of readFile	
		   

		   
			
		// Authorize a client with the loaded credentials, then call the
		function authorize(credentials, callback) {
			 var clientSecret = credentials.installed.client_secret;
			 var clientId = credentials.installed.client_id;
			 var redirectUrl = credentials.installed.redirect_uris[0];
			 var auth = new googleAuth();
			 var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
				logger.info('TOKEN_PATH :', TOKEN_PATH);
			 // Check if we have previously stored a token.
			fs.readFile(TOKEN_PATH, function(err, token) {
			   if (err) {
				logger.info('authorize error:', err);
				 getNewToken(oauth2Client, callback);
			   } else {
				 logger.info('authorize not error:', JSON.stringify(token));
				 oauth2Client.credentials = JSON.parse(token);
				 callback(oauth2Client);
			   }
			});
		}	// end of authorize	


		// Generate new token
		function getNewToken(oauth2Client, callback) {
			 var authUrl = oauth2Client.generateAuthUrl({
			   access_type: 'offline',
			   scope: SCOPES
			 });
			 console.log('Authorize this app by visiting this url: ', authUrl);
			 var rl = readline.createInterface({
			   input: process.stdin,
			   output: process.stdout
			 });
			 rl.question('Enter the code from that page here: ', function(code) {
			   rl.close();
			   oauth2Client.getToken(code, function(err, token) {			
				
				 if (err) {
				   //console.log('Error while trying to retrieve access token', err);
				   return;
				 }
				 console.log('token', JSON.stringify(token));
				 oauth2Client.credentials = token;
				 storeToken(token);
				 callback(oauth2Client);
			   });
			 });
		} // end of getNewToken
		 
		// Store if token is new
		function storeToken(token) {
			 try {
			   fs.mkdirSync(TOKEN_DIR);
			 } catch (err) {
			   if (err.code != 'EEXIST') {
				 throw err;
			   }
			 }
			  console.log('Token stored to ' + TOKEN_PATH);
			 fs.writeFile(TOKEN_PATH, JSON.stringify(token));
		} // end of storeToken
		
	
	
};// end of getGoogleDriveAuthInfo

function uploadFileToGoogleDrive(folderId, parentId, file, base64data,callback) {
	var folderId = folderId;
	getGoogleDriveAuthInfo(function (auth) {
		var drive = google.drive({ version: 'v3', auth: auth });
		//var folderId = GoogleDrive.FOLDERID;//gather@hairdirect.com
		
		console.log("folderId folderId  uploadFileToGoogleDrive- "+ folderId);
		//var folderId = '0B8o67I-qWFvLbG80UmM1dXNtMmc'; //hdofk@gmail.com
			/*drive.files.create({
				resource: {
					mimeType: 'application/vnd.google-apps.folder',
					title: 'Gather',
					name : 'Gather'
				}
			},function(err,response){
				logger.info('response :', JSON.stringify(response));
					return;
				
			});*/
			
			//uploading file to driver
			drive.files.create({resource: {
				name : file.originalname,
				parents: [ folderId ],
				title: "OFK",
				mimeType: file.mimetype
			  },
			  media: {
					mimeType: file.mimetype,
					body:  fs.createReadStream(file.path)
			  }}, function (err, response) {
				logger.info('response uploadFileToGoogleDrive:', JSON.stringify(response));
				logger.info('err :', JSON.stringify(err));
				if(err){
					if(err.statusCode = 'ECONNREFUSED'){
						logger.info('err ECONNREFUSED:', JSON.stringify(err));
						callback(null,response)
					}
				}
				else{
					//fs.unlinkSync(file.path); //delete the uploaded file from local
							
					response.URL= "https://drive.google.com/uc?export=view&id="+response.id;
					return callback(err,response);
				}
				
				
			});
	});
		
};// end of uploadFileToGoogleDrive


function trashFileFromGoogleDrive(fileId,fileName,callback) {
		
		getGoogleDriveAuthInfo(function (auth) {
			var drive = google.drive({ version: 'v3', auth: auth });
			
			drive.files.update({
				resource: {
					fileId : fileId,
					name : fileName,
					trashed: true
				}
			}, function (err, response) {
					logger.info('response :', JSON.stringify(response));
					logger.info('err :', JSON.stringify(err));
					
					return callback(err,response);
					
			});
			
		});
};// end of trashFileFromGoogleDrive

function createFolder(folderName,folderTitle,callback) {
	logger.info("uploadedAttachment createFolder- ");
		getGoogleDriveAuthInfo(function (auth) {
			var drive = google.drive({ version: 'v3', auth: auth });
			var folderId = GoogleDrive.FOLDERID;//gather@hairdirect.com
			drive.files.create({
				resource: {
					mimeType: 'application/vnd.google-apps.folder',
					parents: [ folderId ],
					title: folderTitle,
					name : folderName
				}
			},function(err,response){
				//renameFile("1Uv9w048L1rio9CJbHZ8xvKdga0ssvk0K", "renameFolderFromAPP-1", auth);
				return callback(err,response);
			});
			
		});
};// end of createFolder



function uploadFile(sourceId, parentId, file, base64data,userId, callback) {
	var objUser = new Dal.Users();
	logger.info("uploadFile - userId"+userId);
	var folderId = "";
	var userObj = {};
	userObj.userId = userId;
	async.waterfall([
		//get the User details 
		function(callback){
			objUser.ExecuteProcedure(sps.UserDetails, mandatoryToRead,
				[ userObj ], function(err, dbResponse) {
				logger.info('err - ' + JSON.stringify(err));
				if (err) {
					return callback(err, dbResponse, {
						Message: err.message,
						ErrorCode: errorCodes.InternalError
					});
				}
				var record = dbResponse.Record;
										
				if (!record.isSuccess) {
					return res.end(JSON.stringify(dbResponse.Record));
				}
				
				if (record.isSuccess) {
					var responseData = {}
					responseData = dbResponse.Tables[0][0];
					logger.info('uploadFile dbResponse responseData- ' + JSON.stringify(responseData));

					folderId = responseData.driveFolderId;

					return callback(null,folderId); 
				}
		});
		},function(responseData, callback){
			logger.info('uploadFile folderName responseData-- ' + JSON.stringify(folderId));
			logger.info('uploadFile sourceId - ' + JSON.stringify(sourceId));
			if(sourceId == 2){
				uploadFileToGoogleDrive(folderId, parentId, file, base64data, function(err, response){
					/*if(!response){
						uploadFileToGoogleDrive(folderId, parentId, file, base64data, function(err, response){
							callback(null, response);
						})
					}else{
						callback(null, response);
					}*/
					callback(null, response);
				});
			}
		}
	], function(err, responseData) {
		logger.info('responseData - ' + JSON.stringify(responseData));
		callback(null,responseData);
	})
	
	
}

//delete file 
function deleteFile(fileId, callback){
	
	getGoogleDriveAuthInfo(function (auth) {
	var drive = google.drive({ version: 'v3', auth: auth });
		drive.files.delete({
			'fileId' : fileId
		},function(err,response){
			logger.info('deleteFile  deleteFile deleteFile- ' + JSON.stringify(err));
			logger.info('deleteFile  deleteFile response- ' + JSON.stringify(response));
			return callback(err,response);
		});
	});
}


/**
 * Rename a file.
 *
 * @param {String} fileId <span style="font-size: 13px; ">ID of the file to rename.</span><br> * @param {String} newTitle New title for the file.
 */
function renameFile(fileId, newTitle, callback) {
	var body = {'title': newTitle};

	getGoogleDriveAuthInfo(function (auth) {
		var drive = google.drive({ version: 'v3', auth: auth });
		logger.info('Rename File Error - ' + JSON.stringify( newTitle ));
		drive.files.update({
		  'fileId': fileId,
		  'resource': {'name': newTitle}
		},function(err, response){
			logger.info('Rename File Error - ' + JSON.stringify(err));
			logger.info('Rename File response- ' + JSON.stringify(response));
			return callback(err,response);
		});
	})

  }

//exports.uploadToGoogleDrive = uploadToGoogleDrive;
exports.uploadFile = uploadFile;
exports.trashFileFromGoogleDrive = trashFileFromGoogleDrive;
exports.createFolder = createFolder;
exports.deleteFile = deleteFile;
exports.renameFile = renameFile;