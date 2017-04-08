'use strict';

const bookshelf = require('../../config/bookshelft').bookshelf;
let config = global.helpers.config;

module.exports = bookshelf.Model.extend({
    tableName: 'comments',
    votes: function () {
        return this.hasMany(require('./vote'));
    },
    post: function () {
        return this.belongsTo(require('./post'));
    },
    user: function () {
        return this.belongsTo(require('./user'));
    },
    repComments: function () {
        return this.hasMany(require('./rep-comment'));
    }
});