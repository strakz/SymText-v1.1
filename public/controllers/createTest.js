angular.module('SymText')
    .controller('TestInfoCtrl', ['$scope', '$http','$location', function ($scope, $http, $location) {

$scope.create=function(){
    console.log($scope.test)
    $http({
        url: '/testDone',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: $scope.test
    }).success(function (response) {
        $location.path('/teachermenu')

    })
}

    }])
