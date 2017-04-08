'use strict';

const bookshelf = require('../../config/bookshelft').bookshelf;
let config = global.helpers.config;

module.exports = bookshelf.Model.extend({
    tableName: 'posts',

    user: function () {
        return this.belongsTo(require('./user'));
    },
    class: function () {
        return this.belongsTo(require('./class'));
    },
    votes: function () {
        return this.hasMany(require('./vote'));
    },
    comments: function () {
        return this.hasMany(require('./comment'));
    },
    seens: function () {
        return this.hasMany(require('./seen'));
    },
    event_extend: function () {
        return this.hasOne(require('./event-extend'))
    },
    attack_files: function () {
        return this.hasMany(require('./attack-file'))
    }
});