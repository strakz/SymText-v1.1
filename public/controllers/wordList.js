angular.module('SymText')
    .controller('WordsListCtrl', function($scope, $http) {

        $scope.words = [];
        $scope.showList = false;

        $http.post('/api/getwords').success(function (data) {

            $scope.words = data;
            console.log(data.length);
            console.log($scope.words.length);

            if ($scope.words.length > 0) {
                $scope.showList = true;
            } else {
                $scope.showList = false;
            }
        });
    });
