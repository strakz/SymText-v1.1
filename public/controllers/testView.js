angular.module('SymText')
    .controller('TestViewCtrl', ['$scope', '$http', '$routeParams', 'Test','$rootScope','$location', function ($scope, $http, $routeParams, Test, $rootScope, $location) {

        console.log($routeParams.id)
        var testName;
        var student = $rootScope.currentUser.fullname
        var testId = $routeParams.id;
        var testText;
        var origText;
        var mistake=0;
        console.log($scope.currentUser)
        $scope.getTests = function () {
            console.log('hned sa vykonala');
            $http({
                url: '/getTestText',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: 'query=' + testId
            }).success(function (response) {
                console.log(response.testText);
                testName=response.testName;
                testText = response.testText.split(', ');
                origText=response.testText.split(', ');
                for (var i = 0; i < (testText.length - 1); i++) {
                    console.log(testText[i])
                    showImages(i, testText);

                }
            })
        }

        $scope.uloz = function () {
            testText = '';
            $scope.texts = [$scope.text1, $scope.text2, $scope.text3, $scope.text4, $scope.text5, $scope.text6, $scope.text7, $scope.text8, $scope.text9, $scope.text10, $scope.text11, $scope.text12]
            console.log($scope.texts)
            console.log($scope.texts[0])
            for (var i = 0; i < $scope.texts.length; i++) {

                if ($scope.texts[i] === undefined) {
                    console.log(i)
                } else {
                    testText += $scope.texts[i] + ', ';
                }

                if(origText[i]===$scope.texts[i]){
                    console.log('ano')

                }else{
                    console.log('ne')
                    mistake++;
                    console.log('chyba  ' +mistake)

                }
            }

            $http({
                url: '/saveStudentTest',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                data: {'query':testText, 'testId': testId, 'student':student, 'testName': testName}
            }).success(function (response) {
                $location.path('/menuziak')

            })

        }


        function showImages(i, testtext) {
            console.log(i)
            $http({
                url: '/imgskuska',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: 'query=' + testText[i]
            }).success(function (response) {
                switch (i) {
                    case 0:
                        $scope.data = response
                        $scope.txtStyle1 = {'color': '#258cd1'}
                        break;
                    case 1:
                        $scope.data2 = response;
                        $scope.txtStyle2 = {'color': '#258cd1'}
                        break;
                    case 2:
                        $scope.data3 = response;
                        $scope.txtStyle3 = {'color': '#258cd1'}
                        break;
                    case 3:
                        $scope.data4 = response;
                        $scope.txtStyle4 = {'color': '#258cd1'}
                        break;
                    case 4:
                        $scope.data5 = response;
                        $scope.txtStyle5 = {'color': '#258cd1'}
                        break;
                    case 5:
                        $scope.data6 = response;
                        $scope.txtStyle6 = {'color': '#258cd1'}
                        break;
                    case 6:
                        $scope.data7 = response;
                        $scope.txtStyle7 = {'color': '#258cd1'}
                        break;
                    case 7:
                        $scope.data8 = response;
                        $scope.txtStyle8 = {'color': '#258cd1'}
                        break;
                    case 8:
                        $scope.data9 = response;
                        $scope.txtStyle9 = {'color': '#258cd1'}
                        break;
                    case 9:
                        $scope.data10 = response;
                        $scope.txtStyle10 = {'color': '#258cd1'}
                        break;
                    case 10:
                        $scope.data11 = response;
                        $scope.txtStyle11 = {'color': '#258cd1'}
                        break;
                    case 11:
                        $scope.data12 = response;
                        $scope.txtStyle12 = {'color': '#258cd1'}
                        break;

                }
            })
        }


    }])
