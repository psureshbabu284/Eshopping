<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Email Verification</title>
<style>
*{margin:0px;padding:0px;font-family: helvetica, sans-serif;}
</style>
</head>
<body style="background:#f6f6f6 url(http://videocrm.com/images/email/bg.jpg) repeat-x;">
<div style="height:auto;width:78%;margin:0px auto;padding:25px 10px 0px 10px;">
  <div style="height:100px;"> <img src="http://52.11.63.176/public/images/VideoCRM_Logo.png" alt="Video CRM"> </div>
  <div style="min-height:200px;height:auto;background:#fff;border-top:5px solid #fbba3a;">
    <h2 style="font-size: 32px;color: #555555;margin:30px 10% 30px 10%;">Please verify your Email</h2>
    <p style="font-size:13px;color:#99A1A6;line-height:19px;margin:0px 10% 20px 10%;">Hey, we want to verify that you are "{{details.firstName}} {{details.lastName}}"  and your Email is {{email}}. <br />
Verifying these details will let you receive notifications and password resets from VideoCRM.<br />
      If you wish to continue, please follow the link below:</p>
    <p style="font-size:13px;color:#99A1A6;line-height:19px;margin:0px 10% 20px 10%;"><a href="{{details.url}}" style="padding: 8px;	background: #DA5454;	font-size: 13px;	color: #ffffff;	text-decoration: none;	font-weight: bold;	display: inline-block;">Click here!</a></p>
    <p style="font-size:13px;color:#99A1A6;line-height:19px;margin:0px 10% 20px 10%;">If you're not {{details.firstName}} {{details.lastName}} or didn't request verification,
      you can ignore this email.</p>
    <br clear="all" />
  </div>
  <div style="height:30px;background:#1c88bc;line-height:30px;color:#fff;text-align:center;font-size:12px;"><span>Copyright ©2015 <a href="http://www.videocrm.com" style="color:#fff;text-decoration:none;">Video CRM</a>. All Right Reserved.</span></div>
</div>
</body>
</html>
