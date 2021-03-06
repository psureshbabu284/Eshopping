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

var Drive = build.Environment[build.Type].GoogleDrive;
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


/**
 * @method FileUploadTransactor
 * @description: is a class that can handle all the http verb operations under
 * this route
 */
function CommonFileUpload() {}



		   
//file upload to google drive
	function getGoogleDriveAuthInfo(callback){
	
	logger.info('TOKEN_DIR:', TOKEN_DIR);
	
	return fs.readFile('client_secret.json', function processClientSecrets(err, content) {
		 if (err) {
		   console.log('Error loading client secret file: ' + err);
		   return;
		 }
		 // Authorize a client with the loaded credentials, then call the
		 // Drive API.
		 authorize(JSON.parse(content), callback);
    });
	   

	   
		
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
	}		


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
			   console.log('Error while trying to retrieve access token', err);
			   return;
			 }
			 console.log('token', JSON.stringify(token));
			 oauth2Client.credentials = token;
			 storeToken(token);
			 callback(oauth2Client);
		   });
		 });
	}
	 
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
	}

	
}	


exports.getGoogleDriveAuthInfo = getGoogleDriveAuthInfo;
