'use strict';

angular.module('LightIt')
    .config(function($stateProvider) {
        $stateProvider.state('main', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'vm'
        })
    });
