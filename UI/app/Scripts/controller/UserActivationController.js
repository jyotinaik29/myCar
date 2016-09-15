app.controller('UserActivationController', function($scope, $http, $uibModal,$location,$window) {

    $scope.activationId = $location.search().id;
    $scope.activateUser = function() {
    $scope.request = {};
    $scope.request.method = 'get';
    $scope.request.url = 'http://mylostcar.com/StolenVehicle/activateUser?id=' + $scope.activationId;
    $scope.request.modalTime = 2000;
    $scope.request.successMessage = "Your account has been succesfully activated. Kindly login to user our service";
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

        $window.location='/#/login';
    };

});
