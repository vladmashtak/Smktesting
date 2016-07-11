'use strict';

var crypto = require('crypto'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');

var ProductSchema = new Schema({
    title: String,
    image: String,
    text: String
});

ProductSchema
    .virtual('product')
    .get(function () {
        return {
            'title': this.title,
            'image': this.image,
            'text': this.text
        };
    });

exports.Product = mongoose.model('Product', ProductSchema);