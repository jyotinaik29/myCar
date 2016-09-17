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
    }, function(data) {

    });

    $scope.claim = function(findInfo) {
      $scope.find_info = {
          "id" : findInfo.id,
           "findStatus" : "ACCEPTED"

      };
      $scope.request.method = 'post';
      $scope.request.url = 'http://'+ $scope.host + '/StolenVehicle/updateFindInformationStatus';
      $scope.request.payLoad = $scope.find_info;
      $scope.request.entityAttribute = 'find_info';
      $scope.request.message = 'You have accpeted the find and finder has been notified for the same';
      $scope.modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'dialog/loader.html',
          controller: 'ModalController',
          size: 'md',
          resolve: {
              request: $scope.request
          }

      });
      $scope.request.modalInstance = $scope.modalInstance;
      $scope.modalInstance.result.then(function(result) {

      }, function() {


      });

    };

    $scope.reject = function(findInfo) {

        $scope.find_info = {
            "id" : findInfo.id,
             "findStatus" : "REJECTED"

        };
        $scope.request.method = 'post';
        $scope.request.url = 'http://'+ $scope.host + '/StolenVehicle/updateFindInformationStatus';
        $scope.request.payLoad = $scope.find_info;
        $scope.request.entityAttribute = 'find_info';
        $scope.request.message = 'You have rejected the find and finder has been notified for the same';
        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'dialog/loader.html',
            controller: 'ModalController',
            size: 'md',
            resolve: {
                request: $scope.request
            }

        });
        $scope.request.modalInstance = $scope.modalInstance;
        $scope.modalInstance.result.then(function(result) {

        }, function() {


        });
    }


});
