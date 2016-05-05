angular.module('SymText')
    .controller('SignupStudentCtrl', ['$scope', 'Auth', function($scope, Auth) {
        $scope.singleSelect;
        $scope.signup = function() {
            Auth.signupStudent({
                username: $scope.username,
                password: $scope.password,
                fullname: $scope.fullname,
                role: 2,


            });
        };
    }]);
