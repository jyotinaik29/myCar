app.controller('VehicleController',function($scope,LoginService,$http,$location){

  //get user object from service
  $scope.vehicles = {};
  $scope.hasVehilces = false;
  $scope.countryList = {};
  $scope.host = $location.host();

  $http.get('http://' + $scope.host + '/StolenVehicle/user').then(function(response) {
        LoginService.setLoginStatus(true);
        LoginService.setUser(response.data.user);
        $scope.user  = response.data.user;

    }, function(data) {
        LoginService.setLoginStatus(false);
        LoginService.setUser(null);

    });
  $scope.vehicles =   $http.get("http://" + $scope.host + "/StolenVehicle/vehicles").then(function(data) {
          $scope.vehicles = data.data.vehicles;
          $scope.hasVehilces = $scope.vehicles.length != 0 ? true : false;
      }, function(data) {
          $scope.hasVehilces = false;
  });
  $http.get("http://" + $scope.host + "/StolenVehicle/countries").then(function(response) {
          $scope.countryList = response.data;
      }, function(data) {

    });
});
