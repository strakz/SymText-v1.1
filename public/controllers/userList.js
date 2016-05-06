angular.module('SymText')
    .controller('UserListCtrl', function($scope, $http) {

    $scope.users = [];
    $scope.showList = false;
    $scope.role = '';

    //$scope.getMoviesList = function (val) {


        //zoznam pouzivatelov
        $http.post('/api/getusers').success(function (data) {
            // now we have all our movies and can add them
            $scope.users = data;
            console.log(data.length);
            console.log($scope.users.length);
            //for(var i=0; i<$scope.users.length; i++){
            //    console.log(data[i].role);
            //    $scope.role = '';
            //    if(data[i].role === 0){
            //        console.log('true');
            //        $scope.role = 'Učiteľ'
            //    }else if(data[i].role === 1){
            //        console.log('false')
            //        $scope.role = 'Administrator'
            //    }
            //}
            // if there any movies we can show the list
            if ($scope.users.length > 0) {
                $scope.showList = true;
            } else {
                $scope.showList = false;
            }
        });

        $scope.edit=function(user){
            console.log(user.user._id)
        };

        $scope.delete = function (user) {
            console.log(user.user._id);
            $http({
                url: '/api/deleteUser',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: 'query=' + user.user._id
            }).success(function (response) {
                console.log('uspesne zmazalo')
                location.reload();
            })
        };
    });
