'use strict';

/**
 * @method Validator
 * @description: here we are extending validator for custom validation!
 */

// TODO: modify validations
var validator = require('validator');

/**
 * Checking given string length is at least 1
 */
validator.extend('notEmpty', function(str) {
    return this.isLength(str, 1);
});

/**
 * First Name is a case insensitive contains at least one letter allowing space
 * and length should be between 1 to 50
 */
validator.extend('isFirstName', function(str) {
    //var regex =/^(?=.*[A-Z])[A-Z\s]{1,50}$/i;
    //return regex.test(str);
    return this.notEmpty(str);
});

/**
 * Last Name is a case insensitive contains at least one letter allowing space
 * and length should be between 1 to 50
 */
validator.extend('isLastName', function(str) {
    //    var regex =/^(?=.*[A-Z])[A-Z\s]{1,50}$/i;
    //    return regex.test(str);
    return this.notEmpty(str);
});

/**
 * Password Must Contains at least one special character in !@#$%^&* at least
 * one digit at least one lower case letter at least one upper case letter and
 * length should be between 4 to 8
 */
validator.extend('isPassword', function(str) {
    //var regex = /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{4,8}$/i;//alphanumeric
    //var regex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
    //return regex.test(str);
    return this.notEmpty(str);
});

/**
 * New Password Must Contains at least one special character in !@#$%^&* at
 * least one digit at least one lower case letter at least one upper case letter
 * and length should be between 4 to 8
 */
validator.extend('isNewPassword', function(str) {
    //var regex = /^(?=.*[A-Z])(?=.*\d)[A-Z0-9]{4,8}$/i;//alphanumeric
    //var regex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
    //return regex.test(str);
    return this.notEmpty(str);
});

/**
 * User Name is an Email
 */
validator.extend('isUserName', function(str) {
    return this.isEmail(str);
});

/**
 * Group Name is a case insensitive contains at least one letter allowing space
 * and length should be between 1 to 50
 */
validator.extend('isGroupName', function(str) {
    //    var regex =/^(?=.*[A-Z])[A-Z\s]{1,50}$/i;
    //    return regex.test(str);
    return this.notEmpty(str);
});

/**
 * Group ID is Number
 */
validator.extend('isGroupID', function(str) {
    return this.notEmpty(this.trim(str)) && this.isNumeric(str);
});

/**
 * User ID is Number
 */
validator.extend('isUserID', function(str) {
    return this.notEmpty(this.trim(str)) && this.isNumeric(str);
});
/**
 * Query is a case insensitive contains at least one letter allowing space and
 * length should be between 1 to 50
 */
validator.extend('isQuery', function(str) {
    //    var regex =/^(?=.*[A-Z])[A-Z\s]{1,50}$/i;
    //    return regex.test(str);
    return this.notEmpty(str);
});

/**
 * SearchType is a case insensitive and it is of type contact or
 */
validator.extend('isSearchType', function(str) {
    var regex = /^(contact)$/i;
    return regex.test(str);
});

/**
 * Type is either added or sent
 */
validator.extend('isType', function(str) {
    var regex = /^(added|sent)$/i;
    return regex.test(str);
});

/**
 * HistoryType is either VIDEO or USER
 */
validator.extend('isHistoryType', function(str) {
    var regex = /^(record|video|user)$/i;
    return regex.test(str);
});

/**
 * Video Name is a alphanumeric of length between 1 to 50 contains at least one
 * character
 */
validator.extend('isVideoName', function(str) {
    //    var regex =/^(?=.*[A-Z])[A-Z\s\d]{1,50}$/i;
    //    return regex.test(str);
    return this.notEmpty(str);
});

/**
 * VideoID is number field
 */
validator.extend('isVideoID', function(str) {
    return this.notEmpty(this.trim(str)) && this.isNumeric(str);
});

/**
 * HistoryID is number field
 */
validator.extend('isHistoryID', function(str) {
    return this.notEmpty(this.trim(str)) && this.isNumeric(str);
});

/**
 * Subject is a case insensitive contains at least one letter allowing space and
 * length should be between 1 to 50
 */
validator.extend('isSubject', function(str) {
    //    var regex =/^(?=.*[A-Z])[A-Z\s]{1,50}$/i;
    //    return regex.test(str);
    return this.notEmpty(str);
});

/**
 * Message length should be between 1 to 200
 */
validator.extend('isMessage', function(str) {
    //return this.isLength(str, 1, 200);
    return this.notEmpty(str);
});

/**
 * Group a Comma separated numbers contains at least one number
 */
validator.extend('isGroup', function(str) {
    var regex = /^(?=.*\d)[\d\s/,]+$/;
    return regex.test(str);
});

/**
 * EmailVerificationCode is a Base 64 string
 */
validator.extend('isEmailVerificationCode', function(str) {
    return this.isBase64(str);
});

/**
 * phone number Should consist of 10 digits
 */
validator.extend('isPhone', function(str) {
    return this.notEmpty(str);
});

/**
 * Skype should be given , it is a string
 */
validator.extend('isSkype', function(str) {
    return this.notEmpty(str);
});

/**
 * Address should be given, it is a string
 */
validator.extend('isAddress', function(str) {
    return this.notEmpty(str);
});

/**
 * Other should be given, it is a string
 */
validator.extend('isOther', function(str) {
    return this.notEmpty(str);
});

/**
 * Video is a Base 64 string
 */
validator.extend('isVideo', function(str) {
    return this.isBase64(str);
});

/**
 * SkinName is the name assigned for custom video player skin ,it is a string
 */
validator.extend('isSkinName', function(str) {
    return this.notEmpty(str);
});

/**
 * Dimension specifies the custom dimension of the video player
 */
validator.extend('isDimension', function(str) {
    return this.notEmpty(str);
});

/**
 * AutoPlay is option in video player [true or false], it is a Boolean Value
 */
validator.extend('isIsAutoPlay', function(str) {
    return this.notEmpty(str);
});

/**
 * Sharing is option in video player [true or false], it is a Boolean value
 */
validator.extend('isIsSharing', function(str) {
    return this.notEmpty(str);
});

/**
 * Question is an string
 */
validator.extend('isQuestion', function(str) {
    return this.notEmpty(str);
});

/**
 * Answer is an string
 */
validator.extend('isAnswer', function(str) {
    return this.notEmpty(str);
});

/**
 * FAQID is integer
 */
validator.extend('isFAQID', function(str) {
    return this.isNumeric(str);
});

/**
 * SubscriptionID is integer
 */
validator.extend('isSubscriptionID', function(str) {
    return this.isNumeric(str);
});

/**
 * Subscription is String Used in Subscription route
 */
validator.extend('isSubscription', function(str) {
    return this.notEmpty(str);
});

/**
 * Amount is integer
 */
validator.extend('isAmount', function(str) {
    return this.isNumeric(str);
});

/**
 * Currency is integer
 */
validator.extend('isCurrency', function(str) {
    return this.notEmpty(str);
});

/**
 * SubscriptionIDs is an integer separated by comma and the length between 1 to
 * 50
 */
validator.extend('isSubscriptionIDs', function(str) {
    var regex = /^(?=.*\d)[\d,]{1,999}$/;
    return regex.test(str);
});

/**
 * Feature is an string
 */
validator.extend('isFeature', function(str) {
    return this.notEmpty(str);
});

/**
 * FeatureID is an integer
 */
validator.extend('isFeatureID', function(str) {
    return this.isNumeric(str);
});

/**
 * Delete is String, either All|Subscription|Feature
 */
validator.extend('isDelete', function(str) {
    var regex = /^(All|Subscription|Feature)$/i;
    return regex.test(str);
});

/**
 * Start is an integer
 */
validator.extend('isStart', function(str) {
    return this.isNumeric(str);
});

/**
 * Count is an integer
 */
validator.extend('isCount', function(str) {
    return this.isNumeric(str);
});

/**
 * CustomerID is a string used in company module
 */
validator.extend('isCustomerID', function(str) {
    return this.notEmpty(str);
});

/**
 * CompanyName is a string used in company module
 */
validator.extend('isCompanyName', function(str) {
    return this.notEmpty(str);
});

/**
 * IsLifeTime is a boolean value used in company
 */
validator.extend('isIsLifeTime', function(str) {
    return this.notEmpty(str);
});

/**
 * AppKey is a string used in reports module
 */
validator.extend('isAppKey', function(str) {
    return this.notEmpty(str);
});

/**
 * notificationType is a string , to specify the type of notification in
 * delivery status notification of Amazon SNS
 */
validator.extend('isnotificationType', function(str) {
    var regex = /^(Delivery|Bounce|Complaint)$/i;
    return regex.test(str);
});

/**
 * messageId is a string used in reports module
 */
validator.extend('ismessageId', function(str) {
    return this.notEmpty(str);
});

/**
 * timestamp is a string & used in reports module
 */
validator.extend('istimestamp', function(str) {
    return this.notEmpty(str);
});

/**
 * source is a string & used in reports module
 */
validator.extend('issource', function(str) {
    return this.isEmail(str);
});

/**
 * reportingMTA is a string & used in reports module
 */
validator.extend('isreportingMTA', function(str) {
    return this.notEmpty(str);
});

/**
 * smtpResponse is a string & used in reports module
 */
validator.extend('issmtpResponse', function(str) {
    return this.notEmpty(str);
});

/**
 * processingTimeMillis is a string used in reports module
 */
validator.extend('isprocessingTimeMillis', function(str) {
    return this.notEmpty(str);
});

/**
 * bounceType is a string used in reports module
 */
validator.extend('isbounceType', function(str) {
    return this.notEmpty(str);
});

/**
 * bounceSubType is a string used in reports module
 */
validator.extend('isbounceSubType', function(str) {
    return this.notEmpty(str);
});

/**
 * feedbackId is a string used in reports module
 */
validator.extend('isfeedbackId', function(str) {
    return this.notEmpty(str);
});

/**
 * LinkedIn ID is a alphanumeric value with _ and -
 */
validator.extend('isLinkedInID', function(str) {
    var regex = /^[\w-]{10}$/; 
    return regex.test(str);
});

/**
*FromDate is integer & used in reports module
*/
validator.extend('isFromDate', function(str) {
    var dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    return this.notEmpty(str) && dateFormat.test(str);
});


/**
*ToDate is a integer & used in reports module
*/
validator.extend('isToDate', function(str) {
    var dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    return this.notEmpty(str) && dateFormat.test(str);
});

/**
* Signature is being used in signature module & not empty 
*/
validator.extend('isSignature', function(str){
    return this.notEmpty(str);
});

/**
 * IsEnabled is a boolean value used in company
 */
validator.extend('isIsEnabled', function(str) {
    return this.notEmpty(str);
});

/**
 * ContactID is a integer value used in contact route
 */
validator.extend('isContactID', function(str) {
    return this.notEmpty(str);
});


/**
 * TemplateID is a integer value used in contact route
 */
validator.extend('isTemplateID', function(str) {
    return this.notEmpty(str);
});

/**
 * TemplateName is a integer value used in contact route
 */
validator.extend('isTemplateName', function(str) {
    return this.notEmpty(str);
});


/**
 * VideoArray is used in VideoTemplates for multiple videoID Inputs !
 */
validator.extend('isVideoIDArray', function(str) {
    var regex = /^(?=.*\d)[\d,]{1,999}$/;
    return regex.test(str);
});


/**
 * IsBeforeArray is used in VideoTemplates for multiple IsBeforeArray Inputs !
 */
validator.extend('isIsBeforeArray', function(str) {
    var regex = /^(?=.*\d)[\d,]{1,999}$/;
    return regex.test(str);
});


/**
 * VideoCount is used in VideoTemplates to specify the count of Videos Inserted!
 */
validator.extend('isVideoCount', function(str) {
    return this.notEmpty(str);
});

/**
 * IsTemplate is a boolean value used in company
 */
validator.extend('isIsTemplate', function(str) {
    return this.notEmpty(str);
});

/**
 * IsAssigned is a boolean value used in company
 */
validator.extend('isIsAssigned', function(str) {
    return this.notEmpty(str);
});

/**
 * IsBefore is a boolean value used in company
 */
validator.extend('isIsBefore', function(str) {
    return this.notEmpty(str);
});

/**
 * is_trial_period is a boolean value used in PaymentGateway
 */
validator.extend('isis_trial_period', function(str) {
    return this.notEmpty(str);
});

/**
 * quantity is a Integer value used in PaymentGateway
 */
validator.extend('isquantity', function(str) {
    return this.notEmpty(str);
});

/**
 * product_id is a String used in PaymentGateway
 */
validator.extend('isproduct_id', function(str) {
    return this.notEmpty(str);
});

/**
 * transaction_id is a Integer value used in PaymentGateway
 */
validator.extend('istransaction_id', function(str) {
    return this.notEmpty(str);
});

/**
 * original_purchase_date is a Integer value used in PaymentGateway
 */
validator.extend('isoriginal_purchase_date', function(str) {
    return this.notEmpty(str);
});

/**
 * original_purchase_date_ms is a Integer value used in PaymentGateway
 */
validator.extend('isoriginal_purchase_date_ms', function(str) {
    return this.notEmpty(str);
});

/**
 * original_purchase_date_pst is a String used in PaymentGateway
 */
validator.extend('isoriginal_purchase_date_pst', function(str) {
    return this.notEmpty(str);
});

/**
 * original_transaction_id is a String used in PaymentGateway
 */
validator.extend('isoriginal_transaction_id', function(str) {
    return this.notEmpty(str);
});

/**
 * purchase_date_pst is a String used in PaymentGateway
 */
validator.extend('ispurchase_date_pst', function(str) {
    return this.notEmpty(str);
});

/**
 * purchase_date_ms is a String used in PaymentGateway
 */
validator.extend('ispurchase_date_ms', function(str) {
    return this.notEmpty(str);
});

/**
 * purchase_date is a String used in PaymentGateway
 */
validator.extend('ispurchase_date', function(str) {
    return this.notEmpty(str);
});
