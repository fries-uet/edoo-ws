'use strict';

const bookshelf = require('../../config/bookshelft').bookshelf;
let config = global.helpers.config;

module.exports = bookshelf.Model.extend({
    tableName: 'votes',

    user: function () {
        return this.belongsTo(require('./user'));
    },
    post: function () {
        return this.belongsTo(require('./post'));
    },
    comment: function () {
        return this.belongsTo(require('./comment'));
    }
});