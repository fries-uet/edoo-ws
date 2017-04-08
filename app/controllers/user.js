'use strict';

const _ = require('lodash');
const Boom = require('boom');
const Models = global.Models;
const bcrypt = require('bcrypt');
const Joi = require('joi');
const ResponseJSON = global.helpers.ResponseJSON;
const commons = global.helpers.commons;
const service = require('../services');

/***
 * Login POST
 */
module.exports.loginPost = {
    handler: function (request, reply) {

        const post = request.payload;
        let email = _.get(post, 'email', '');
        let password = _.get(post, 'password', '');

        new Models.User({
            email: email
        }).fetch().then(function (user) {
            if (_.isEmpty(user)) {//Email doesn't exist
                return reply(Boom.unauthorized('Email doesn\'t exist!'));
            }

            bcrypt.compare(password, user.get('password'), function (err, res) {
                if (!res) {//Password invalid
                    return reply(Boom.unauthorized('Invalid password!'));
                }

                // save token
                service.user.saveNewToken(user.toJSON(), function (err, responseData) {
                    if (!err) {
                        return reply(ResponseJSON('Login success!', responseData));
                    } else {
                        return reply(Boom.badRequest('Something went wrong!'));
                    }
                });
            });
        });
    },
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    auth: false
};

/**
 * Logout
 */
module.exports.logout = {
    handler: function (request, reply) {
        let user_data = request.auth.credentials;
        // let _id = _.get(user_data, 'id', '');
        let tokenId = _.get(user_data, 'token_id', '');

        new Models.Token({
            id: tokenId
        }).destroy().then(function (token) {
            if (_.isEmpty(token)) {
                return reply(Boom.badRequest('Some thing went wrong!'));
            }

            return reply(ResponseJSON('Logout success!'));
        }).catch(function () {
            return reply(Boom.badRequest('Some thing went wrong!'));
        });
    },
    auth: {
        mode: 'required',
        strategies: ['jwt']
    }
};

/**
 * Register firebase token
 */

module.exports.registerFirebaseToken = {
    handler: function (req, rep) {
        let user_data = req.auth.credentials;
        let user_id = _.get(user_data, 'id', '');
        let token_id = _.get(user_data, 'token_id', '');

        let post = req.payload;
        let type = _.get(post, 'type', '');
        let device_token = _.get(post, 'token', '');

        if (type !== 'android' && type !== 'ios' && type !== 'web') {
            return rep(Boom.badData('invalid type, the type is: android/ios/web'));
        }

        service.user.saveFcmToken(user_id, type, token_id, device_token, function (err, res) {
            if (!err) {
                return rep(ResponseJSON('Resgister FCM success', res));
            } else {
                return rep(Boom.badData('Something went wrong!'));
            }
        })
    },
    auth: {
        mode: 'required',
        strategies: ['jwt']
    },
    validate: {
        payload: {
            type: Joi.string().required(),
            token: Joi.string().required()
        }
    }
};

module.exports.getSolveVote = {
    handler: function (req, rep) {
        let user_data = req.auth.credentials;
        let user_id = _.get(user_data, 'id', '');

        service.post.getSolveCount(user_id, function (res) {
            rep(ResponseJSON('Success', res));
        });

    },
    auth: {
        mode: 'required',
        strategies: ['jwt']
    }
};


module.exports.getProfile = {
    handler: function (req, rep) {
        let user_data = req.auth.credentials;
        let user_id = _.get(user_data, 'id', '');

        service.user.getUserInfo(user_id, function (res) {
            // let solveCount = res.solve_count;
            // let voteCount = res.vote_count;
            //
            // let point = solveCount*40 + voteCount*5;
            //
            // let response = {
            //     point: point
            // };

            rep(ResponseJSON('Success', res));
        });

    },
    auth: {
        mode: 'required',
        strategies: ['jwt']
    }
};


module.exports.updateProfile = {
    handler: function (req, rep) {
        let user_data = req.auth.credentials;
        let payload = req.payload;
        let user_id = _.get(user_data, 'id', '');
        let favorite = _.get(payload, 'favorite', '');
        let description = _.get(payload, 'description', '');

        service.user.updateUserProfile(user_id, favorite, description, function (res) {
            rep(ResponseJSON('Success', res));
        });

    },
    auth: {
        mode: 'required',
        strategies: ['jwt']
    },
    validate: {
        payload: {
            description: Joi.string().optional(),
            favorite: Joi.string().optional()
        }
    }
};


module.exports.changePassword = {
    handler: function (req, rep) {
        let user_data = req.auth.credentials;
        let payload = req.payload;
        let user_id = _.get(user_data, 'id', '');
        let old_password = _.get(payload, 'old_password', '');
        let new_password = _.get(payload, 'new_password', '');

        let passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        // validate password with regex:
        // 1. length >= 8
        // 2. must contain at least 1 number
        if (!passwordReg.test(new_password)) {
            return rep(Boom.badData('Mật khẩu bao gồm ít nhất 8 các kí tự chữ cái và số, không chứa các kí tự đặc biệt'));
        }

        service.user.changePassword(user_id, old_password, new_password, function (err, res) {
            if (!err) {
                return rep(ResponseJSON('Success', res));
            } else {
                return rep(Boom.badData(res));
            }
        });

    },
    auth: {
        mode: 'required',
        strategies: ['jwt']
    },
    validate: {
        payload: {
            old_password: Joi.string().required(),
            new_password: Joi.string().required()
        }
    }
};

module.exports.sendResetPass = {
    handler: function (req, rep) {
        let payload = req.payload;
        let email = _.get(payload, 'email', '');
        let code = _.get(payload, 'code', '');

        service.user.sendResetPass(email, code, function (err, resData) {
            if (!err) {
                rep(ResponseJSON('Send success', resData));
            } else {
                rep(Boom.badData(resData));
            }
        });
    },
    auth: false,
    validate: {
        payload: {
            email: Joi.string().email().required(),
            code: Joi.string().required()
        }
    }
};

module.exports.resetPass = {
    handler: function (req, rep) {
        let user_data = req.auth.credentials;
        let payload = req.payload;
        let user_id = _.get(user_data, 'id', '');
        let is_token_refresh_pass = _.get(user_data, 'is_token_refresh_pass', false);
        let new_password = _.get(payload, 'new_password', '');

        if (!is_token_refresh_pass) {
            return rep(Boom.badData('Token is invalid'));
        }

        service.user.resetNewPass(user_id, new_password, function (err, resData) {
            if (!err) {
                rep(ResponseJSON('Reset password success', resData));
            } else {
                rep(Boom.badData(resData));
            }
        });
    },
    auth: {
        mode: 'required',
        strategies: ['jwt']
    },
    validate: {
        payload: {
            new_password: Joi.string().required()
        }
    }
};

module.exports.uploadAvatar = {
    handler: function (req, rep) {
        let user_data = req.auth.credentials;
        let user_id = _.get(user_data, 'id', '');
        let user_code = _.get(user_data, 'code', '');
        let data = req.payload;

        if (data.file) {
            let file = data.file;
            // check mime type ?= image
            // let headers = file.hapi.headers;

            service.file.saveFileAndGetStaticURL(file, user_code, function (err, res) {
                if (!err) {
                    rep(ResponseJSON('Upload success!', res));

                    // save to db
                    new Models.User({
                        id: user_id
                    }).save({avatar: res.url}, {method: 'update', patch: true});
                } else {
                    rep(Boom.badData('Something went wrong!'));
                }
            });
        } else {
            rep(Boom.badData('Data is wrong!'));
        }
    },
    auth: {
        mode: 'required',
        strategies: ['jwt']
    },
    payload: {
        output: 'stream',
        maxBytes: 2097152,
        allow: 'multipart/form-data',
        parse: true
    }
};

module.exports.getClassRank = {
    handler: function (req, rep) {
        let user_data = req.auth.credentials;
        let user_id = _.get(user_data, 'id', '');
        let class_id = encodeURIComponent(req.params.class_id);

        service.user.getClassRank(class_id, function (err, res) {
            if (!err) {
                return rep(ResponseJSON('Success', res));
            } else {
                return rep(Boom.badData(res));
            }
        })
    },
    auth: {
        mode: 'required',
        strategies: ['jwt']
    }
};



