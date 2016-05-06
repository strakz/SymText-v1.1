angular.module('SymText')
    .controller('EditWordCtrl', ['$scope', '$http', '$alert','$routeParams','$location', function ($scope, $http, $alert, $routeParams, $location) {
        $scope.word = {singleSelect : null};
        var formdata = new FormData();
        //$scope.data = {singleSelect :null};
    console.log($routeParams.id)
        //vytvorenie slova a zaslanie do DB
        var wordId;
        $http({
            url: '/editWord',
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'query=' +$routeParams.id
        }).success(function (response) {
            console.log('uspech')
            console.log(response.word)
            $scope.word.word=response.word;
            $scope.word.category = response.category;
            $scope.word.singleSelect= response.wordType;
            $scope.word.id=response._id;

        })


        $scope.edit = function () {
            console.log($scope.word)
            $http.post('/api/editWord', $scope.word)
                .success(function (data) {

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
                    $location.path('/wordlist');
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };
        //Nahrat obrazok
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
