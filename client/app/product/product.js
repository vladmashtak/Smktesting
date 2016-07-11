'use strict';

angular.module('LightIt')
    .config(function($stateProvider) {
        $stateProvider.state('product', {
            url: '/product/:id',
            templateUrl: 'app/product/product.html',
            controller: 'ProductController',
            controllerAs: 'vm'
        })
    });
