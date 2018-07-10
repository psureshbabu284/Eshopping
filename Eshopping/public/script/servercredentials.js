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
	
	
};