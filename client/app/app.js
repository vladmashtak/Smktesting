'use strict';

angular.module('LightIt', ['LightIt.auth', 'LightIt.service', 'ui.bootstrap',
    'ngCookies', 'ngResource', 'ngSanitize', 'ui.router',
    'validation.match'
])
    .config(function ($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
    });
