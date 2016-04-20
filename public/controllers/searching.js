angular.module('SymText')
    .controller('SrchCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.userInput = {};
        if($scope.slovo === undefined){
            $scope.slovo='';
        }
        if($scope.idimg === undefined){
            $scope.idimg='';
        }

        $scope.$watch('userInput.text', function () {
            console.log('tu dojdem');
            console.log($scope.userInput);
            $http({
                url: '/api/searchExample',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: $scope.userInput
            }).success(function (response) {
                console.log(response.length);
                $scope.slovo='';
                $scope.idimg='';
                for(var i=0; i< response.length; i++) {
                    console.log(response[i].word +' ma ID obrazku: '+ response[i].imageID);
                   // console.log(angular.toJson(response[i].imageID));
                    $scope.slovo += response[i].word+ ', ';
                    $scope.idimg += response[i].imageID +', ';
                }
            })
            $http({
                url: '/nieco',
                method: 'get',
                params :{
                    id: response[0].imageID
                }

            }).success(function(response){
                console.log(response);
            });

        })
    }])

//function showResult(){
//    if (response.filename === undefined) {
//        console.log('nemalo by pisat nic');
//    } else {
//
//        $scope.odpoved +=response.filename+', ';
//        $scope.idimg += response.imageID;
//    }
//}
