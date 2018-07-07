// we first inject our factory
app.controller('MyCtrl', function(GettingStarted) {


	//Global variables
	var authToken = localStorage.getItem("AuthToken");
	var userId = localStorage.getItem("userId");
	
	
    // instantiate a new user
    var user = new GettingStarted(userId,authToken);
    
	// fetch data and publish on scope
    user.getProfile().then(function() {
        $scope.userLogin = user.profile.login;
    })
});
