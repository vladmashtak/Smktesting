'use strict';

angular.module('LightIt')
    .controller('LoginController', LoginController);

LoginController.$inject = ['Auth', '$state'];

function LoginController(Auth, $state) {
    //viewModel
    var vm = this;

    vm.Auth = Auth;
    vm.$state = $state;
    vm.user = {};
    vm.errors = {};
    vm.submitted = false;
    vm.login = login;

    function login(form) {
        vm.submitted = true;

        if (form.$valid) {
            vm.Auth.login({
                email: vm.user.email,
                password: vm.user.password
            }).then(function () {
                // Logged in, redirect to home
                vm.$state.go('main');
            }).catch(function (err) {
                vm.errors.other = err.message;
            });
        }
    }
}

