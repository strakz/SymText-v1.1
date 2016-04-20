angular.module('SymText')
    .controller('CreateWordCtrl', ['$scope', '$http', '$alert', function ($scope, $http, $alert) {
        $scope.word = {singleSelect : null};
        var formdata = new FormData();
        //$scope.data = {singleSelect :null};
        $scope.create = function () {
            $http.post('/api/words', $scope.word)
                .success(function (data) {
                    console.log("succes http angular");
                    console.log(data);
                    console.log(data._id);
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
        };
        $scope.imgupload = function () {
            //$http.post('/api/imgUp', $scope.img)
            $http({
                url: '/api/imgUp',
                method: "POST",
                headers: {"Content-Type": undefined},
                data: $scope.filefield,
            })
                .success(function (data) {
                        console.log('vykonane spravne');
                        console.log(data);
                    }
                )
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
    }]);
