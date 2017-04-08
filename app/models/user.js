'use strict';

const bookshelf = require('../../config/bookshelft').bookshelf;
const jwt = require('jsonwebtoken');

let config = global.helpers.config;
let key = config('SERVER_KEY', '');

module.exports = bookshelf.Model.extend({
    tableName: 'users',

    user_detail: function () {
        return this.hasOne(require('./user-detail'));
    },

    tokens: function () {
        return this.hasMany(require('./token'));
    },

    firebase_tokens: function () {
        return this.hasMany(require('./firebase-token'));
    },

    attack_files: function () {
        return this.hasMany(require('./attack-file'));
    },

    classes: function () {
        return this.belongsToMany(require('./class'), 'users_classes', 'user_id', 'class_id');
    },

    posts: function () {
        return this.hasMany(require('./post'));
    },

    comments: function () {
        return this.hasMany(require('./comment'));
    },

    votes: function () {
        return this.hasMany(require('./vote'));
    },

    supports: function () {
        return this.hasMany(require('./support'));
    },

    /**
     * Get token
     * @return string
     */
    getToken: function () {
        let user = this.toJSON();

        return jwt.sign(user, key);
    }
});

