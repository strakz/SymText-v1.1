angular.module('SymText', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute','mgcrea.ngStrap'])
    .config(['$locationProvider','$routeProvider', function($locationProvider,  $routeProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                //controller: 'MainCtrl'
            })
            .when('/freeWrite', {
                templateUrl: 'templates/freeWrite.html',
                controller: 'FreeWrtCtrl'
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
                templateUrl: 'templates/createTest.html'
            })
            .when('/ex',{
                templateUrl: 'templates/example.html',
                controller: 'ExCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
