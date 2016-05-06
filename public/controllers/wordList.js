angular.module('SymText')
    .controller('WordsListCtrl', function($scope, $http) {

        $scope.words = [];
        $scope.showList = false;

        //list vsetkych slov
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

        $scope.edit = function (word) {
            console.log(word.word._id);
            console.log(word)
        };

        $scope.delete = function (word) {
            console.log(word.word._id);
            $http({
                url: '/api/deleteWord',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: 'query=' + word.word._id
            }).success(function (response) {
                console.log('uspesne zmazalo');
                location.reload();
            })
        };
    });
