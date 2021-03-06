angular.module('SymText')
    .factory('Auth', ['$http', '$location', '$rootScope', '$cookieStore', '$alert',
        function ($http, $location, $rootScope, $cookieStore, $alert) {
            $rootScope.currentUser = $cookieStore.get('user');
            $cookieStore.remove('user');

            return {
                login: function (user) {
                    return $http.post('/api/login', user)
                        .success(function (data) {
                            $rootScope.currentUser = data;
                            if (data.role === 1) {
                                $location.path('/adminmenu');
                            } else if (data.role === 0) {
                                $location.path('/ucitelmenu');
                            } else if (data.role === 2) {
                                $location.path('/menuziak');
                            }
                            $alert({
                                title: 'Vitajte!',
                                content: 'Úspešne ste sa prihlásili.',
                                placement: 'top-right',
                                type: 'success',
                                duration: 3
                            });
                        })
                        .error(function () {
                            $alert({
                                title: 'Chyba!',
                                content: 'Zle zadané prihlasovacie meno alebo heslo.',
                                placement: 'top-right',
                                type: 'danger',
                                duration: 3
                            });
                        });
                },
                signup: function (user) {
                    return $http.post('/api/signup', user)
                        .success(function () {
                            $location.path('/adminmenu');

                            $alert({
                                title: 'Vitajte!',
                                content: 'Registrácia prebehla úspešne.',
                                placement: 'top-right',
                                type: 'success',
                                duration: 3
                            });
                        })
                        .error(function (response) {
                            $alert({
                                title: 'Chyba! Zadajte iné prihlasovacie meno',
                                content: response.data,
                                placement: 'top-right',
                                type: 'danger',
                                duration: 10
                            });
                        });
                },
                signupStudent: function (user) {
                    return $http.post('/api/signupStudent', user)
                        .success(function () {
                            $location.path('/adminmenu');

                            $alert({
                                title: 'Vitajte!',
                                content: 'Registrácia prebehla úspešne.',
                                placement: 'top-right',
                                type: 'success',
                                duration: 3
                            });
                        })
                        .error(function (response) {
                            $alert({
                                title: 'Chyba! Zadajte iné prihlasovacie meno',
                                content: response.data,
                                placement: 'top-right',
                                type: 'danger',
                                duration: 10
                            });
                        });
                },
                logout: function () {
                    return $http.get('/api/logout').success(function () {
                        $rootScope.currentUser = null;
                        $cookieStore.remove('user');
                        $alert({
                            content: 'Úspešne ste sa odhlásili.',
                            placement: 'top-right',
                            type: 'info',
                            duration: 3
                        });
                        $location.path('/');
                    });
                }
            };
        }]);
