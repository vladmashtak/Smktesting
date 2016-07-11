'use strict';

angular.module('LightIt')
    .controller('MainController', MainController);

MainController.$inject = ['Product'];

function MainController(Product) {
    //viewModel
    var vm = this;

    vm.Product = Product;
    vm.Product.get()
        .$promise
        .then(function (res) {
            vm.productArray = res.data;
        });
}