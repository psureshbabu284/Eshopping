/*
$(window).on('load', function()  {
	$("#livechat").on('click',function () {
		var url = window.location.href.split('?')[0];
		window.location = url+'?chat';	
		$("body").attr("chat-status", "Active");
		$("#initializer").fadeIn();
		$("input[value='Dismiss'], .closer, #button").click(function () {
		$("#initializer").fadeOut();
		$("body").removeAttr("chat-status");
	  });
  });
});
$(window).on('load', function() {
	var jq = jQuery.noConflict();
   // jq(document).ready(function(){
		   
		   // The block below will fix live chat focus issue 
		   // It adds a custom attribute to the body that fixes the text input focus issue 
		   
		   // Chat Innializer Visibility control 
		   jq("#button").on('click',function(){
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
		   jq("body").removeAttr("chat-status");
		   });
	
		   jq("#livechat").click(function () {
			//location.reload();
		   jq("body").attr("chat-status", "Active");
		   jq("#initializer").fadeIn();
		   var statusOffline = "https://media.hairdirect.com/images/liveperson_icons/repoffline.gif";
		   var currImage = jq(".logo-area img").attr("src", statusOffline);
		   var statusOnline = "https://media.hairdirect.com/images/liveperson_icons/reponline.gif"
		   var offLineText = "Live chat is offline, please leave us a message";
		   var onLineText = "Chat with a live hair replacement consultant";
		   var currText = jq("#initializer > .intro").text(offLineText);
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
		   jq("body").removeAttr("chat-status");
		   });
	
	  // })
});*/

//check doc height to flush footer to bottom
var flushFooter = (function() {
	var docHeight = $(window).height();
	
	console.log("document height: " + docHeight);
	var footerHeight = $('footer').height();
	var footerTop = $('footer').position().top + footerHeight;
		if (footerTop < docHeight) {
			$('footer').css('margin-top', 10+ (docHeight - footerTop) + 'px');
		}
	
});// end of flushFooter
		
//call the function 
$(document).ready(function(){	
	
	
	$(window).load(function() {
		// this code will run after all page elements are fully loaded.
		flushFooter();

		//Hover email in header
		$(".username").attr("title", $(".username").text().replace(/\s/g, ''));

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
			$("#initializer").fadeIn();
			$("body").attr("chat-status", "Active");
			var statusOffline = "https://media.hairdirect.com/images/liveperson_icons/repoffline.gif";
			var currImage = $(".logo-area img").attr("src", statusOffline);
			var statusOnline = "https://media.hairdirect.com/images/liveperson_icons/reponline.gif";
			var offLineText = "Live chat is offline, please leave us a messge";
			var onLineText = "Chat with a live hair replacement consultant";
			var currText = $(".intro").text(offLineText);
			$.ajax({
					type: 'GET',
					url: 'http://hairdirect.com:8080/api/status', //http://hairdirect.com:8080/api/status
					success: function(response) {
						console.log("response from live chat Flush footer bottom "+ response);
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

		/* var jq = jQuery.noConflict();
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

//re-check doc height if window is resized
$( window ).resize(function() {
		flushFooter();	
  //console.log('window has resized);
});