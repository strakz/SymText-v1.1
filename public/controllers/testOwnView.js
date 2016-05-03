angular.module('SymText')
    .controller('TestOwnViewCtrl', ['$scope', '$http', function ($scope, $http) {
        var testId = '5726aa164a26bbe4180700ea';
        var testText;
        console.log($scope.currentUser)
        $scope.getTests = function () {
            console.log('hned sa vykonala');
            $http({
                url: '/getTestText',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: 'query=' + testId
            }).success(function (response) {
                console.log(response.testText)
                testText = response.testText.split(', ');
                for (var i = 0; i < (testText.length - 1); i++) {
                    var step = i;
                    console.log(i)
                    console.log(testText[i])
                    showImages(i, testText);

                }
            })
        }

        $scope.correct = function () {
            $scope.diss=true;
            var studentText;
            //testText = '';
            $scope.texts = [$scope.text1, $scope.text2, $scope.text3, $scope.text4, $scope.text5, $scope.text6, $scope.text7, $scope.text8, $scope.text9, $scope.text10, $scope.text11, $scope.text12]
            console.log($scope.texts)
            console.log($scope.texts[0])
            for (var i = 0; i < (testText.length - 1); i++) {

                if ($scope.texts[i] === testText[i]) {
                    console.log('ROVNA SA')
                } else {
                    markResult(i);
                }
            }
        }

        // to je na ulozenie ja potrebujem na zobrazenie vysledku
        //$scope.uloz = function () {
        //    testText = '';
        //    $scope.texts = [$scope.text1, $scope.text2, $scope.text3, $scope.text4, $scope.text5, $scope.text6, $scope.text7, $scope.text8, $scope.text9, $scope.text10, $scope.text11, $scope.text12]
        //    console.log($scope.texts)
        //    console.log($scope.texts[0])
        //    for (var i = 0; i < $scope.texts.length; i++) {
        //
        //        if ($scope.texts[i] === undefined) {
        //            console.log(i)
        //        } else {
        //            testText += $scope.texts[i] + ', ';
        //        }
        //    }
        //    $http({
        //        url: '/saveStudentTest',
        //        method: 'POST',
        //        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        //        data: 'query=' + testText
        //    }).success(function (response) {
        //
        //
        //    })
        //
        //}


        function markResult(i) {
            switch (i) {
                case 0:
                    $scope.style1={'border-color':'#cd2a19', 'border-width':'2px', 'background-color': '#ffb3b3'}
                    $scope.txtStyle1 = {'color': '#cd2a19'}
                    break;
                case 1:
                    $scope.style2={'border-color':'#cd2a19', 'border-width':'2px', 'background-color': '#ffb3b3'}
                    $scope.txtStyle2 = {'color': '#cd2a19'}
                    break;
                case 2:
                    $scope.style3={'border-color':'#cd2a19', 'border-width':'2px', 'background-color': '#ffb3b3'}
                    $scope.txtStyle3 = {'color': '#cd2a19'}
                    break;
                case 3:
                    $scope.style4={'border-color':'#cd2a19', 'border-width':'2px', 'background-color': '#ffb3b3'}
                    $scope.txtStyle4 = {'color': '#cd2a19'}
                    break;
                case 4:
                    $scope.style5={'border-color':'#cd2a19', 'border-width':'2px', 'background-color': '#ffb3b3'}
                    $scope.txtStyle5 = {'color': '#cd2a19'}
                    break;
                case 5:
                    $scope.style6={'border-color':'#cd2a19', 'border-width':'2px', 'background-color': '#ffb3b3'}
                    $scope.txtStyle6 = {'color': '#cd2a19'}
                    break;
                case 6:
                    $scope.style7={'border-color':'#cd2a19', 'border-width':'2px', 'background-color': '#ffb3b3'}
                    $scope.txtStyle7 = {'color': '#cd2a19'}
                    break;
                case 7:
                    $scope.style8={'border-color':'#cd2a19', 'border-width':'2px', 'background-color': '#ffb3b3'}
                    $scope.txtStyle8 = {'color': '#cd2a19'}
                    break;
                case 8:
                    $scope.style9={'border-color':'#cd2a19', 'border-width':'2px', 'background-color': '#ffb3b3'}
                    $scope.txtStyle9 = {'color': '#cd2a19'}
                    break;
                case 9:
                    $scope.style10={'border-color':'#cd2a19', 'border-width':'2px', 'background-color': '#ffb3b3'}
                    $scope.txtStyle10 = {'color': '#cd2a19'}
                    break;
                case 10:
                    $scope.style11={'border-color':'#cd2a19', 'border-width':'2px', 'background-color': '#ffb3b3'}
                    $scope.txtStyle11 = {'color': '#cd2a19'}
                    break;
                case 11:
                    $scope.style12={'border-color':'#cd2a19', 'border-width':'2px', 'background-color': '#ffb3b3'}
                    $scope.txtStyle12 = {'color': '#cd2a19'}
                    break;

            }
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
