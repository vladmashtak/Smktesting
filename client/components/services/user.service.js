'use strict';

angular.module('LightIt.auth')
    .factory('User', UserResource);

UserResource.$inject = ['$resource'];

function UserResource($resource) {
    return $resource('/api/users/:id/:controller', {
        id: '@_id'
    }, {
        changePassword: {
            method: 'PUT',
            params: {
                controller: 'password'
            }
        },
        get: {
            method: 'GET',
            params: {
                id: 'me'
            }
        }
    });
}