angular.module('SymText')
    .controller('EditUserCtrl', ['$scope', '$routeParams', '$http','$location', function ($scope, $routeParams, $http, $location) {

        console.log($routeParams.id)

        $http({
            url: '/api/getEditedUser',
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'query=' + $routeParams.id
        }).success(function (response) {
            console.log('uspech')
            console.log(response.username)
            $scope.username = response.username;
            $scope.password = response.password;
            $scope.confirmPassword = response.password;
            $scope.fullname = response.fullname;
            $scope.singleSelect = response.role;
            $scope.userID=response._id;
            console.log(response._id)

        });
        $scope.signup = function () {
            var user = {
                username: $scope.username,
                password: $scope.password,
                fullname: $scope.fullname,
                role: $scope.role,
                singleSelect: $scope.singleSelect,
                userID: $scope.userID

            }

            $http.post('/api/saveEdited', user)
                .success(function () {
                    $location.path('/adminmenu');

                    $alert({
                        title: 'Vitajte!',
                        content: 'Registrácia prebehla úspešne.',
                        placement: 'top-right',
                        type: 'success',
                        duration: 3
                    });
                })
                .error(function (response) {
                    $alert({
                        title: 'Chyba! Zadajte iné prihlasovacie meno',
                        content: response.data,
                        placement: 'top-right',
                        type: 'danger',
                        duration: 10
                    });
                });
        }
    }]);
