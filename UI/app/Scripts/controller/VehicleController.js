app.controller('VehicleController',function($scope,LoginService,$http,$location){

  //get user object from service
  $scope.vehicles = {};
  $scope.hasVehilces = false;
  $scope.countryList = {};
  $scope.host = $location.host();
  $scope.vehicles =   $http.get("http://"+$scope.host+ "/StolenVehicle/vehicles").then(function(data) {
          $scope.vehicles = data.data.vehicles;
          $scope.hasVehilces = true;
      }, function(data) {
          $scope.hasVehilces = false;
  });
  $http.get("http://mylostcar.com/StolenVehicle/countries").then(function(response) {
          $scope.countryList = response.data;
      }, function(data) {

    });
});
