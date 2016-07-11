'use strict';

angular.module('LightIt')
    .controller('NavbarController', NavbarController);

NavbarController.$inject = ['Auth'];

function NavbarController(Auth) {
    //viewModel
    var vm = this;

    vm.isLoggedIn = Auth.isLoggedIn;
    vm.getCurrentUser = Auth.getCurrentUser;

}


