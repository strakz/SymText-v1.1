angular.module('SymText')
    .controller('AllTestListCtrl', function($scope, $http) {

        $scope.tests = [];
        $scope.showList = false;

        //vrati list testov
        $http.get('/api/alltests').success(function (data) {
            // now we have all our movies and can add them
            $scope.tests = data;
            console.log(data.length);
            console.log($scope.tests.length);

            if ($scope.tests.length > 0) {
                $scope.showList = true;
            } else {
                $scope.showList = false;
            }
        });

        $scope.edit=function(tests){
            //console.log(student.student._id);
            console.log(tests.test._id)

        }
    });
