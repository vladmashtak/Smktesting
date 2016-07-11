'use strict';

angular.module('LightIt.auth', ['LightIt.util', 'ngCookies',
    'ui.router'
])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });