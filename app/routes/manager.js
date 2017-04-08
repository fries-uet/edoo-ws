'use strict';

module.exports.register = (server, options, next) => {
    let controller = require('./../controllers');

    server.route([
        /**
         * Manager
         */
        {
            method: ['POST'],
            path: '/adduser',
            config: controller.manager.addUser
        },
        {
            method: ['POST'],
            path: '/addclass',
            config: controller.manager.addAClass
        },
        {
            method: ['POST'],
            path: '/joinclass',
            config: controller.manager.joinclass
        },
        {
            method: ['POST'],
            path: '/importexcel',
            config: controller.manager.addUserFromFileExel
        },
        {
            method: ['POST'],
            path: '/updatecode',
            config: controller.manager.updateStudentCode
        }

    ]);
};

module.exports.register.attributes = {
    name: 'Manager Router',
    version: global.helpers.pkg.version
};