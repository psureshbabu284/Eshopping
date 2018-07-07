var BuildURL = {
	Type : 'Local', //Production OR Staging OR Local 
    Environment : {
        Production : {
            IPADDRESS : 'ehop.com',
            APPDEFAULTURL: 'ofk',
			STATICDEFAULTURL: 'public/',
			ISSECURE : true,
            PORT : '',
			HDURL : 'https://www.hairdirect.com/LogIntoStorefront.aspx',
			PCAFINDURL : 'https://services.postcodeanywhere.co.uk/CapturePlus/Interactive/Find/v2.10/json3.ws',
			PCARETRIEVEURL : 'https://services.postcodeanywhere.co.uk/CapturePlus/Interactive/Retrieve/v2.10/json3.ws',
			HDHOMEURL : 'https://www.hairdirect.com'
        },
		Staging : {
            IPADDRESS : 'test.eshop.com',
            APPDEFAULTURL: 'ofk',
			STATICDEFAULTURL: 'public/',
			ISSECURE : true,
            PORT : '',
			HDURL : 'https://test.hairdirect.com/LogIntoStorefront.aspx',
			PCAFINDURL : 'https://services.postcodeanywhere.co.uk/CapturePlus/Interactive/Find/v2.10/json3.ws',
			PCARETRIEVEURL : 'https://services.postcodeanywhere.co.uk/CapturePlus/Interactive/Retrieve/v2.10/json3.ws',
			HDHOMEURL : 'https://test.hairdirect.com'
		},
		
        Local : {
            IPADDRESS : 'localhost',
            APPDEFAULTURL: 'ofk',
			STATICDEFAULTURL: 'public/',
			ISSECURE : false,
            PORT : 3000,
			HDURL : 'https://test.hairdirect.com/LogIntoStorefront.aspx',
			PCAFINDURL : 'https://services.postcodeanywhere.co.uk/CapturePlus/Interactive/Find/v2.10/json3.ws',
			PCARETRIEVEURL : 'https://services.postcodeanywhere.co.uk/CapturePlus/Interactive/Retrieve/v2.10/json3.ws',
			HDHOMEURL : 'https://test.hairdirect.com'
        }
    },
	getServiceURL : function (attributes) {
		var SERVICEADDRESS;	 
		var port = BuildURL.Environment[BuildURL.Type].PORT;
		var IPADDRESS = BuildURL.Environment[BuildURL.Type].IPADDRESS;
		var isSecure = BuildURL.Environment[BuildURL.Type].ISSECURE;
		var httpText;
			
			if(isSecure)
				httpText = 'https://';
			else
				httpText = 'http://';
				
		if (port != '') {
			//HOSTADDRESS =  'http://' + IPADDRESS + ':' + PORT + '/' + APPDEFAULTURL;
			SERVICEADDRESS = httpText + IPADDRESS + ':' + port + '/' + BuildURL.Environment[BuildURL.Type].APPDEFAULTURL;
		}else {
			//HOSTADDRESS = 'http://' + IPADDRESS + '/' + APPDEFAULTURL;
			SERVICEADDRESS = httpText + IPADDRESS +  '/' + BuildURL.Environment[BuildURL.Type].APPDEFAULTURL;
		}
		return SERVICEADDRESS;
    },
	getStaticURL : function (attributes) {
			var STATICADDRESS;	 
			var port = BuildURL.Environment[BuildURL.Type].PORT;
			var IPADDRESS = BuildURL.Environment[BuildURL.Type].IPADDRESS;
			var isSecure = BuildURL.Environment[BuildURL.Type].ISSECURE;
			var httpText;
			
			if(isSecure)
				httpText = 'https://';
			else
				httpText = 'http://';
			
		if (port != '') {
			STATICADDRESS = httpText + IPADDRESS + ':' + port + '/' + BuildURL.Environment[BuildURL.Type].STATICDEFAULTURL;
		}else {
			STATICADDRESS = httpText + IPADDRESS +  '/' + BuildURL.Environment[BuildURL.Type].STATICDEFAULTURL;
			console.log("STATICADDRESS - "+STATICADDRESS);
		}
		return STATICADDRESS;
    },
	getHDURL : function () {
		var URL = BuildURL.Environment[BuildURL.Type].HDURL;
		return URL;
    },
	getHDHOMEURL : function () {
		var URL = BuildURL.Environment[BuildURL.Type].HDHOMEURL;
		return URL;
    },
	getAcuityApiKey : function (attributes) {
		return BuildURL.Environment['Acuity'].ACUITY_USER_ID;
    },
	getPCAFINDURL : function () {
		return BuildURL.Environment[BuildURL.Type].PCAFINDURL;
    },
	getPCARETRIEVEURL : function () {
		return BuildURL.Environment[BuildURL.Type].PCARETRIEVEURL;
    },
	getPostCodeApiKey : function (attributes) {
		return BuildURL.Environment['PostCodeAnywhere'].POSTCODE_KEY;
    },
	getGoogleSearchUrl : function() {
		/*var baseUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDt1g8ckj2SQtZT2Cj5KAHhj6ZdeRAspGo&cx=009927906285767011198:vfvnwhbbbhk&q=";*/
		
		var baseUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDt1g8ckj2SQtZT2Cj5KAHhj6ZdeRAspGo&cx=003111390331253612717:ltwob2mspcy&q=";
		
		return baseUrl;
	}
	
};