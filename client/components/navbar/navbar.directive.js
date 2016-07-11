'use strict';

angular.module('LightIt')
    .directive('navbar', function () {
        return {
            templateUrl: 'components/navbar/navbar.html',
            restrict: 'E',
            controller: 'NavbarController',
            controllerAs: 'nav'
        }
    });