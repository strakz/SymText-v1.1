angular.module('SymText')
    .controller('StudentListCtrl', function ($scope, $http, $location) {

        $scope.students = [];
        $scope.showList = false;
        $scope.role = '';

        //zoznam vsetkyzch studentov
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

        $scope.edit = function (student) {
            console.log(student.student._id);
            console.log(student)
            $location.path('/editstudent/'+student.student._id)
        };

        $scope.delete = function (student) {
            console.log(student.student._id);
            $http({
                url: '/api/deleteStudent',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: 'query=' + student.student._id
            }).success(function (response) {
                console.log('uspesne zmazalo');
                location.reload();
            })
        };

    });
