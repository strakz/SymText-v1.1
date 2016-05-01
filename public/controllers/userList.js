angular.module('SymText')
    .controller('UserListCtrl', function($scope, $http) {

    $scope.users = [];
    $scope.showList = false;
    $scope.role = '';

    //$scope.getMoviesList = function (val) {



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
    });
