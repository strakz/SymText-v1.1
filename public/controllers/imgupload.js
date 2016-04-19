angular.module('SymText')
    .controller('imgupCtrl', ['$scope', 'multipart', function($scope, multipart){
    $scope.fileinfo = {};
    $scope.Submit = function(){
        var uploadUrl = '/upload';
        multipart.post(uploadUrl, $scope.fileinfo);
    }
}]);
