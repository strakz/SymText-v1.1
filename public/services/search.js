angular.module('SymText')
    .factory('Search', ['$http', '$location', '$rootScope', '$alert',
        function($http, $location, $rootScope,  $alert) {
            return {
                hladaj: function(user) {
                    return $http.post('/api/hladaj', user)
                        .success(function(data) {
                            $rootScope.currentUser = data;
                            $location.path('/');

                            $alert({
                                title: 'Vitajte!',
                                content: 'Úspešne ste sa prihlásili.',
                                placement: 'top-right',
                                type: 'success',
                                duration: 3
                            });
                        })
                        .error(function() {
                            $alert({
                                title: 'Chyba!',
                                content: 'Zle zadané prihlasovacie meno alebo heslo.',
                                placement: 'top-right',
                                type: 'danger',
                                duration: 3
                            });
                        });
                }


            };
        }]);
