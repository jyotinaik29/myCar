app.controller('SetPasswordController', function($scope, $http, $uibModal,$location,$window) {


    $scope.setPassword = {};
    $scope.setPassword.activiationId =  $location.search().passwordResetCode;
    $scope.host = $location.host();
    $scope.setPasswordForUser = function() {

      var modalRequest = {};
      modalRequest.method = 'post';
      modalRequest.url = 'http://' + $scope.host + '/StolenVehicle/setPassword';
      modalRequest.payLoad = $scope.setPassword;
      modalRequest.entityAttribute = 'setPassword';
      modalRequest.successMessage = 'Password has been successfully udpated';
      modalRequest.modalTime = 2000;
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

            $window.location='/#/login';


      }, function() {



      });

    };

});
