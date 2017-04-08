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
            path: '/cmt',
            config: controller.post.postCmt
        },
        {
            method : ['POST'],
            path: '/deletecmt',
            config: controller.post.deleteCmt
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