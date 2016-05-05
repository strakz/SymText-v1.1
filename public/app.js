angular.module('SymText', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute','mgcrea.ngStrap'])
    .config(['$locationProvider','$routeProvider', function($locationProvider,  $routeProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'templates/loginStudent.html',
                controller: 'LoginStudentCtrl'
            })
            .when('/menuziak', {
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
            .when('/loginstudent', {
                templateUrl: 'templates/loginStudent.html',
                controller: 'LoginStudentCtrl'
            })
            .when('/loginStudent', {
                templateUrl: 'templates/loginstudentForm.html',
                controller: 'LoginStudentCtrl'
            })
            .when('/signup', {
                templateUrl: 'templates/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/signupStudent', {
                templateUrl: 'templates/signupStudent.html',
                controller: 'SignupStudentCtrl'
            })
            .when('/adminmenu',{
                templateUrl: 'templates/adminMenu.html'
            })
            .when('/ucitelmenu',{
                templateUrl: 'templates/teacherMenu.html'
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
            .when('/photoUpload',{
                templateUrl: 'templates/studentPhotoUpload.html',
                controller: 'PhotoUpldCtrl'
            })
            .when('/searchtest',{
                templateUrl: 'templates/searching.html',
                controller: 'SrchCtrl'
            })
            .when('/userlist',{
                templateUrl: 'templates/users.html',
                controller: 'UserListCtrl'
            })
            .when('/studentlist',{
                templateUrl: 'templates/students.html',
                controller: 'StudentListCtrl'
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
            .when('/tests/:id',{
                templateUrl: 'templates/testView.html',
                controller: 'TestViewCtrl'
            })
            .when('/testOwnMenu',{
                templateUrl: 'templates/testOwnMenu.html',
                controller: 'TestOwnMenuCtrl'
            })
            .when('/testsOwn/:id',{
                templateUrl: 'templates/testOwnView.html',
                controller: 'TestOwnViewCtrl'
            })
            .when('/testHodnotenie',{
                templateUrl: 'templates/testResults.html',
                controller: 'TestRsltCtrl'
            })
            .when('/alltests',{
                templateUrl: 'templates/AllTests.html',
                controller: 'AllTestListCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
