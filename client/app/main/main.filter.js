'use strict';

angular.module('LightIt')
    .filter('makeDescription', makeDescription);

function makeDescription () {
    return function (item) {
        return item.slice(0, 50) + '[...]';
    };
}