'use strict';

angular.module('LightIt')
    .controller('ProductController', ProductController);

ProductController.$inject = ['$stateParams', 'Product', 'Review', 'Auth'];

function ProductController($stateParams, Product, Review, Auth) {
    //viewModel
    var vm = this;
    var user = Auth.getCurrentUser();

    vm.submitted = false;
    vm.Review = Review;
    vm.Auth = Auth;

    Product.getProductItem({productID: $stateParams.id})
        .$promise
        .then(function (res) {
            vm.ProductItem = res;
            vm.ProductItem.idProduct = $stateParams.id;
        });

    vm.getReviews = function (idProduct) {
        vm.Review.getReview({id: idProduct})
            .$promise
            .then(function (res) {
                vm.ReviewArray = res.reviews;
                vm.showWarning = (vm.ReviewArray.length > 0) ? false : true;
                vm.hasReview = _.find(vm.ReviewArray, { 'id_user' : {'_id': user._id}});
            })
    };

    vm.createReview = function (form, idProduct) {
        vm.submitted = true;
        if (form.$valid) {
            vm.Review.postReview({id: idProduct}, {rate: vm.rating, review: vm.review, idUser: user._id} )
                .$promise
                .then(function (res) {
                    vm.ReviewArray.push({
                        rate: res.review.rate,
                        text: res.review.text,
                        id_user : {
                            name: user.name,
                            email: user.email
                        }
                    });

                    vm.hasReview = user._id;
                    vm.showWarning = false;
                })
        }
    }
}