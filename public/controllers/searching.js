angular.module('SymText')
    .controller('SrchCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.userInput = {};
        if ($scope.slovo === undefined) {
            $scope.slovo = '';
        }
        if ($scope.idimg === undefined) {
            $scope.idimg = '';
        }
        var text;
        var data;

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
                $scope.slovo = '';
                $scope.idimg = '';
                if (response.length === 0) {
                    $scope.slovo = 'Bohuzial slovo sa nenachádza v databáze';
                } else {
                    //$scope.slovo += response[i].word + ', ';
                    //$scope.idimg += response[i].imageID + ', ';
                    $scope.slovo = response.word;
                    $scope.idimg = response.imageID
                }
                for (var i = 0; i < response.length; i++) {
                    console.log(response[i].word + ' ma ID obrazku: ' + response[i].imageID);
                    // console.log(angular.toJson(response[i].imageID));
                    $scope.slovo += response[i].word + ', ';
                    $scope.idimg += response[i].imageID + ', ';
                }
            })
            //$http({
            //    url: '/nieco',
            //    method: 'get',
            //    params :{
            //        id: response[0].imageID
            //    }
            //
            //}).success(function(response){
            //    console.log(response);
            //});

        })
        $scope.$watch('userInput.obrazok', function () {

            $http({
                url: '/imgskuska',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: $scope.userInput
            }).success(function (response) {

                //console.log(response);
                $scope.data = response;
            })
            //text='';
            //getImage($scope.userInput,$scope.data);

            //$scope.data = text;
        })
        $scope.$watch('userInput.obrazok2', function () {

            $http({
                url: '/imgskuska',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: $scope.userInput
            }).success(function (response) {

                //console.log(response);
                $scope.data2 = response;
            })

        })
        $scope.$watch('userInput.obrazok3', function () {

            $http({
                url: '/imgskuska',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: $scope.userInput
            }).success(function (response) {

                //console.log(response);
                $scope.data3 = response;
            })

        })
        $scope.$watch('userInput.obrazok4', function () {

            $http({
                url: '/imgskuska',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: $scope.userInput
            }).success(function (response) {

                //console.log(response);
                $scope.data4 = response;
            })

        })


        function getImage(daco,nieco) {
            console.log(daco)
            $http({
                url: '/imgskuska',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: daco
            }).success(function (response) {
                //if (response != '') {
                //    console.log('neni null')
                //    text = response;
                //    console.log(response.data)
                //
                //}
                return response

                //console.log(response);
                //$scope.data2 = response;
                //text = response;

            })
            console.log(text);
        };

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
