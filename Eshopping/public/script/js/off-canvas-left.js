// one function to check each .main-menu > li next ul for visible/hidden
// return state of individual elements and apply correct arrow to .main-menu > li

// function runs when
// page loads
// click event occurs

function displayArrows(){
	$('.main-menu > li').each(function( index ) {
		var $ul = $(this).next('ul');
		var arrow = $(this).find('span.icon');	
			if ($ul.is(':visible')) {
				arrow.removeClass('icon-closed').addClass('icon-open');
				//console.log('opened');
			} else if ($ul.is(':hidden')) {
				arrow.removeClass('icon-open').addClass('icon-closed');
				//console.log('closed');
			}
		//console.log( index + ": " + $ul.text() );
	});
}

$(document).ready(function(){	
											
       //Navigation Menu Slider
        $('#nav-expander').on('click',function(e){
      		e.preventDefault();
           	$('body').toggleClass('nav-expanded');
			$('#dimmer').fadeIn('slow');        	
      	});
      	$('#nav-close').on('click',function(e){
      		e.preventDefault();
      		$('body').removeClass('nav-expanded');
			$('#dimmer').fadeOut('slow');
      	});
	
		$('.main-menu > li').on('click', function() {
			var $ul = $(this).next('ul');
			$ul.slideToggle(function(){ 
				//run function again
				displayArrows()
			});
		});
	displayArrows();
});