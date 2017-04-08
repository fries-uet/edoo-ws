'use strict';

module.exports.register = (server, options, next) => {
    let controller = require('./../controllers');

    server.route([
        /**
         * class
         */
        {
            method: ['GET'],
            path: '/classes',
            config: controller.class.getclass
        },
        {
            method: ['GET'],
            path: '/timetable',
            config: controller.class.getTimetable
        }

    ]);
};

module.exports.register.attributes = {
    name: 'Class Router',
    version: global.helpers.pkg.version
};