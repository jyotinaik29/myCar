app.controller('ProfileController', function($scope, LoginService, $http, $uibModal,$location,$window) {

   $scope.host = $location.host();
   $scope.positions = [];

    $http.get('http://' + $scope.host + '/StolenVehicle/user').then(function(response) {
        LoginService.setLoginStatus(true);
        LoginService.setUser(response.data.user);
        $scope.user  = response.data.user;
        $scope.user.password = "";
        $scope.positions.push(JSON.parse($scope.user.addressCordinates));
    }, function(data) {
        LoginService.setLoginStatus(false);
        LoginService.setUser(null);

    });

    $scope.countryList = {};
    $http.get('http://' + $scope.host + '/StolenVehicle/countries').then(function(response) {
        $scope.countryList = response.data;
    }, function(data) {

    });

    $scope.loginStatus = function() {
        return LoginService.loginStatus();
    };

    $scope.placeMarker = function(e) {
        var ll = e.latLng;
        $scope.positions.length = 0;
        $scope.positions.push({
            lat: ll.lat(),
            lng: ll.lng()
        });
        $scope.user.addressCordinates = '{"lat":'+ e.latLng.lat()+',"lng":'+e.latLng.lng()+"}";
    };

    $scope.updateProfile = function(user) {

        var modalRequest = {};
        modalRequest.method = 'post';
        modalRequest.url = 'http://' + $scope.host+ '/StolenVehicle/user';
        modalRequest.entityAttribute = 'user';
        modalRequest.payLoad = $scope.user;
        modalRequest.successMessage = 'Profile details updated';
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


    };

    $scope.updatePassword = function(user) {

        var modalRequest = {};
        modalRequest.method = 'post';
        modalRequest.url = 'http://'+ $scope.host + '/StolenVehicle/password';
        modalRequest.entityAttribute = 'password';
        modalRequest.payLoad = {};
        modalRequest.payLoad.userId = $scope.user.id;
        modalRequest.payLoad.newPassword = $scope.user.newPpassword;
        modalRequest.payLoad.oldPassword = $scope.user.password;

        modalRequest.successMessage = 'Password updated successfully. Kindly login again';
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
            $window.location = '/#/login';
            LoginService.setLoginStatus(false);
            LoginService.setUser(null);
        }, function() {
              $window.location = '/#/profile';
        });
    }

});
