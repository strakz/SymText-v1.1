angular.module('SymText')
    .controller('TestInfoCtrl', ['$scope', '$http','$location', function ($scope, $http, $location) {

        //doplnenie informacii potrebnych k testu
$scope.create=function(){
    console.log($scope.test)

    $http({
        url: '/testDone',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: $scope.test
    }).success(function (response) {
        $location.path('/ucitelmenu')

    })
}

    }])
