angular.module('SymText')
    .controller('TestOwnMenuCtrl', ['$scope', '$http', 'Test', function ($scope, $http, Test) {

        //zobrazenie menu testov na samotestovanie
        $scope.getTests = function () {
            $http.post('/api/getTestText')
                .success(function (data) {
                    console.log('som succes');
                    $scope.tests = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('som error')
                    console.log('Error: ' + data);
                });
        }


    }])
