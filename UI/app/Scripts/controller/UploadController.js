app.controller('UploadController', function($scope, Upload, $timeout,$location) {

    $scope.operation = 'theft';
    $scope.host = $location.host();

    $scope.setOperation =  function(operation){
      $scope.operation = operation;
    }

    $scope.uploadFiles = function(file, errFiles) {

        var postUrl = null;
        if($scope.operation  == "theft"){
            postUrl = 'http://' + $scope.host + '/StolenVehicle/uploadAttachmentsForTheft';
        }else if($scope.operation  == "find"){
            postUrl = 'http://' + $scope.host + '/StolenVehicle/uploadAttachmentsForFind';
        }
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: postUrl,
                data: {
                    file: file
                }
            });

            file.upload.then(function(response) {
                $timeout(function() {
                    file.result = response.data;
                });
            }, function(response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    }
});
