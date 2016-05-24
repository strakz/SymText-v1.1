angular.module('SymText')
    .controller('AllTestListCtrl', function ($scope, $http, $location, $rootScope, $alert) {

        var vissibl;
        if ($rootScope.currentUser != undefined) {
            var currentUser = $rootScope.currentUser.fullname;
        } else {
            $location.path('/login')
        }
        console.log($rootScope.currentUser)
        $scope.tests = [];
        $scope.showList = false;

        //vrati list testov
        $http.get('/api/alltests').success(function (data) {
            // now we have all our movies and can add them
            $scope.tests = data;
            console.log(data.length);
            console.log($scope.tests.length);

            if ($scope.tests.length > 0) {
                $scope.showList = true;
            } else {
                $scope.showList = false;
            }
        });

        $scope.edit = function (tests) {
            //console.log(student.student._id);
            console.log(tests.test._id)
            console.log(tests.test.author)
            if (tests.test.author === currentUser) {
                console.log('rovnaky uzivatelia')
                $location.path('/editTest/' + tests.test._id)
            } else {
                console.log('inaksi')
                $alert({
                    content: 'Nemáte právo upravovať test, ktorý ste nevytvorili.',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 3
                });
            }

            //$location.path('/daco')

        }
        $scope.delete = function (tests) {
            //console.log(student.student._id);
            console.log(tests.test._id)
            console.log(tests.test.author)
            if (tests.test.author === currentUser) {
                console.log('rovnaky uzivatelia')
                $http({
                    url: '/deleteTestText',
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    data: {'testId': tests.test._id}
                }).success(function (response) {
                    console.log('vymazane')
                    location.reload();

                })
            } else {
                console.log('inaksi')
                $alert({
                    content: 'Nemáte právo zmazať test, ktorý ste nevytvorili.',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 3
                });
            }
        }

        $scope.editInfo = function (tests) {
            //console.log(student.student._id);
            console.log(tests.test._id)
            switch (tests.test.isVissible) {
                case true :
                    console.log('je pravda');
                    vissibl = false;
                    break;
                case false:
                    console.log('neni');
                    vissibl = true;
                    break;

            }

            if (tests.test.author === currentUser) {
                console.log('rovnaky uzivatelia')
                $http({
                    url: '/editTestViss',
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    data: {'vissibility': vissibl, 'testId': tests.test._id}
                }).success(function (response) {
                    console.log('zmenene')
                    location.reload();

                })
            } else {
                console.log('inaksi')
                $alert({
                    content: 'Nemáte právo upravovať test, ktorý ste nevytvorili.',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 3
                });
            }
        }

    })
;
