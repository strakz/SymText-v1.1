angular.module('SymText')
    .controller('SignupCtrl', ['$scope', 'Auth', function($scope, Auth) {
        $scope.singleSelect;
        $scope.signup = function() {
            Auth.signup({
                username: $scope.username,
                password: $scope.password,
                fullname: $scope.fullname,
                role: $scope.role,
                singleSelect: $scope.singleSelect

            });
        };
    }]);
