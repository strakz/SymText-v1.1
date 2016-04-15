angular.module('SymText')
    .controller('FreeWrtCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.find = {};
        //$scope.odpoved = {};
        $scope.hladaj = function () {
            //$http.post('/api/words', $scope.find.slovo)
               $http({
                   url: '/api/hladaj',
                   method: "POST",
                   headers: {'Content-Type': 'application/json'},
                   data: $scope.find
               })

                .success(function (response) {
                    $scope.find={};
                    $scope.find.word = response.filename;
                    $scope.odpoved += response.filename;//console.log(res.data);
                    //$scope.word = res.data;
                })
                .error(function(data){
                    console.log('ERROR TU JE '+ data);
                })
        }

    }]);
