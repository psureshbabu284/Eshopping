
/**
  * @directive dayValidation
  * @memberOf angular_module.ofkapp
  * @params day 
  * @description to apply validation rules for age and display validation messages in html
  */
  ofkapp.directive('dayValidation', function($parse) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
			if (!ctrl) return;
           
			var validator = function(value) {

				if (ctrl.$isEmpty(value)) {
                    ctrl.$setValidity('dayValid', false);
					return false;
                } else {
					var transformedInput = value.replace(/[^0-9]/g, '');
					 var convertedValue = parseInt(value);
					   //if it is a number and lenght greater than or equal to 2
						if (transformedInput === value && value.length >= 2) {
							//if month is not greater than 12
							if(convertedValue < 1 || convertedValue > 31){ 
								ctrl.$setValidity('dayValid', false);
									
							}else{
								//isMonthValid = true;
								var nextinput = element.next('input');
								if (nextinput.length === 1)
								{
									ctrl.$setValidity('dayValid', true);
									ctrl.$setViewValue(transformedInput);		
									ctrl.$render();
									setTimeout(function(){
										nextinput[0].focus();},100);
									//nextinput[0].focus();
								}
							}
						}else{
								ctrl.$setValidity('dayValid', false);
								ctrl.$setViewValue(transformedInput);
								ctrl.$render();
						}
					return transformedInput;	
					
				}//end of if
				
				scope.$digest();
               
            };// end of validator
            ctrl.$parsers.unshift(validator);
        }// end of link
    };// end of return

});// end of directive


/**
  * @directive monthValidation
  * @memberOf angular_module.ofkapp
  * @params month 
  * @description to apply validation rules for age and display validation messages in html
  */
ofkapp.directive('monthValidation', function($parse) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
			if (!ctrl) return;
           
			var validator = function(value) {

				if (ctrl.$isEmpty(value)) {
                    ctrl.$setValidity('monthValid', false);
					return false;
                } else {
						var transformedInput = value.replace(/[^0-9]/g, '');
						var convertedValue = parseInt(value);
						console.log("IN MM"); 	
					   //var transformedInput = value.replace(/[^0-9]/g, '');
					   //var convertedValue = parseInt(value);
					   //if it is a number and lenght greater than or equal to 2
					   if (transformedInput === value && value.length >= 2) {
							if(convertedValue < 1 || convertedValue > 12){ //if month is not greater than 12
									//isMonthValid = false;
									ctrl.$setValidity('monthValid', false);
									//e.preventDefault(); 
							}else{
									//isMonthValid = true;
									//dobDateArray[1] = value;
								var nextinput = element.next('input');
								if (nextinput.length === 1)
								{
									//nextinput[0].focus();
									ctrl.$setValidity('monthValid', true);
									ctrl.$setViewValue(transformedInput);		
									ctrl.$render();
									setTimeout(function(){
										nextinput[0].focus();},100);
									//nextinput[0].focus();
								}
							}
					   }else{
							  ctrl.$setValidity('monthValid', false);
							  ctrl.$setViewValue(transformedInput);
							  ctrl.$render();
					   }
					return transformedInput;	
					
				}//end of if
				
				scope.$digest();
               
            };// end of validator
            ctrl.$parsers.unshift(validator);
        }// end of link
    };// end of return

});// end of directive


/**
  * @directive yearValidation
  * @memberOf angular_module.ofkapp
  * @params year 
  * @description to apply validation rules for age and display validation messages in html
  */
ofkapp.directive('yearValidation', function($parse) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
			if (!ctrl) return;
           
			var validator = function(value) {

				if (ctrl.$isEmpty(value)) {
                    ctrl.$setValidity('yearValid', false);
					return false;
                } else {
						var transformedInput = value.replace(/[^0-9]/g, '');
						var convertedValue = parseInt(value);
						
                        if(attrs.name == 'YYYY'){
							console.log("IN YYYY");
							  var transformedInput = value.replace(/[^0-9]/g, '');
							   var convertedValue = parseInt(value);
							   
							   //if it is a number and lenght greater than or equal to 2
							   if (transformedInput === value && value.length >= 4) {
								  
								   var currentDate = new Date();
										console.log("getYear - "+currentDate.getFullYear());
									if(convertedValue < 1 || convertedValue > currentDate.getFullYear()){ //if month is not greater than 12
											//isMonthValid = false;
											ctrl.$setValidity('yearValid', false);
											//e.preventDefault(); 
									}else{
											//isMonthValid = true;
											//dobDateArray[2] = value;
											ctrl.$setValidity('yearValid', true);
											//element.next().focus(); 
									}
							   }else{
									  ctrl.$setValidity('yearValid', false);
									  ctrl.$setViewValue(transformedInput);
									  ctrl.$render();
							   }
						} //end of YYYY if looop

						
							return transformedInput;	
					
				}//end of if
				
				scope.$digest();
               
            };// end of validator
            ctrl.$parsers.unshift(validator);
        }// end of link
    };// end of return

});// end of directive


/**
  * @directive ageValidation
  * @memberOf angular_module.ofkapp
  * @params month date and year 
  * @description to apply validation rules for age and display validation messages in html
  */
ofkapp.directive('ageValidation', function($parse,$timeout) {
    return {
        require: '^?form',
        link: function (scope, element, attrs, ctrl) {

			  $timeout(function(){
			
					if (!ctrl) return; //if ctrl is null or undefined
					if (!attrs.dob) return;  //if attrs is null or undefined

					var ofkModel = JSON.parse(attrs.dob);
					//var secondDate = new Date();
					if(!ofkModel) return;  //if ofkModel is null or undefined
					if(!ofkModel.YYYY) return; //if YYYY is null or undefined
					if(!ofkModel.MM) return;  //if MM is null or undefined
					if(!ofkModel.DD) return;  //if DD is null or undefined
					
					// DATE FORMAT IN YYYY-MM-DD
					var dob = ofkModel.YYYY + '-' + ofkModel.MM + '-' +  ofkModel.DD;  
					
					scope.$parent.dob = dob;
					//get no of years using moment library
					var years = moment().diff(dob, 'years'); 
					
					if(years > 100 || years <= 5) { //above age 100  & below age 5
						scope.$parent.isAgeNotValid = 3;
						scope.$parent.isDateValid = false;
					}else if(years <= 100 && years >= 18) { //between age 18 & 100
						scope.$parent.isAgeNotValid = 2;
						scope.$parent.isDateValid = true;
						scope.$parent.onError = false;
					}else if(years > 5 && years < 18) {//between age 5 & 18
						scope.$parent.isAgeNotValid = 1;
						scope.$parent.isDateValid = true;
					}

					//day validation of month
					var dobFormattedDate = ofkModel.YYYY + '-' + ofkModel.MM;  		
					//get no of months based on year and month
					var noOfDaysInMonth = moment(dobFormattedDate, "YYYY-MM").daysInMonth();
					
					if(parseInt(ofkModel.DD) > noOfDaysInMonth) 
						scope.$parent.isDayValid = true;
					else
						scope.$parent.isDayValid = false;
									
					scope.$digest();
			});
        }// end of link
    };// end of return

});// end of directive

/**
  * @directive ageValidation
  * @memberOf angular_module.ofkapp
  * @params month date and year 
  * @description to apply validation rules for age and display validation messages in html
  */
 ofkapp.directive('disableMultipleClick', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function(){
                $timeout(function(){
                    elem.attr('disabled','disabled');
                }, 20);

                $timeout(function(){
                    elem.removeAttr('disabled');
                }, 5000);
            });
			
			elem.on("change", function(){
				elem.removeAttr('disabled');
			});
        }
    };
});// end of directive
