'use strict';

const bookshelf = require('../../config/bookshelft').bookshelf;
let config = global.helpers.config;

module.exports = bookshelf.Model.extend({
    tableName: 'attack_files',
    user: function () {
        return this.belongsTo(require('./user'));
    }
});