app.controller('AlertController', function($scope, $http, $uibModal,$location,LoginService) {

    $scope.findInfoList = null;
    $scope.request = {};
    $scope.host = $location.host();
    $scope.hasAlerts = false;


    $http.get('http://' + $scope.host + '/StolenVehicle/user').then(function(response) {
          LoginService.setLoginStatus(true);
          LoginService.setUser(response.data.user);
          $scope.user  = response.data.user;

      }, function(data) {
          LoginService.setLoginStatus(false);
          LoginService.setUser(null);

      });

    $scope.findInfoList = $http.get("http://"+ $scope.host +"/StolenVehicle/findInformationForUser").then(function(response) {
        $scope.findInfoList = response.data.find_info_list;
          $scope.hasAlerts = true;
    }, function(data) {

    });

    $scope.claim = function(findInfo) {

      var modalRequest = {};
      var find_info = {
          "id" : findInfo.id,
           "findStatus" : "ACCEPTED"

      };

      modalRequest.method = 'post';
      modalRequest.url = 'http://' + $scope.host+ '/StolenVehicle/updateFindInformationStatus';
      modalRequest.entityAttribute = 'find_info';
      modalRequest.payLoad = find_info;
      modalRequest.successMessage = 'You have accpeted the find and finder has been notified for the same';
      modalRequest.modalTime = 3000;

      modalRequest.modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'dialog/loader.html',
          controller: 'ModalController',
          size: 'md',
          resolve: {
              request: modalRequest
          }

      });
      //Check the response
      modalRequest.modalInstance.result.then(function(result) {
          $window.location = '/#/landing';
      }, function() {
          $window.location = '/#/landing';
      });

    };

    $scope.reject = function(findInfo) {


      var modalRequest = {};
      var find_info = {
          "id" : findInfo.id,
           "findStatus" : "REJECTED"

      };

      modalRequest.method = 'post';
      modalRequest.url = 'http://' + $scope.host+ '/StolenVehicle/updateFindInformationStatus';
      modalRequest.entityAttribute = 'find_info';
      modalRequest.payLoad = find_info;
      modalRequest.successMessage = 'You have rejected the find and finder has been notified for the same';
      modalRequest.modalTime = 3000;

      modalRequest.modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'dialog/loader.html',
          controller: 'ModalController',
          size: 'md',
          resolve: {
              request: modalRequest
          }

      });
      //Check the response
      modalRequest.modalInstance.result.then(function(result) {
          $window.location = '/#/landing';
      }, function() {
          $window.location = '/#/landing';
      });

    };


});
