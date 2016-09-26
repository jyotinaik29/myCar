app.controller('FindController',function($rootScope,$scope,$http,$uibModal,$location,$window){

  $scope.showMoreInfo = false;
  $scope.upload = "fragments/upload.html";
  $scope.countryList = {};
  $scope.vehicleTypeList = {};
  $scope.vehicleMakeList = {};
  $scope.vehicleModelList = {};
  $scope.vehicleList = {};
  $scope.countryCode = {};
  $scope.vehicleType = {};
  $scope.vehicleMake = {};
  $scope.request = {};
  $scope.search = {};
  $scope.theftInfoList = {};
  $scope.findInfo = {};
  $scope.host = $location.host();
  $scope.theft_info_view = {};

  $scope.countryCode = null;
  $http.get("http://"  + $scope.host + "/StolenVehicle/countries").then(function(response) {
          $scope.countryList = response.data;
      }, function(data) {

    });

    $scope.getVehicleTypes = function(){

      var url = "http://"+ $scope.host +"/StolenVehicle/vehiclesTypes?countryId=" + $scope.countryCode;
      $scope.search.country_id = $scope.countryCode;
      $http.get(url).then(function(response) {
              $scope.vehicleTypeList = response.data;
          }, function(data) {

        });

    };

    $scope.getVehicleMakeList = function(){

      var url = "http://"+ $scope.host +"/StolenVehicle/vehicleMake?countryId=" + $scope.countryCode + "&vehicleType=" + $scope.vehicleType;
        $scope.search.type = $scope.vehicleType;
      $http.get(url).then(function(response) {
              $scope.vehicleMakeList = response.data;
          }, function(data) {

        });

    };

    $scope.getVehicleModelList = function(){

      var url = "http://"+ $scope.host +"/StolenVehicle/vehicleModel?countryId=" + $scope.countryCode + "&vehicleType=" + $scope.vehicleType + "&vehicleMake=" + $scope.vehicleMake;
      $scope.search.make = $scope.vehicleMake;
      $http.get(url).then(function(response) {
              $scope.vehicleModelList = response.data;
          }, function(data) {

        });

    };

    $scope.searchForStolenVehicles = function(){

        $http.post("http://"+ $scope.host +"/StolenVehicle/searchForStolenVehicles",{
            "search" : $scope.search

        }).then(
          function(response) {
                $scope.theftInfoList = response.data.theft_info_list;
          }, function(data) {

          }
      );

    };

    $scope.showTheftInfo = function(theftInfo){

      $scope.showMoreInfo = true;
      $scope.theft_info_view = theftInfo;
    };



    $scope.placeMarker = function(e) {
      var ll = e.latLng;
       $scope.positions=[];
       $scope.positions.push({lat:ll.lat(), lng: ll.lng()});
       $scope.findInfo.find_location_cordinates = "[" + e.latLng.lat() + "," + e.latLng.lng() + "]";
    };


    $scope.confirm = function(theft_info_view){
        alert('Kindly upload find information');
        $window.location='/#/found/upload';
        $rootScope.theft_info_view = theft_info_view;

    }

    $scope.cancel = function(){
      alert("you just clicked on cancel");
    }

    $scope.reportFindForTheft = function(findInfo){


      var date = new Date();
      findInfo.find_dateTime = date.toISOString();
      var theftInfoVal =  $rootScope.theft_info_view;
      findInfo.theft_information_id = theftInfoVal.id;
      findInfo.vehicle_id = theftInfoVal.vehicle.id;
      findInfo.user_id = theftInfoVal.user.id;
      findInfo.findStatus = 'REPORTED';

      var modalRequest = {};
      modalRequest.method = 'post';
      modalRequest.successMessage = 'Owner of this car will be notified about your find';
      modalRequest.modalTime = 5000;
      modalRequest.url = 'http://'+ $scope.host + '/StolenVehicle/reportFindForTheft';
      modalRequest.payLoad = findInfo;
      modalRequest.entityAttribute = 'find_info';
      modalRequest.modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'dialog/loader.html',
          controller: 'ModalController',
          size: 'md',
          resolve: {
              request: modalRequest
          }

      });
      modalRequest.modalInstance.result.then(function(result) {

              $window.location='/#/landing';

      }, function() {

              $window.location='/#/landing';
      });

    }

});
