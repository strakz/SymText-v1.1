angular.module('SymText')
    .controller('StudentListCtrl', function($scope, $http) {

        $scope.students = [];
        $scope.showList = false;
        $scope.role = '';

        $http.get('/api/getAllStudents').success(function (data) {
            // now we have all our movies and can add them
            $scope.students = data;
            console.log(data.length);
            console.log($scope.students.length);

            if ($scope.students.length > 0) {
                $scope.showList = true;
            } else {
                $scope.showList = false;
            }
        });

        $scope.edit=function(student){
            console.log(student.student._id);
            console.log(student)

        }
    });
