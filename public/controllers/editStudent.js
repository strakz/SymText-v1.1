angular.module('SymText')
    .controller('EditStudentCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {

        console.log($routeParams.id)
        $http({
            url: '/api/geteditedStudent',
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: 'query=' + $routeParams.id
        }).success(function (response) {
            console.log('uspech')
            console.log(response)
            $scope.username = response.username;
            $scope.password = response.password;
            $scope.fullname = response.fullname;


        });

        $scope.signup = function () {
            var user = {
                username: $scope.username,
                password: $scope.password,
                fullname: $scope.fullname,
                userID:$routeParams.id

            }
            $http.post('/api/editStudent',user)
            .success(function (response) {
                console.log('ulozeno');
                $location.path('/adminmenu')
                })


        }

    }]);
