'use strict';

module.exports.register = (server, options, next) => {
    let controller = require('./../controllers');

    server.route([
        /**
         * vote
         */
        {
            method : ['POST'],
            path: '/votepost',
            config: controller.post.postVote
        },
        {
            method : ['POST'],
            path: '/votecmt',
            config: controller.post.postVoteCmt
        },
        {
            method : ['POST'],
            path: '/devotecmt',
            config: controller.post.postDeVoteCmt
        },
        {
            method : ['POST'],
            path: '/unvotecmt',
            config: controller.post.postUnVoteCmt
        }


    ]);
};

module.exports.register.attributes = {
    name: 'Vote Router',
    version: global.helpers.pkg.version
};