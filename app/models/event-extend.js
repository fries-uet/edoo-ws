'use strict';

const bookshelf = require('../../config/bookshelft').bookshelf;
let config = global.helpers.config;

module.exports = bookshelf.Model.extend({
    tableName: 'event_extend',
    post: function () {
        return this.belongsTo(require('./post'));
    }
});