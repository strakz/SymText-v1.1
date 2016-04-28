angular.module('SymText')
    .controller('ImgupCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
    $scope.fileinfo = {};
    $scope.Submit = function(){
        var uploadUrl = '/upload';
        fileUpload.post(uploadUrl, $scope.fileinfo);
    }
}]);
