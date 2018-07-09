'use strict';

/**
 * Server constants and exporting to access it outside of the file
 */

var constants = {
    UploadDirectory : __dirname + '/../uploads/videos/',
    UploadImagesDirectory : __dirname + '/../uploads/images/',
	StaticDirectory : __dirname + '/../public',
    ViewsDirectory : __dirname + '/../views',
    FavIcon : __dirname + '/../public/images_/favicon-32x32.png',
    JSONPayLoadLimit : '10kb', // JSON pay load limit
    SaltLength : 20,
    PBKDF2Iterations : 100,
    PBKDF2KeyLength : 17,
    PasswordLength : 10,
    SessionTime : 59, // in minutes, max: 59 min
    Numbers : '0123456789',
    LowerChars : 'abcdefghijklmnopqurstuvwxyz',
    UpperChars : 'ABCDEFGHIJKLMNOPQURSTUVWXYZ',
    SpecialChars : '!@#$%^&*',
    EncryptionKey : '^!D{0(rM',
	AESIV256 : '!QAZ2WSX#EDC4RFV',
    AESKEY256 : '5TGB&YHN7UJM(IK<5TGB&YHN7UJM(IK<',
    SFDCREQSUBSTR : '||sfdcreq'
};

module.exports = constants;
