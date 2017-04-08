'use strict';

const bookshelf = require('../../config/bookshelft').bookshelf;

module.exports = bookshelf.Model.extend({
    tableName: 'user_detail',

    user: function () {
        return this.belongsTo(require('./user'));
    }
});