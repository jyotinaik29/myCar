app.controller('MainController',function($scope,LoginService,$http,$window,$location){

//all labels section go here
  $scope.homePageLabel = "Find My Stolen Vehicle";
  $scope.profileLabel = "My Profile";
  $scope.vehiclesLabel = "My Vehicles";
  $scope.alertsLabel = "Alerts";
  $scope.rewards = "Rewards";
  $scope.disclaimerLabel = "Disclaimer";
  $scope.termsAndConditionsLabel = "Terms and Conditions";
  $scope.signUpLabel = "Sign Up";
  $scope.loginLabel = "Login";
  $scope.logoutLabel = "Logout";
  $scope.host = $location.host();

  $scope.loginStatus = function() {
  		return LoginService.loginStatus();
  };

  $scope.logout = function() {
  	$http.post('http://' + $scope.host + '/StolenVehicle/logout').then(
				function(data) {
					LoginService.setLoginStatus(false);
          $window.location='/#/landing';
				}, function(data) {
					LoginService.setLoginStatus(false);
          $window.location='/#/landing';
				}
	  );
	};

  $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
   };
});
