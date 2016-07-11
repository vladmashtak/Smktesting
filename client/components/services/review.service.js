'use strict';

angular.module('LightIt.auth')
    .factory('Review', ReviewResource);

ReviewResource.$inject = ['$resource'];

function ReviewResource($resource) {

    return $resource('/api/reviews/:id', {id: '@id'}, {
        getReview: {
            method: 'GET'
        },
        postReview: {
            method: 'Post'
        }
    });
}