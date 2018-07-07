// one function to check each .main-menu > li next ul for visible/hidden
// return state of individual elements and apply correct arrow to .main-menu > li
/*$(window).load(function(){
	'use strict';
	var jqrl = jQuery.noConflict();
	jqrl("#livechat").click(function () {
		var url = window.location.href.split('?')[0];
		window.location = url+'?chat';
		jqrl("body").attr("chat-status", "Active");	
		jqrl("#initializer").fadeIn();
		
		jqrl("input[value='Dismiss'], .closer, #button").click(function () {
			jqrl("#initializer").fadeOut();
			jqrl("body").removeAttr("chat-status");
		});
	});
	
});*/


// Close Dropdown menu on mobile when user clicks outside of it
/*
$(function () {

	"use strict";
	$(document).click(function (e) {
		var dropPlate = $("#navmain");
		if (!dropPlate.is(e.target) && dropPlate.has(e.target).length === 0) {
			dropPlate.hide();
			//$("#dimmer, #nav-close").hide();
			//$(".nav-open").show();
			//angular.element('#navmain').triggerHandler('click');
		}
	});
});
*/

$(function () {
	"use strict";
	$(document).on('click', '#dimmer', function(e){
		var dropPlate = $(".list-unstyled.main-menu");
		if (!dropPlate.is(e.target) && dropPlate.has(e.target).length === 0) {
			//dropPlate.hide();
			//$("#navmain").hide();
			//$("#dimmer").hide();
			//$("#nav-close").css("display","none!important");
			$("#dropdown.open").removeClass("open");
			//$(".nav-open").css("display","block!important");
			$("#nav-expander").attr("area-expanded",true);
		}else{
			$("#dropdown").addClass("open");
			$("#nav-expander").attr("area-expanded",false);
		}
	});
	
});




function setHeight() {
    var dropmenu = $('.dropdown-menu');
    var windowHeight = $(window).innerHeight();
    	dropmenu.css('min-height', windowHeight + -10 + 'px');
  };

$(document.body).on('click', '[data-toggle=dropdown]', function(){
  setHeight();
});

//flush footer to bottom and adjust menu scrolling.
var flushFooter = (function() {
	var docHeight = $(window).height();
	var footerTop;
	console.log("document height: " + docHeight);
	var footerHeight = $('footer').height();
	if($('footer').position()){
		footerTop = $('footer').position().top + footerHeight;
	}
	
		if (footerTop < docHeight) {
			$('footer').css('margin-top', 10+ (docHeight - footerTop) + 'px');
		}
	
});// end of flushFooter

// function runs when
// page loads
// click event occurs
var NavigationMenu = (function() {
	  var displayArrows = function() {
		$('#spanli > li').each(function( index ) {
		var $ul = $(this).next('ul');
		var arrow = $(this).find('span.icon');	
			if ($ul.is(':visible')) {
				arrow.removeClass('icon-closed').addClass('icon-open');
			} else if ($ul.is(':hidden')) {
				arrow.removeClass('icon-open').addClass('icon-closed');
			}
		});
		return false;
	  };// end of displayArrows
	  
	var hideOnViewClick = function() {
		return false;
	};// end of hideOnViewClick

	  var menuEvent = function() {
		if ($(".dropdown.open").length > 0) {
			$('#nav-close').show();
			$('.nav-open').hide();
			$('.navbar-white').css("box-shadow","none");
			$('#dimmer').show(); 
		} else {
			$('#nav-close').hide();
			$('.nav-open').show();
			$('#dimmer').hide();
			$('.navbar-white').css("box-shadow","0 8px 6px -3px #DAD6D2");
		}
		return;
	  };// end of menuEvent
	  
//	   var sesionCheck = function() {
//			var userId = localStorage.getItem("userId");
//		console.log("userId: " + userId);
//			var authToken = localStorage.getItem("authToken");
//		console.log("authToken: " + authToken);
//			var staticURL = BuildURL.getStaticURL();
//		console.log("staticURL: " + staticURL);
//			if(!userId)
//				window.location.href = staticURL+ "views/gettingstarted.html#/signin";
//			if(!authToken)
//				window.location.href = staticURL+ "views/gettingstarted.html#/signin";
//			return;
//	  };
	
	// end of sesionCheck
	  
	  var flushFooter = function() {
		var docHeight = $(window).height();
				console.log("document height: " + docHeight);
		var footerHeight = $('footer').height();
		var footerTop = $('footer').position().top + footerHeight;
			if (footerTop < docHeight) {
				$('footer').css('margin-top', 10+ (docHeight - footerTop) + 'px');
			}
		
	  };// end of flushFooter
	  
    return {
        init:  function() {
            displayArrows();
			hideOnViewClick();
			flushFooter();
        },
        menu: menuEvent,
		displayArrows : displayArrows,
//		sesionCheck : sesionCheck,
		flushFooter : flushFooter
    }

})();//end of class

		function onMenuClick(element){
			var $ul = $(element).next('ul');
			$ul.slideToggle(function(){ 
				//run function again
				$('#spanli > li').each(function( index ) {
					var $ul = $(this).next('ul');
					var arrow = $(this).find('span.icon');	
					if ($ul.is(':visible')) {
						arrow.removeClass('icon-closed').addClass('icon-open');
						//console.log('opened');
					}else if ($ul.is(':hidden')) {
						arrow.removeClass('icon-open').addClass('icon-closed');
						//console.log('closed');
					}
					//console.log( index + ": " + $ul.text() );
				});
				$('#navmain').show();
				$('#dimmer').show(); 
			});
		}
		
		function onSubMenuClick(element){
			
			$('#nav-close').hide();
			$('.nav-open').show();
			$('#navmain').fadeOut('slow');
			$('#dimmer').fadeOut('slow');
			$('.navbar-white').css("box-shadow","0 8px 6px -3px #DAD6D2");
		}

		
		

$(document).ready(function(){

		
	    //Navigation Menu dropdown
		
		//NavigationMenu.sesionCheck();
		
		$('.main-menu li a').on({
			"click":function(e){
				e.stopPropagation();
			}
		});
		
		$("#landing-page").click(function (event) { 
			//NavigationMenu.sesionCheck();
		});
		
		//Hover email in header
		$(".username").attr("title", $(".username").text().replace(/\s/g, ''));
		
		$(document).click(function (event) { 
			//check menu status every time a click event occurs
//			NavigationMenu.sesionCheck();
			$("div.fc-popover").hide();
		});
	
		


		$(window).load(function() {
			// this code will run after all other $(document).ready() scripts
			// have completely finished, AND all page elements are fully loaded.
			flushFooter();
			
			// Chat Innializer Visibility control 
			/*$("#button").click( function(){
				var userName = $("#userName").val();
				var userEmail = $("#userEmail").val();

				var emailValidateFilter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				var isEmailValid = true;

				if (!emailValidateFilter.test(userEmail)) {
					isEmailValid = false;
				}

				$(".input-area > input:first-of-type").removeClass("red");
				$(".input-area > input:last-of-type").removeClass("red");
				if(!userName){
					//$(".intro").text("Please enter Name ");
					$(".input-area > input:first-of-type").addClass("red");
					return;
				}
				else if(!userEmail || !isEmailValid){
					//$(".intro").text("Please enter Email ");
					$(".input-area > input:last-of-type").addClass("red");
					return;
				}else{
					var chatUrl = "https://secure.livechatinc.com/licence/7503811/open_chat.cgi?cmd=file&name="+userName+"&email="+userEmail+"&message="+userName;
					window.open(chatUrl, 'Live chat', 'width=472,height=320,resizable=yes');
					$("#initializer").fadeOut();
				}
			});

			$("#livechat").click(function () {
				// The block below will fix live chat focus issue 
				// It adds a custom attribute to the body that fixes the text input focus issue 
				
				$("body").attr("chat-status", "Active");

				
				$("#initializer").fadeIn();
				var statusOffline = "https://media.hairdirect.com/images/liveperson_icons/repoffline.gif";
				var currImage = $(".logo-area img").attr("src", statusOffline);
				var statusOnline = "https://media.hairdirect.com/images/liveperson_icons/reponline.gif"
				var offLineText = "Live chat is offline, please leave us a messge";
				var onLineText = "Chat with a live hair replacement consultant";
				var currText = $(".intro").text(offLineText);
				$.ajax({
						type: 'GET',
						url: 'http://hairdirect.com:8080/api/status', //http://hairdirect.com:8080/api/status
						success: function(response) {
							console.log("response from live chat navigation bottom "+ response);
							if(!response.includes("online")){
								currImage.attr("src", statusOffline);
								currText.text(offLineText);
							}else{
								currImage.attr("src", statusOnline);
								currText.text(onLineText);
							}
						},
						error: function(error) {
							console.log("Error from live chat response response "+ error);
							currImage.attr("src", statusOffline);
							currText.text(offLineText);
						}
					});
			});
		  
			$("input[value='Dismiss'], .closer").click(function () {
				$("#initializer").fadeOut();
				$("body").removeAttr("chat-status");
			});*/

			/*var jq = jQuery.noConflict();
        jq(document).ready(function(){
               
               // The block below will fix live chat focus issue 
               // It adds a custom attribute to the body that fixes the text input focus issue 
               
               // Chat Innializer Visibility control 
               jq("#button").click( function(){
               var userName = jq("#userName").val();
               var userEmail = jq("#userEmail").val();
                   
               var emailValidateFilter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
               var isEmailValid = true;
        
               if (!emailValidateFilter.test(userEmail)) {
                   isEmailValid = false;
               }
               jq(".input-area > input:first-of-type").removeClass("red");
               jq(".input-area > input:last-of-type").removeClass("red");
               if(!userName){
                   //jq(".intro").text("Please enter Name ");
                   jq(".input-area > input:first-of-type").addClass("red");
                   return;
               }
               else if(!userEmail || !isEmailValid){
                   //jq(".intro").text("Please enter Email ");
                   jq(".input-area > input:last-of-type").addClass("red");
                   return;
               }else{
                   var chatUrl = "https://secure.livechatinc.com/licence/7503811/open_chat.cgi?cmd=file&name="+userName+"&email="+userEmail+"&message="+userName;
                   window.open(chatUrl, 'Live chat', 'width=472,height=320,resizable=yes');
                   jq("#initializer").fadeOut();
			   }
			   $("body").removeAttr("chat-status");
               });
        
               jq("#livechat").click(function () {
               jq("body").attr("chat-status", "Active");
               jq("#initializer").fadeIn();
               var statusOffline = "https://media.hairdirect.com/images/liveperson_icons/repoffline.gif";
               var currImage = jq(".logo-area img").attr("src", statusOffline);
               var statusOnline = "https://media.hairdirect.com/images/liveperson_icons/reponline.gif"
               var offLineText = "Live chat is offline, please leave us a messge";
               var onLineText = "Chat with a live hair replacement consultant";
               var currText = jq(".intro").text(offLineText);
               jq.ajax({
                   type: 'GET',
                   url: 'http://hairdirect.com:8080/api/status', //http://hairdirect.com:8080/api/status
                   success: function(response) {
                       console.log("response from live chat navigation bottom "+ response);
                       if(!response.includes("online")){
                       currImage.attr("src", statusOffline);
                       currText.text(offLineText);
                       }else{
                       currImage.attr("src", statusOnline);
                       currText.text(onLineText);
                       }
                   },
                   error: function(error) {
                       console.log("Error from live chat response response "+ error);
                       currImage.attr("src", statusOffline);
                       currText.text(offLineText);
                   }
                   });
               });
        
               jq("input[value='Dismiss'], .closer").click(function () {
			   jq("#initializer").fadeOut();
			   $("body").removeAttr("chat-status");
               });
        
           });*/
		});
		
});

$( window ).resize(function() {
		 
		flushFooter();
		
		  //if dropdown is visible and window resizes adjust height again	
		  var dropmenu = $('.dropdown-menu');
		  if (dropmenu.length > 0){
			  setHeight();
		  }		
  //console.log('window has resized ' + 'and dropdown length is ' + dropmenu.length);
});


