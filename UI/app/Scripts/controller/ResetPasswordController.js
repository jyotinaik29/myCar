app.controller('ResetPasswordController', function($scope, $http, $uibModal,$location) {

     $scope.resetPassword = {};
     $scope.host = $location.host();

     $scope.resetPasswordForUser = function(user) {

        var modalRequest = {};
        modalRequest.method = 'post';
        modalRequest.url = 'http://' + $scope.host +'/StolenVehicle/restPassword';
        modalRequest.payLoad = $scope.resetPassword;
        modalRequest.entityAttribute = 'resetPassword';
        modalRequest.successMessage = 'Password reset link has been sent to you email address';
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

        }, function() {

        });
    };

});
