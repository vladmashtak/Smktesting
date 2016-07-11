'use strict';

angular.module('LightIt')
    .controller('SignupController', SignupController);

SignupController.$inject = ['Auth', '$state'];

function SignupController(Auth, $state) {
    //viewModel
    var vm = this;

    vm.Auth = Auth;
    vm.$state = $state;
    vm.errors = {};
    vm.register = register;

    function register(form) {
        vm.submitted = true;

        if (form.$valid) {
            vm.Auth.createUser({
                name: vm.user.name,
                email: vm.user.email,
                password: vm.user.password
            }).then(function () {
                // Account created, redirect to home
                vm.$state.go('main');
            }).catch(function (err) {
                console.log(err.data);
            });
        }
    }
}