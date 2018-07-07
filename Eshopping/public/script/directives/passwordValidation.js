
var ATLEAST_ONE_CHAR_REGEXP = /[a-zA-Z]/;
var ATLEAST_ONE_UUPPERCASE_REGEXP = /[A-Z]/;
var ATLEAST_ONE_NUMBER_REGEXP = /\d/;
var ATLEAST_ONE_SPECAIL_REGEXP = /[!@#\$%\^&\*]/;

/**
  * @directive passwordValidation
  * @memberOf angular_module.ofkapp
  * @params password controle value
  * @description to apply validation rules for password and display validation messages in html
  */
ofkapp.directive('passwordValidation', function() {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            if (!ctrl) return;
            var validator = function(value) {
                if (ctrl.$isEmpty(value)) {
                    ctrl.$setValidity('passwordValidation', false);
					return value;
                } else {
				
					var isPasswordValid = true;
					
					if(!ATLEAST_ONE_CHAR_REGEXP.test(value)){ // atleast one char
						isPasswordValid = false;
						scope.pwdValidationMessage ="Password should contain at least one character";
						ctrl.$setValidity('passwordValidation', isPasswordValid);
						return value;
					}
					
					//atleast on upper case
					if (!ATLEAST_ONE_UUPPERCASE_REGEXP.test(value)){									
						
						isPasswordValid = false;
						scope.pwdValidationMessage ="Password should contain at least one upper case";
						ctrl.$setValidity('passwordValidation', isPasswordValid);
						return value;
					}
					
					//atleast on number
					if(!ATLEAST_ONE_NUMBER_REGEXP.test(value)){
						
						isPasswordValid = false;
						scope.pwdValidationMessage ="Password should contain at least one number";
						
					}
					
					//atleast on special character
					if(!ATLEAST_ONE_SPECAIL_REGEXP.test(value)){
						
						isPasswordValid = false;
						scope.pwdValidationMessage ="Password should contain at least one special character";
						ctrl.$setValidity('passwordValidation', isPasswordValid);
						return value;
					}
					
					//if every rule is success full return true
					ctrl.$setValidity('passwordValidation', isPasswordValid);
					return value;	
				
                }
                
            };
            ctrl.$parsers.unshift(validator);
        }
    };
});
