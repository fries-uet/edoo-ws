'use strict';

module.exports.register = (server, options, next) => {
    let controller = require('./../controllers');

    server.route([
        /**
         * comment
         */
        {
            method : ['POST'],
            path: '/cmt',
            config: controller.post.postCmt
        },
        {
            method : ['POST'],
            path: '/deletecmt',
            config: controller.post.deleteCmt
        },

        {
            method : ['GET'],
            path : '/repcmt/{comment_id}',
            config : controller.post.getRepComments
        },
        {
            method : ['POST'],
            path : '/repcmt',
            config : controller.post.postRepCmt
        },


    ]);
};

module.exports.register.attributes = {
    name: 'Comment Router',
    version: global.helpers.pkg.version
};