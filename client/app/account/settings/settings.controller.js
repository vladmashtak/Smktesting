'use strict';

angular.module('LightIt')
    .controller('SettingsController', SettingsController);

SettingsController.$inject = ['Auth'];

function SettingsController (Auth) {
    //viewModel
    var vm = this;

    vm.Auth = Auth;
    vm.errors = {};
    vm.message = '';
    vm.changePassword = changePassword;

    function changePassword (form) {
        vm.submitted = true;

        if (form.$valid) {
            vm.Auth.changePassword(vm.user.oldPassword, vm.user.newPassword, function (err) {
                if (err) console.log(err);
            }).then(function () {
                vm.message = 'Password successfully changed.';
            }).catch(function (err) {
                console.log(err.data);
                vm.message = '';
            });
        }
    }
}
