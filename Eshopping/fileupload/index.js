'use strict';

/**
 * exporting the functions/methods to outside of this module(folder)
 */
var CommonFileUpload = require('./CommonFileUpload');

exports.uploadFile = CommonFileUpload.uploadFile;
exports.trashFileFromGoogleDrive = CommonFileUpload.trashFileFromGoogleDrive;
exports.createFolder = CommonFileUpload.createFolder;
exports.deleteFile = CommonFileUpload.deleteFile;
exports.renameFile = CommonFileUpload.renameFile;
