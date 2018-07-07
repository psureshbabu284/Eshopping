ofkapp.constant('userRoleValidationMessages', {
    'invalidSelectionMessage': 'Please select any option',
	'invalidRepresenterSelectionMessage': 'Please select the representer',
	'invalidHairSystemMessage': 'Please select the hair system used previously'
});
//general max length 
ofkapp.constant('maxLengthValidationMessages', {
	'maxLengthValidMessage': 'Length exceeds 255 characters.'
});
//Sign In
ofkapp.constant('loginValidationMessages', {
    'emailRequiredMessageNotEmpty': 'Please enter your email address.',
	'emailMessageExists': 'We did not find your email address, please confirm that you entered it correctly.',
	'emailMessageValid': 'Please ensure that your email is formatted correctly.',
    'pwdlRequiredMessage': 'Please enter a password.',
	'loginValidMessage': 'Invalid login. Please try again.',
	'passwordMinMaxValidationMessage': 'Please ensure that your password is at least 6 characters in length.'
});
//Reset Password
ofkapp.constant('resetPswdValidationMessages', {
	'emailMessageExists': 'We did not find your email address, please confirm that you entered it correctly.'
});
//Create an Account
ofkapp.constant('createAccountValidationMessages', {
	'firstNameMessageNotEmpty': 'Please enter your first name.',
	'lastNameMessageNotEmpty': 'Please enter your last name.',	
	'emailRequiredMessageNotEmpty': 'Please enter your email address.',
	'emailMessageValid': 'Please ensure that your email is formatted correctly.',
	'emailMessageDoesExist': 'This email address already exists, please sign in to your existing account.',
    'pwdlRequiredMessage': 'Please enter a password.',	
	'passwordMinMaxValidationMessage': 'Please ensure that your password is at least 6 characters in length.',
	'mailTooBig' : 'Email should be less than 80 characters'
});
//Create an Account Hair Stylist
ofkapp.constant('createAccountStylistValidationMessages', {
	'firstNameStylistMessageNotEmpty': 'Please enter your customer’s first name.',
	'lastNameStylistMessageNotEmpty': 'Please enter your customer’s last name.',	
	'emailStylistRequiredMessageNotEmpty': 'Please enter your customer’s email address.',
	'emailStylistMessageValid': 'Please ensure that your customer’s email is formatted correctly.'
});
//User Role Representative Info
ofkapp.constant('userroleRepInfoValidationMessages', {
	'firstNameRepInfoMessageNotEmpty': 'Please enter your representative’s first name.',
	'lastNameRepInfoMessageNotEmpty': 'Please enter your representative’s last name.',	
	'emailRepInfoRequiredMessageNotEmpty': 'Please enter your representative’s email address.',
	'emailRepInfoMessageValid': 'Please ensure that your representative’s email is formatted correctly.'
});
//Guardian Info
ofkapp.constant('guardianInfoValidationMessages', {
	'firstNameguardInfoMessageNotEmpty': 'Please enter your guardian’s first name.',
	'lastNameguardInfoMessageNotEmpty': 'Please enter your guardian’s last name.',	
	'emailguardInfoRequiredMessageNotEmpty': 'Please enter your guardian’s email address.',
	'emailguardInfoMessageValid': 'Please ensure that your guardian’s email is formatted correctly.'
});
//Age
ofkapp.constant('ageValidationMessages', {
    'dayValidationMessage': 'Please ensure that the day listed is correct.',
    'monthValidationMessage': 'Please ensure that the month listed is correct.',
	'yearValidationMessage': 'Please ensure that the year listed is correct.',
	'belowAgeValidationMessage': 'We don’t recommend our products for your age. Please feel free to contact us to discuss this further.'
});
//Address Validation - Shipping Billing Addresses
ofkapp.constant('addressValidationMessages', {
	'firstNameMessageNotEmpty': 'Please enter your first name.',
	'lastNameMessageNotEmpty': 'Please enter your last name.',	
	'countryMessageNotEmpty' : 'Please enter your country.',
	'addressMessageNotEmpty' : 'Please enter your address.',
	'addressStreetNotEmpty' : 'Please enter your street.',
	'addressCityNotEmpty' : 'Please enter your city.',
	'addressStateNotEmpty' : 'Please enter your state.',
	'addressPostCodeNotEmpty' : 'Please enter your postcode.',
	'addressBuildingNotEmpty' : 'Please enter your Apt#,SUITE,BUILDING..',
	'phonenumberMessageNotEmpty' : 'Please enter valid phone number.',
	'emailRequiredMessageNotEmpty': 'Please enter your email address.',
	'emailMessageValid': 'Please ensure that your email is formatted correctly.',
    'pwdlRequiredMessage': 'Please enter a password.',	
	'passwordMinMaxValidationMessage': 'Please ensure that your password is at least 6 characters in length.',
	'invalidAdddress' : 'Please enter valid address.'
});
//To be used anywhere user needs to enter measurements
ofkapp.constant('measureValidationMessages', {
	'measureMessageNotEmpty': 'Please enter measurement in centimeters.',
	'measureMessageValid': 'Measurement must be in centimeters.'
});
//schedule consultation section
ofkapp.constant('schconsultValidationMessages', {
	'redeemCoupon': 'Please ensure that you entered the correct code.',
	'timezoneMessageNotEmpty': 'Please select your time zone.',
	'apptMessageNotEmpty': 'Please select your appointment time.',
	'acuityAppointmentNotValid' : 'Selected timeslot is expired/not valid please choose other timeslot',
	'acuityTimeslotExpired' : 'Your selected date/time is no longer available. Please select "EDIT" and make another selection from the available dates/times.'
});
ofkapp.constant('paymentValidationMessages', {
	'ccNameMessageNotEmpty': 'Please enter your name.',
	'ccNumMessageNotEmpty': 'Please enter your credit card number.',
	'ccNumMessageValid': 'Please ensure your credit card number is correct.',
	'expDateMessageNotEmpty': 'Please enter your credit card expiration date.',
	'expDateMessageValid': 'Please ensure your credit card expiration date is correct.',
	'secCodeMessageNotEmpty': 'Please enter your credit card security code.',
	'secCodeMessageValid': 'Please ensure your credit card security code is correct.',
	'invalidCreditCard' : 'Please enter valid credit card number'
});

//hair style
ofkapp.constant('hairStyleValidationMessages', {
	'searchImagesMaxUploadMessage': 'Please select no more than 3 images.'
});


//Image/video uploads
ofkapp.constant('imageAndVideoValidationMessages', {
	'imageInvaliExtensionmessage': 'Your file does not work with our system. Please upload a jpg, png, bmp, tif or other standard photo file format.If you continue to have issues uploading, please contact us via Live Chat for help.',
	'videoInvaliExtensionmessage': 'Your file does not work with our system. Please upload a mp4, mpg, wmv, avi or other standard video file format.If you continue to have issues uploading, please contact us via Live Chat for help.'
});