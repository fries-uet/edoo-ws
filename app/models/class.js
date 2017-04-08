'use strict';

const bookshelf = require('../../config/bookshelft').bookshelf;
let config = global.helpers.config;

module.exports = bookshelf.Model.extend({
    tableName: 'classes',

    lessions: function () {
        return this.hasMany(require('./lession'));
    },

    posts: function () {
        return this.hasMany(require('./post'));
    },

    users: function () {
        return this.belongsToMany(require('./user'), 'users_classes', 'class_id', 'user_id');
    }
});