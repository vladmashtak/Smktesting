'use strict';

angular.module('LightIt')
    .directive('footer', function () {
        return {
            templateUrl: 'components/footer/footer.html',
            restrict: 'E'
        };
    });