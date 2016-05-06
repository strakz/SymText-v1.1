angular.module('SymText')
    .controller('LoginStudentCtrl', ['$scope','$http', 'Auth', function($scope,$http, Auth) {
        var imageArray=[];
        var imageBase64=[];
        //zobrazenie profilovych obrazkov ziakov
        $scope.load=function(){
           $http({
               url: '/api/getAllStudents',
               method: 'GET',

           }).success(function (respns) {
               for (var i = 0; i < (respns.length); i++){
                   $scope.student=respns
                   //console.log(respns[i])
                   //console.log(respns[i].photoId)
                   imageArray.push(respns[i].photoId)
                   console.log(imageArray);
                   showImages(i, imageArray)
               }

           });
       }

        //prihlasenie studenta
$scope.loginSt=function(student){
    console.log(student)
    Auth.login({
        username: student.username,
        password: student.password
    });
}
        ////prihla
        //$scope.login = function() {
        //    Auth.login({
        //        username: $scope.username,
        //        password: $scope.password
        //    });
        //};

        //zobrazenie obrazkov pomocna metoda
        function showImages(i, imageArray) {
            console.log(i)
            console.log(imageArray[i])
            $http({
                url: '/photoStudent',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: 'query=' +imageArray[i]
            }).success(function (response) {
            imageBase64.push(response);
                console.log('vykonane'+i)
                console.log(imageBase64);
                $scope.datas=imageBase64;

            })
        }


    }]);
