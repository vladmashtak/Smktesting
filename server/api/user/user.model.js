'use strict';

var crypto = require('crypto'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');

var UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    provider: String,
    salt: String
});

/**
 * Virtuals
 */

// Public profile information
UserSchema
    .virtual('profile')
    .get(function () {
        return {
            '_id': this._id,
            'name': this.name,
            'email': this.email
        };
    });


UserSchema
    .virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} password
     * @return {Boolean}
     * @api public
     */
    authenticate: function (password) {
        return this.hashedPassword === this.encryptPassword(password);
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function (password) {
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
};

exports.User = mongoose.model('User', UserSchema);