'use strict';

const bookshelf = require('../../config/bookshelft').bookshelf;
let config = global.helpers.config;

module.exports = bookshelf.Model.extend({
    tableName: 'rep_comments',

    user: function () {
        return this.belongsTo(require('./user'));
    },
    comment: function () {
        return this.belongsTo(require('./comment'));
    }
});