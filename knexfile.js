'use strict';

require('./app/load-env');
let config = global.helpers.config;

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: config('DB_HOST', 'localhost'),
            user: config('DB_USER', 'root'),
            password: config('DB_PASSWORD', ''),
            database: config('DB_NAME', 'edoo'),
            charset: config('DB_CHARSET', 'utf8')
        },
        seeds: {
            directory: './seed/dev'
        }
    }
};