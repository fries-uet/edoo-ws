'use strict';

const bookshelf = require('../../config/bookshelft').bookshelf;
let config = global.helpers.config;

module.exports = bookshelf.Model.extend({
    tableName: 'tokens',

    firebase_token: function () {
        return this.hasOne(require('./firebase-token'))
    },
    user: function () {
        return this.belongsTo(require('./user'));
    }
});