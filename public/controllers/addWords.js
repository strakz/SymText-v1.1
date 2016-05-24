angular.module('SymText')
    .controller('AddWordsCtrl', ['$scope', '$http', '$alert','$location', function ($scope, $http, $alert, $location) {

        //ulozenie slov a zaslanie na stranu servera na spracovanie a ulozenie
        $scope.addwords = function () {
            console.log($scope.word.mainWord);
            console.log($scope.word.names);
            var lng = $scope.word.names
            console.log(lng.length)
            for (var i = 0; i < lng.length; i++) {
                console.log(lng[i])
                $http({
                    url: '/api/wordsadd',
                    method: "POST",
                    data: {'word': lng[i], 'mainWord': $scope.word.mainWord}
                })
                    .success(function (data) {
                            console.log('vykonane spravne');
                            console.log(data);
                            $location.path('/ucitelmenu')
                        }
                    )
                    .error(function (data) {
                        console.log('Error: ' + data);
                        $alert({
                            title: 'CHYBA !',
                            content: 'Slovo v zakladnom tvare neexistuje.',
                            placement: 'top-right',
                            type: 'danger',
                            duration: 5
                        });
                        $scope.word.mainWord = '';
                    });

            }
        }


    }])
