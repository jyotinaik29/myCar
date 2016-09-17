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

    $scope.giveReward  = function(findInfo){

      var reward = {};
      reward.theftId = findInfo.theft_information_id;
      reward.findInformationId = findInfo.id;
      $scope.request.method = 'post';
      $scope.request.url = 'http://'+ $scope.host + '/StolenVehicle/reward';
      $scope.request.payLoad = reward;
      $scope.request.entityAttribute = 'reward';
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

    $scope.rejectReward  = function(findInfo){


    }
});
