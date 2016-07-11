'use strict';

angular.module('LightIt.auth')
    .run(Run);

Run.$inject = ['$rootScope', '$state', 'Auth'];

function Run($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in, o
    $rootScope.$on('$stateChangeStart', function (event, next) {
        if (!next.authenticate) {
            return;
        }
        console.log(next);
        if (typeof next.authenticate === 'string') {

            return Auth.isLoggedIn(_.noop)
                .then(function (is) {
                    $state.go(is ? 'main' : 'login');
                });
        }
    });
}