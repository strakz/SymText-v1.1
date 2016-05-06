angular.module('SymText')
    .controller('VyhladavanieTestCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.find = {};
        //$scope.odpoved = {};
        if($scope.odpoved === undefined){
            $scope.odpoved='';
        }

        //pomocna metoda pri vyhladavani slov ..pripavena funkcionalita na autocompleete
        $scope.hladaj = function () {
            //$http.post('/api/words', $scope.find.slovo)
            $http({
                url: '/api/hladaj',
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                data: $scope.find
            })

                .success(function (response) {
                    $scope.find = {};
                    $scope.find.word = response.filename;
                    if (response.filename === undefined) {
                        console.log('nemalo by pisat nic');
                    } else {

                        $scope.odpoved +=response.filename+', ';
                        $scope.idimg += response.imageID;
                    }
                })
                .error(function (data) {
                    console.log('ERROR TU JE ' + data);
                })
        }

    }]);
