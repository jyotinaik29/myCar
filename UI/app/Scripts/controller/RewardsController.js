app.controller('RewardsController',function($scope,$http,$uibModal,$location,LoginService){

    $scope.message = "Message";
    $scope.request = {};
    $scope.host = $location.host();
    $scope.findInfoListReadyForReward;

    $http.get('http://' + $scope.host + '/StolenVehicle/user').then(function(response) {
          LoginService.setLoginStatus(true);
          LoginService.setUser(response.data.user);
          $scope.user  = response.data.user;

      }, function(data) {
          LoginService.setLoginStatus(false);
          LoginService.setUser(null);

      });


    $http.get("http://"+ $scope.host +"/StolenVehicle/findInformationListReadyForReward").then(function(response) {
        $scope.findInfoListReadyForReward = response.data.find_info_list;
    }, function(data) {

    });


    $scope.reward  = function(findInfo){

      var modalRequest = {};
      var reward = {};
      reward.theftId = findInfo.theft_information_id;
      reward.findInformationId = findInfo.id;
      modalRequest.method = 'post';
      modalRequest.url = 'http://'+ $scope.host + '/StolenVehicle/reward';
      modalRequest.entityAttribute = 'reward';
      modalRequest.payLoad = reward;
      modalRequest.successMessage = 'You have succesfully updated findinformation.';
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
      //Check the response
      modalRequest.modalInstance.result.then(function(result) {
          $window.location = '/#/profile';
      }, function() {
          $window.location = '/#/profile';
      });


    }

    $scope.reject  = function(findInfo){

      
    }
});
