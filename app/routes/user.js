'use strict';

module.exports.register = (server, options, next) => {
    let controller = require('./../controllers');


    server.route([
        {//Any request OPTIONS
            path: '/{text*}',
            method: ['OPTIONS'],
            config: {
                handler: function(request, reply) {
                    return reply().code(204);
                }
            }
        },

        /**
         * User
         */
        {
            method: ['POST'],
            path: '/login',
            config: controller.user.loginPost
        },
        {
            method: ['GET'],
            path: '/logout',
            config: controller.user.logout
        },
        {
            method: ['POST'],
            path: '/resfcm',
            config: controller.user.registerFirebaseToken
        },
        {
            method: ['GET'],
            path: '/usersolvevote',
            config: controller.user.getSolveVote
        },
        {
            method: ['GET'],
            path: '/profile',
            config: controller.user.getProfile
        },
        {
            method: ['POST'],
            path: '/profile',
            config: controller.user.updateProfile
        },
        {
            method: ['POST'],
            path: '/changepass',
            config: controller.user.changePassword
        },
        {
            method: ['POST'],
            path: '/sendresetpass',
            config: controller.user.sendResetPass
        },
        {
            method: ['POST'],
            path: '/resetpass',
            config: controller.user.resetPass
        },
        {
            method : ['POST'],
            path: '/avatar',
            config: controller.user.uploadAvatar
        },
        {
            method : ['GET'],
            path: '/classrank/{class_id}',
            config: controller.user.getClassRank
        }


    ]);
};

module.exports.register.attributes = {
    name: 'User Router',
    version: global.helpers.pkg.version
};