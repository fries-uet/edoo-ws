'use strict';

module.exports.register = (server, options, next) => {
    let controller = require('./../controllers');

    server.route([
        /**
         * post
         */
        {
            method: ['GET'],
            path: '/posts/{class_id}',
            config: controller.post.getpost
        },

        {
            method: ['GET'],
            path: '/classes/{class_id}/posts',
            config: controller.post.getpost
        },

        {
            method: ['GET'],
            path: '/posts/{class_id}/page/{page_number}',
            config: controller.post.getPostsInPage
        },
        {
            method: ['POST'],
            path: '/post',
            config: controller.post.postPost
        },
        {
            method: ['POST'],
            path: '/updatepost',
            config: controller.post.updatePost
        },
        {
            method: ['GET'],
            path: '/post/{post_id?}',
            config: controller.post.postDetail
        },

        {
            method : ['POST'],
            path: '/deletepost',
            config: controller.post.deletePost
        },

        {
            method : ['POST'],
            path: '/seen',
            config: controller.post.postSeen
        },

        /**
         * solve
         */
        {
            method : ['POST'],
            path: '/solve',
            config: controller.post.postSolve
        },
        {
            method : ['POST'],
            path: '/unsolve',
            config: controller.post.postUnSolve
        },
        {
            method : ['POST'],
            path: '/img',
            config: controller.post.uploadImage
        },
        {
            method : ['POST'],
            path: '/sendsupport',
            config: controller.post.postSupport
        },
        {
            method : ['POST'],
            path: '/upfileevent/{post_id}',
            config: controller.post.upFileToEvent
        },
        {
            method : ['GET'],
            path: '/checkevent/{post_id}',
            config: controller.post.checkEvent
        },
        {
            method : ['GET'],
            path: '/geteventfiles/{post_id}',
            config: controller.post.getUrlFileEvent
        }
    ]);
};

module.exports.register.attributes = {
    name: 'Post Router',
    version: global.helpers.pkg.version
};