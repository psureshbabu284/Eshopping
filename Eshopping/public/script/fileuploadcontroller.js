var fileUploadController = function(){ 
	
	var staticURL = BuildURL.getStaticURL();
	var files = [];
	
	var ServerDetailsModel = Backbone.Model.extend({
		defaults: {
			hdImageURL: staticURL + '/images/hd_header.png'
		}
	});
	
		
	var FileUploadView = Backbone.View.extend ({
		el: 'body', 
		
		events: {
			"click #uploadBtnNxt" : "onFormUpload",
			"change #withoutHair" : "handleFiles",
			"change #withHair" : "handleFiles",
			"change #frontShot" : "handleFiles",
			"change #sideShot" : "handleFiles",
			"change #headShot" : "handleFiles",
		},
		handleFiles: function (element) { 
			console.log("file  - "+element.currentTarget.files);
			files.push(element.currentTarget.files);
		},
		onFormUpload: function (event) {
				
				var serviceUrl = BuildURL.getServiceURL() + "/file/upload";

				var formData = new FormData(this);
				
				$.each(files, function (index,file) {
					formData.append('file',file);
				});
				
				//ajax call to save info provided by user
				$.ajax({
					type: 'POST',
					url: serviceUrl,
					data: formData,
					enctype: 'multipart/form-data',
					processData: false,
					contentType: false,
					success: function (response) {
					 console.log("In success"+response);
					},
					error: function (err) {
						console.log("In Error");
					}
				});
				
			   
		}
	});
	
	var FileUploadView = new FileUploadView();
};
	
  