'use strict';

var corelibs = require('../corelibs');
var _ = require('underscore');
var logger = corelibs.logger;
var JsonValidater = corelibs.JsonValidater;
var throwError = require('../controller/throwErrors').ThrowError();
var config = require('../config');

var createTemplate = {
	firstName : true,
	lastName : true,
	email : true,
    dateOfBirth : true,
	gender : true,
	password : true,
    accountType : true
	
};

var updateTemplate = {
    firstName : false,
    lastName : false,
    email : false,
	password : false,
	isHairSystemExists : false,
	representerType : false,
	userType : false,
	gender: false,
	dob: false,	
	country: false,
	isAtStep : true,
	userId : true,
	nextView : true
};


/**
 * @method UserProfileValidator
 * @description: is a class that can 
 * handle all the http verb operations(data type validations) under this route
 */
function UserProfileValidator() {

}

/**
 * @class UserProfileValidator
 * @method CREATE
 * @description: it can handle http verb POST operations(data type validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
UserProfileValidator.prototype.CREATE =
    function UserProfileValidatorCreate(req, res, next) {
    var errors, validator = new JsonValidater();
	
	//validating json 
    validator.validateJson(createTemplate, req.body);
	//Extracting json errors if any
    errors = validator.getAllErrors();
	
	//if errors throw bad request
    if (!_.isEmpty(errors)) {
        req.ErrorMessage = 'UserProfileValidatorCreate error - ' +  errors.join('; ')
        logger.error(req.ErrorMessage);
        return throwError.BadRequest(req, res, next);
    }
    
	
	
	req.body.inputBody = corelibs.CloneObjectUsingTemplate(createTemplate, req.body);	
	logger.debug('req.body - done...' + JSON.stringify(req.body));	
	logger.debug('CloneObjectUsingTemplate - done...' + JSON.stringify(req.body.inputBody));
    return next();
};



/**
 * @class UserProfileValidator
 * @method UPDATE
 * @description: it can handle http verb POST operations(data type validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
UserProfileValidator.prototype.UPDATE =
    function UserProfileValidatorUpdate(req, res, next) {
    var errors, validator = new JsonValidater(),sfInput = {};
	var user = req.body;
	logger.debug('user ...' + JSON.stringify(user));
	var hairSystem,representer__c;
    validator.validateJson(updateTemplate, req.body);
    errors = validator.getAllErrors();
	
    if (!_.isEmpty(errors)) {
        req.ErrorMessage = 'UserProfileValidatorCreate error - ' +  errors.join('; ')
        logger.error(req.ErrorMessage);
        return throwError.BadRequest(req, res, next);
    }
	
	//getting type of hair worn
	/*if (typeof user.isHairSystemExists !== 'undefined' && user.isHairSystemExists !== null){
		if(user.isHairSystemExists == -1)
			hairSystem = "I’ve never worn a hair system";
		else if(user.isHairSystemExists == 1)
			hairSystem = "I currently wear a hair system";
		else
			hairSystem = "I’ve worn a hair system in the past";
	}*/
	if(user.isHairSystemExists == -1)
		hairSystem = "I’ve never worn a hair system";
	else if(user.isHairSystemExists == 1)
		hairSystem = "I’ve never worn a hair system";
	else if(user.isHairSystemExists == 2)
		hairSystem = "I currently wear a hair system";
	else if(user.isHairSystemExists == 3)
		hairSystem = "I’ve worn a hair system in the past";
	
	if(user.representerType == 5 && user.userType)
		representer__c = "SPOUSE";
	else if(user.representerType == 6 && user.userType)
		representer__c = "PARENT";
	else if(user.representerType == 7 && user.userType)
		representer__c = "FRIEND OR LOVED ONE";
	else if(user.representerType == 8 && user.userType)
		representer__c = "HAIR STYLIST";
	else
		representer__c = "SELF";
	
	
	
	//preparing input body to be used for sales force	
	if(user.SFUpdateSkip)
		sfInput.SFUpdateSkip = true;
	sfInput.Id = user.accountId;
	//logger.debug("!user.dob - "+ !user.dob);
	if(!user.firstName)
		user.firstName = "";
	else
		sfInput.First_Name__c = user.firstName;
		
	if(!user.lastName)
		user.lastName = "";
	else
		sfInput.Last_Name__c = user.lastName;
	
	if(!user.email)
		user.email = "";
	else{
		sfInput.Email__c = user.email;
		sfInput.Username__c = user.email;
	}
	if(!user.password) //need to update 
		user.password = "";
	else
		sfInput.password = user.password;
	
	if(!user.isHairSystemExists)
		user.isHairSystemExists = -1;
	else
		sfInput.IsHairSystemExists__c = hairSystem;
	
	if(!user.representerType)
		user.representerType = "-1";
	else
		sfInput.Representer__c = representer__c;
		
	if(!user.userType){
		if(user.userType != false)
			user.userType = -1;
	}else{
		if(user.userType == 1)
			sfInput.TypeOfUser__c = true;
		else if(user.userType == 0)
			sfInput.TypeOfUser__c = true;
		else
			sfInput.TypeOfUser__c = user.userType;
	}
	
	if(!user.gender){
		user.gender = "";
	}else{
		if(user.gender == 1)
			sfInput.Gender__c = 'Male';
		else if(user.gender == 2)
			sfInput.Gender__c = 'Female';
		else if(user.gender == 3)
			sfInput.Gender__c = 'MTF';
		else if(user.gender == 4)
			sfInput.Gender__c = 'FTM';
	}
		
	if(!user.dob)
		user.dob = "";
	else
		sfInput.Birthdate__c = user.dob;
	
	if(!user.country)
		user.country = "";
	else
		sfInput.Country__c = user.country;
		
	req.body.sfInput = sfInput; //assign sfInput
	//assigning body to inputBody
	logger.debug('sfInput ...' + JSON.stringify(sfInput));
	
	req.body.inputBody = corelibs.CloneObjectUsingTemplate(updateTemplate, req.body);
	logger.debug('inputBody ...' + JSON.stringify(req.body.inputBody));
	logger.debug('UserProfileValidatorUpdate - done...');
	
	return next();
};
/**
 * @class UserProfileValidator
 * @method READ
 * @description: it can handle http verb GET operations(data type validations)
 * @param req is a request object
 * @param res is a response object
 * @param next is a next function that will execute after this
 * @returns  either it will throw an error or returns 
 * next function that needs to be executed after this
 */
UserProfileValidator.prototype.READ =
    function UserProfileValidatorRead(req, res, next) {
    req.body.user = {};
    logger.debug('UserProfileValidatorRead - done...');
    return next();
};
module.exports = UserProfileValidator;