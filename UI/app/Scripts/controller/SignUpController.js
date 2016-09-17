app.controller('SignUpController', function($scope, $http, $uibModal, $window,$location, LoginService) {


    $scope.user = {};
    $scope.user.gender = "MALE";
    $scope.user.country_id = "IND";
    $scope.countryList = {};
    $scope.host = $location.host();
    $scope.positions = [];

    $http.get('http://' + $scope.host +'/StolenVehicle/countries').then(function(response) {
        $scope.countryList = response.data;
    }, function(data) {

    });

    $scope.signUp = function(user) {


        //initialize value
        $scope.user.email_notification = true;
        $scope.user.termsAndCondition = true;
        var modalRequest = {};
        modalRequest.method = 'post';
        modalRequest.url = 'http://' + $scope.host + '/StolenVehicle/register';
        modalRequest.payLoad = $scope.user;
        modalRequest.entityAttribute = 'user';
        modalRequest.successMessage = 'User registration was successful. Kindly activate your account by clicking on the link in the email';
        modalRequest.modalTime = 5000;
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

          //nothing do do here


        }, function() {




        });
        LoginService.setLoginStatus(false);
        LoginService.setUser(null);
        $window.location = '/#/landing';
    };

    $scope.placeMarker = function(e) {
        var ll = e.latLng;
        $scope.positions.push({
            lat: ll.lat(),
            lng: ll.lng()
        });
        $scope.user.addressCordinates = '{"lat":'+ e.latLng.lat()+',"lng":'+e.latLng.lng()+"}";
    };

});
