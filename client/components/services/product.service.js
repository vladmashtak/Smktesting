'use strict';

angular.module('LightIt.auth')
    .factory('Product', ProductResource);

ProductResource.$inject = ['$resource'];

function ProductResource($resource) {
    return $resource('/api/products/:productID', null, {
        query: {
            method: 'GET'
        },
        getProductItem: {
            method: 'GET'
        }
    });
}