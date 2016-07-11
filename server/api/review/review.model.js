'use strict';

var crypto = require('crypto'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');

var ReviewSchema = new Schema({
    rate: Number,
    text: String,
    id_user: {type: Schema.Types.ObjectId, ref: 'User'},
    id_entry: {type: Schema.Types.ObjectId, ref: 'Product'}
});

exports.Review = mongoose.model('Review', ReviewSchema);