angular.module('SymText')
    .factory('Test', ['$resource', function ($resource) {
        return $resource('/api/tests/:id');
    }]);
