angular.module('SymText', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute','mgcrea.ngStrap'])
    .config(['$locationProvider','$routeProvider', function($locationProvider,  $routeProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                //controller: 'MainCtrl'
            })
            .when('/vyhladavanieTest', {
                templateUrl: 'templates/vyhladavanieTest.html',
                controller: 'VyhladavanieTestCtrl'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'templates/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/adminmenu',{
                templateUrl: 'templates/adminMenu.html'
            })
            .when('/addtodb', {
                templateUrl: 'templates/addtoDB.html'
                //controller: 'AddCtrl'
            })
            .when('/createWord',{
                templateUrl: 'templates/createWord.html',
                controller: 'CreateWordCtrl'
            })
            .when('/imageupload',{
                templateUrl: 'templates/fileUpload.html',
                controller: 'ImgupCtrl'
            })
            .when('/searchtest',{
                templateUrl: 'templates/searching.html',
                controller: 'SrchCtrl'
            })
            .when('/userlist',{
                templateUrl: 'templates/users.html',
                controller: 'UserListCtrl'
            })
            .when('/wordlist',{
                templateUrl: 'templates/wordlist.html',
                controller: 'WordsListCtrl'
            })
            .when('/addnewords',{
                templateUrl: 'templates/addnewWord.html',
                //controller: 'WordsListCtrl'
            })
            .when('/textarea',{
                templateUrl: 'templates/test.html',
                controller: 'TestCtrl'
            })
            .when('/addwords',{
                templateUrl: 'templates/addWords.html',
                controller: 'AddWordsCtrl'
            })
            .when('/createtest',{
                templateUrl: 'templates/createTest.html',
                controller: 'TestInfoCtrl'
            })
            .when('/freeWrite',{
                templateUrl: 'templates/freeWrite.html',
                controller: 'FreeWriteCtrl'
            })
            .when('/createtesttemplate',{
                templateUrl: 'templates/createTestWords.html',
                controller: 'CreateTestCtrl'
            })
            .when('/testMenu',{
                templateUrl: 'templates/testMenu.html',
                controller: 'TestMenuCtrl'
            })
            .when('/testView',{
                templateUrl: 'templates/testView.html',
                controller: 'TestViewCtrl'
            })
            .when('/testViewOwn',{
                templateUrl: 'templates/testOwnView.html',
                controller: 'TestOwnViewCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
