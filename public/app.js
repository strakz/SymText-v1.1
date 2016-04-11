angular.module('SymText', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute','mgcrea.ngStrap'])
    .config(['$locationProvider','$routeProvider', function($locationProvider,  $routeProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'MainCtrl'
            })
            .when('/shows/:id', {
                templateUrl: 'templates/detail.html',
                controller: 'DetailCtrl'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'templates/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/add', {
                templateUrl: 'templates/add.html',
                controller: 'AddCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
