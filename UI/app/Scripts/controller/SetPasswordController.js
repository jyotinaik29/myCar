app.controller('SetPasswordController', function($scope, $http, $uibModal,$location,$window) {

    $scope.host = $location.host();
    $scope.setPassword = {};
    $scope.setPassword.passwordResetCode =  $location.search().passwordResetCode;
    $scope.passwordToken = $location.search().passwordResetCode;
    $scope.setPassword = function() {

    };

});
