angular.module('SymText')
    .controller('TestMenuCtrl', ['$scope', '$http', 'Test', function ($scope, $http, Test) {

        $scope.getTests = function () {
               $http.post('/api/getTestText')
                .success(function (data) {
                    for(var i= 0; i<data.length; i++){
                        if(data[i].isVissible ===true){

                            console.log('su visible'+i)
                        }
                    }


                    $scope.tests = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('som error')
                    console.log('Error: ' + data);
                });
        }
        $scope.openTest = function (id) {
            console.log(id)

        }

    }])
