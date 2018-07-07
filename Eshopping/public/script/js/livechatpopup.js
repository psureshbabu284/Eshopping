
   
        var j = jQuery.noConflict();
        j(document).ready(function(){
               
               // The block below will fix live chat focus issue 
               // It adds a custom attribute to the body that fixes the text input focus issue 
               
               // Chat Innializer Visibility control 
               j("#button").click( function(){
               var userName = j("#userName").val();
               var userEmail = j("#userEmail").val();
                   
               var emailValidateFilter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
               var isEmailValid = true;
        
               if (!emailValidateFilter.test(userEmail)) {
                   isEmailValid = false;
               }
               j(".input-area > input:first-of-type").removeClass("red");
               j(".input-area > input:last-of-type").removeClass("red");
               if(!userName){
                   //j(".intro").text("Please enter Name ");
                   j(".input-area > input:first-of-type").addClass("red");
                   return;
               }
               else if(!userEmail || !isEmailValid){
                   //j(".intro").text("Please enter Email ");
                   j(".input-area > input:last-of-type").addClass("red");
                   return;
               }else{
                   var chatUrl = "https://secure.livechatinc.com/licence/7503811/open_chat.cgi?cmd=file&name="+userName+"&email="+userEmail+"&message="+userName;
                   window.open(chatUrl, 'Live chat', 'width=472,height=320,resizable=yes');
                   j("#initializer").fadeOut();
               }
               });
        
               j("#livechat").click(function () {
               j("body").attr("chat-status", "Active");
               j("#initializer").fadeIn();
               var statusOffline = "https://media.hairdirect.com/images/liveperson_icons/repoffline.gif";
               var currImage = j(".logo-area img").attr("src", statusOffline);
               var statusOnline = "https://media.hairdirect.com/images/liveperson_icons/reponline.gif"
               var offLineText = "Live chat is offline, please leave us a messge";
               var onLineText = "Chat with a live hair replacement consultant";
               var currText = j(".intro").text(offLineText);
               j.ajax({
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
        
               j("input[value='Dismiss'], .closer").click(function () {
               j("#initializer").fadeOut();
               });
        
               j('input[type="radio"]').click(function () {
        
               });
           });
        
        
       
    

