'use strict';

const bookshelf = require('../../config/bookshelft').bookshelf;
let config = global.helpers.config;

module.exports = bookshelf.Model.extend({
    tableName: 'firebase_tokens',

    user: function () {
        return this.belongsTo(require('./user'));
    },
    token : function () {
        return this.belongsTo(require('./token'))
    }
});