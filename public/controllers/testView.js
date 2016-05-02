angular.module('SymText')
    .controller('TestViewCtrl', ['$scope', '$http', function ($scope, $http) {
        var testId='5726aa164a26bbe4180700ea';

        $scope.search = function (event, fieldValue) {

            console.log(fieldValue)
            $http({
                url: '/imgskuska',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: 'query=' + fieldValue
            }).success(function (response) {

                showResult(fieldValue, response);

            })

        };
        $scope.getTests=function(){
           console.log('hned sa vykonala');
            $http({
                url: '/getTestText',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: 'query=' + testId
            }).success(function (response) {
                console.log(response.testText)


            })
        }

        function showResult(fieldValue, response) {
            switch (fieldValue) {
                case $scope.text1:
                    $scope.data = response;
                    if (data === response) {
                        $scope.txtStyle1 = {'color': '#d62c1a'}
                    } else {
                        $scope.txtStyle1 = {'color': '#258cd1'}
                    }
                    break;

                case $scope.text2:
                    $scope.data2 = response;
                    if (data === response) {
                        $scope.txtStyle2 = {'color': '#d62c1a'}
                    } else {
                        $scope.txtStyle2 = {'color': '#258cd1'}
                    }
                    break;
                case $scope.text3:
                    $scope.data3 = response;
                    if (data === response) {
                        $scope.txtStyle3 = {'color': '#d62c1a'}
                    } else {
                        $scope.txtStyle3 = {'color': '#258cd1'}
                    }
                    break;
                case $scope.text4:
                    $scope.data4 = response;
                    if (data === response) {
                        $scope.txtStyle4 = {'color': '#d62c1a'}
                    } else {
                        $scope.txtStyle4 = {'color': '#258cd1'}
                    }
                    break;
                case $scope.text5:
                    $scope.data5 = response;
                    if (data === response) {
                        $scope.txtStyle5 = {'color': '#d62c1a'}
                    } else {
                        $scope.txtStyle5 = {'color': '#258cd1'}
                    }
                    break;
                case $scope.text6:
                    $scope.data6 = response;
                    if (data === response) {
                        $scope.txtStyle6 = {'color': '#d62c1a'}
                    } else {
                        $scope.txtStyle6 = {'color': '#258cd1'}
                    }
                    break;
                case $scope.text7:
                    $scope.data7 = response;
                    if (data === response) {
                        $scope.txtStyle7 = {'color': '#d62c1a'}
                    } else {
                        $scope.txtStyle7 = {'color': '#258cd1'}
                    }
                    break;
                case $scope.text8:
                    $scope.data8 = response;
                    if (data === response) {
                        $scope.txtStyle8 = {'color': '#d62c1a'}
                    } else {
                        $scope.txtStyle8 = {'color': '#258cd1'}
                    }
                    break;
                case $scope.text9:
                    $scope.data9 = response;
                    if (data === response) {
                        $scope.txtStyle9 = {'color': '#d62c1a'}
                    } else {
                        $scope.txtStyle9 = {'color': '#258cd1'}
                    }
                    break;
                case $scope.text10:
                    $scope.data10 = response;
                    if (data === response) {
                        $scope.txtStyle10 = {'color': '#d62c1a'}
                    } else {
                        $scope.txtStyle10 = {'color': '#258cd1'}
                    }
                    break;
                case $scope.text11:
                    $scope.data11 = response;
                    if (data === response) {
                        $scope.txtStyle11 = {'color': '#d62c1a'}
                    } else {
                        $scope.txtStyle11 = {'color': '#258cd1'}
                    }
                    break;
                case $scope.text12:
                    $scope.data12 = response;
                    if (data === response) {
                        $scope.txtStyle12 = {'color': '#d62c1a'}
                    } else {
                        $scope.txtStyle12 = {'color': '#258cd1'}
                    }
                    break;
            }
        }
    }])
