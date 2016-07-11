'use strict';

angular.module('LightIt.auth')
    .factory('Auth', AuthService);

AuthService.$inject = ['$location', '$http', '$cookies', '$q', 'Util', 'User'];

function AuthService($location, $http, $cookies, $q, Util, User) {
    var safeCb = Util.safeCb,
        currentUser = {};

    if ($cookies.get('token') && $location.path() !== '/logout') {
        currentUser = User.get();
    }

    return {
        login: login,
        logout: logout,
        createUser: createUser,
        changePassword: changePassword,
        getCurrentUser: getCurrentUser,
        isLoggedIn: isLoggedIn,
        getToken: getToken
    };


    /**
     * Authenticate user and save token
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    function login(_ref, callback) {

        var email = _ref.email;
        var password = _ref.password;

        return $http.post('/auth/local', {
            email: email,
            password: password
        }).then(function (res) {
            $cookies.put('token', res.data.token);
            currentUser = User.get();
            return currentUser.$promise;
        }).then(function (user) {
            safeCb(callback)(null, user);
            return user;
        }).catch(function (err) {
            logout();
            safeCb(callback)(err.data);
            return $q.reject(err.data);
        });
    }

    /**
     * Delete access token and user info
     */
    function logout() {
        $cookies.remove('token');
        currentUser = {};
    }

    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    function createUser(user, callback) {
        return User.save(user, function (data) {
            $cookies.put('token', data.token);
            currentUser = User.get();
            return safeCb(callback)(null, user);
        }, function (err) {
            logout();
            return safeCb(callback)(err);
        }).$promise;
    }

    /**
     * Change password
     *
     * @param  {String}   oldPassword
     * @param  {String}   newPassword
     * @param  {Function} callback    - optional, function(error, user)
     * @return {Promise}
     */
    function changePassword(oldPassword, newPassword, callback) {
        return User.changePassword({
            id: currentUser._id
        }, {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, function () {
            return safeCb(callback)(null);
        }, function (err) {
            return safeCb(callback)(err);
        }).$promise;
    }

    /**
     * Gets all available info on a user
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, funciton(user)
     * @return {Object|Promise}
     */
    function getCurrentUser(callback) {
        if (arguments.length === 0) {
            return currentUser;
        }

        var value = currentUser.hasOwnProperty('$promise') ? currentUser.$promise : currentUser;
        return $q.when(value)
            .then(function (user) {
                safeCb(callback)(user);
                return user;
            }, function () {
                safeCb(callback)({});
                return {};
            });
    }

    /**
     * Check if a user is logged in
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, function(is)
     * @return {Bool|Promise}
     */
    function isLoggedIn(callback) {
        if (arguments.length === 0) {
            return currentUser.hasOwnProperty('_id');
        }

        return getCurrentUser(null)
            .then(function (user) {
                var is = user.hasOwnProperty('_id');
                safeCb(callback)(is);
                return is;
            });
    }

    /**
     * Get auth token
     *
     * @return {String} - a token string used for authenticating
     */
    function getToken() {
        return $cookies.get('token');
    }
}