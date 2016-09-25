app.controller('VehicleStatusController', function($scope, LoginService, $http,$uibModal,$location) {

    $scope.theft_info = null;
    $scope.host = $location.host();
    $scope.searchClicked = false;

    $scope.getTheftStatusByVehicleRegNumber = function(registrationNumber) {

          $scope.searchClicked = true;
        var modalRequest = {};
        modalRequest.method = 'get';
        modalRequest.url = 'http://' + $scope.host + '/StolenVehicle/searchForTheft?regNumber=' + registrationNumber;
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

            $scope.theft_info = result.theft_info;

        }, function() {

        });

    };
});
