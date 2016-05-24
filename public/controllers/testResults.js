angular.module('SymText')
    .controller('TestRsltCtrl', function($scope, $http) {


        $scope.reslts = [];
        $scope.showList = false;

        //vysledky testov
        $http.get('/api/results').success(function (data) {
            // now we have all our movies and can add them
            $scope.reslts = data;
            console.log(data)
            console.log(data.length);
            console.log($scope.reslts.length);

            if ($scope.reslts.length > 0) {
                $scope.showList = true;
            } else {
                $scope.showList = false;
            }
        });


    })
