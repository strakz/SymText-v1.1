angular.module('SymText')
    .controller('CreateWordCtrl', ['$scope', '$http','$alert', function ($scope, $http, $alert) {
        $scope.word = {};
        $scope.create = function () {
            $http.post('/api/words', $scope.word)
                .success(function (data) {
                    console.log("succes http angular");
                    $scope.word = {};
                    $alert({
                        title: 'Uložené !',
                        content: 'Slovo sa úspešne uložilo.',
                        placement: 'top-right',
                        type: 'success',
                        duration: 3
                    });
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
    }]);
