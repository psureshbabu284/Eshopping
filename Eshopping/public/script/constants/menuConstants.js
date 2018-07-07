//main menu and submenu headers information
// 0 - Profile
// 1 - Fitting
// 2 - Manual
// 3 - Virtual
// 4 - Frontal Guides
// 5 - Templates
// 6 - Lifestyle
// 7 - Hair Style
// 8 - Hair Color
// 9 - Consultation
ofkapp.constant('menuConstants', [
	{ "parentMenuName" : "Profile",
	"isRequired" : "true", //show or hide the option from menu drop down
	"isCompleted" : "0", // 1 (completed) 0 (InProgress) -1 (Pending) 
	"totalSteps" : "5", 
	"subMenuItems" : [{
		"subMenuItem":"Representative info",
		"isRequired" : "true",
		"isCompleted" : "-1", 
		"disableState" : "true", 
		"refUrl" : "userroleaccttyperepinfo",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Date of birth",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true", 
		"refUrl" : "age",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Gender",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true", 
		"refUrl" : "gender",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Shipping location",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true", 
		"refUrl" : "location",
		"conditionalFucntion" : "-1"
	},
	{
		"subMenuItem":"Remedies",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true", 
		"refUrl" : "fittingtreatments",
		"conditionalFucntion" : "-1"
	}]
},{ "parentMenuName" : "Fitting",
	"isRequired" : "false",
	"isCompleted" : "-1",
	"totalSteps" : "4",
	"subMenuItems" : [{
		"subMenuItem":"Hair loss pattern",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true", 
		"refUrl" : "fittinghairlosspattern",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Front hairline usage",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true", 
		"refUrl" : "fittinghairline",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Attachment method",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true", 
		"refUrl" : "fittingattach",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Measurement options",
		"isRequired" : "false",
		"isCompleted" : "-1",
		"disableState" : "true", 
		"refUrl" : "fittingmeasureopts",
		"conditionalFucntion" : "-1"
	}]
},{"parentMenuName" : "Manual Measurements",
	"isRequired" : "false",
	"isCompleted" : "-1",
	"totalSteps" : "4",
	"subMenuItems" : [{
		"subMenuItem":"Supplies",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "manualmeasuresupplies",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Contour",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "manualmeasurecontour",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Size",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "",
		"conditionalFucntion" : "-1"
	},
	{
		"subMenuItem":"Photos",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "manualmeasurephotos",
		"conditionalFucntion" : "-1"
	}]
},{"parentMenuName" : "Virtual Measurements",
	"isRequired" : "false",
	"isCompleted" : "-1",
	"totalSteps" : "4",
	"subMenuItems" : [{
		"subMenuItem":"Recording options",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "vmdecide",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Supplies",
		"isRequired" : "false",
		"isCompleted" : "-1",
		"refUrl" : "",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Upload instructions",
		"isRequired" : "false",
		"isCompleted" : "-1",
		"refUrl" : "",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Upload | Hair loss pattern",
		"isRequired" : "false",
		"isCompleted" : "-1",
		"videoIndex" : "-1",
		"refUrl" : "",
		"isSelected" : "false"
	},{
		"subMenuItem":"Upload | System attached",
		"isRequired" : "false",
		"isCompleted" : "-1",
		"videoIndex" : "-1",
		"refUrl" : "",
		"isSelected" : "false"
	},{
		"subMenuItem":"Upload | With headband",
		"isRequired" : "false",
		"isCompleted" : "-1",
		"videoIndex" : "-1",
		"refUrl" : "",
		"isSelected" : "false"
	}]
},{"parentMenuName" : "Frontal Guides",
	"isRequired" : "false",
	"isCompleted" : "-1",
	"totalSteps" : "5",
	"subMenuItems" : [{
		"subMenuItem":"Supplies",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "frontalguidesupplies",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Print and prepare",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "frontalguideprint",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Marking front hairline",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "frontalguidemarking",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Make selection",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "frontalguideselect",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Mark and measure",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "frontalguidemeasure",
		"conditionalFucntion" : "-1"
	}]
},{"parentMenuName" : "Template",
	"isRequired" : "false",
	"isCompleted" : "-1",
	"totalSteps" : "4",
	"subMenuItems" : [{
		"subMenuItem":"Supplies",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "templatesupplies",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Instructions",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "templateinstruct",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Shipping",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "templateship",
		"conditionalFucntion" : "-1"
	},
	{
		"subMenuItem":"Photos",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "templatephotos",
		"conditionalFucntion" : "-1"
	}]
},{"parentMenuName" : "Lifestyle",
	"isRequired" : "false",
	"isCompleted" : "-1",
	"totalSteps" : "5",
	"subMenuItems" : [{
		"subMenuItem":"Introduction",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "lifestylesintro",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Ethnicity",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "lifestyleethnic",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Environment",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "lifestyleclimate",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Perspiration",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "lifestylebodychem",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Scalp type",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "lifestylescalp",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Sun exposure",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "lifestylesun",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Maintenance",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "lifestylemainsch",
		"conditionalFucntion" : "-1"
	}
	]
},{"parentMenuName" : "Hairstyle",
	"isRequired" : "false",
	"isCompleted" : "-1",
	"totalSteps" : "2",
	"subMenuItems" : [{
		"subMenuItem":"Options",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "hairstyleoptions",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Send links",
		"isRequired" : "false",
		"isCompleted" : "-1",
		"refUrl" : "hairstylelinks",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Upload photos",
		"isRequired" : "false",
		"isCompleted" : "-1",
		"refUrl" : "hairstylephotos",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Hairstyle gallery",
		"isRequired" : "false",
		"isCompleted" : "-1",
		"refUrl" : "hairstylegallery",
		"conditionalFucntion" : "-1"
	}]
},{"parentMenuName" : "Hair Color",
	"isRequired" : "false",
	"isCompleted" : "-1",
	"totalSteps" : "9",
	"subMenuItems" : [{
		"subMenuItem":"Introduction",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "haircolorintro",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Color growing hair",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "haircolorgrowing",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Match current color",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "haircolorcurrent",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Current highlights/lowlights",
		"isRequired" : "false", 
		"isCompleted" : "-1",
		"refUrl" : "haircolorhighlow",
		"conditionalFucntion" : "-1",
		
	},{
		"subMenuItem":"Dominant color",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "haircolordominant",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Gray hair",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true",
		"refUrl" : "haircolorgray",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Highlights preference",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true",
		"refUrl" : "haircolorhigh",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Highlight color",
		"isRequired" : "false",
		"isCompleted" : "-1",
		"disableState" : "true",
		"refUrl" : "haircolorhighcolor",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Lowlights preference",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true",
		"refUrl" : "haircolorlow",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Lowlight color",
		"isRequired" : "false",
		"isCompleted" : "-1",
		"disableState" : "true",
		"refUrl" : "haircolorlowcolor",
		"conditionalFucntion" : "-1"
	}]
},{	"parentMenuName" : "Consultation",
	"isRequired" : "false",
	"isCompleted" : "-1",
	"totalSteps" : "3",
	"subMenuItems" : [{
		"subMenuItem":"Introduction",
		"isRequired" : "false",
		"isCompleted" : "-1",
		"refUrl" : "schconsultintro",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Schedule",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"refUrl" : "schconsultschedule",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Contact info",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true",
		"refUrl" : "schconsultcontact",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Payment method",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true",
		"refUrl" : "schconsultpayment",
		"conditionalFucntion" : "-1"
	},{
		"subMenuItem":"Confirmation screen",
		"isRequired" : "true",
		"isCompleted" : "-1",
		"disableState" : "true",
		"refUrl" : "schconsultconfirm",
		"conditionalFucntion" : "-1"
	}]
}]);