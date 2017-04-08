'use strict';

module.exports.register = (server, options, next) => {
    let controller = require('./../controllers');

    server.route([
        /**
         * oauth2 with GG
         */
        // ,{
        //     method : ['GET'],
        //     path: '/auth/google',
        //     config: controller.authGoogle.auth
        // },
        // {
        //     method : ['GET'],
        //     path: '/oauthcallback',
        //     config: controller.authGoogle.getAuthCode
        // }

    ]);
};

module.exports.register.attributes = {
    name: 'Oauth Router',
    version: global.helpers.pkg.version
};