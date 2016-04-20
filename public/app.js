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
                controller: 'imgupCtrl'
            })
            .when('/searchtest',{
                templateUrl: 'templates/searching.html',
                controller: 'SrchCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
