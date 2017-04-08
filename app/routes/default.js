'use strict';

module.exports.register = (server, options, next) => {

    server.route([
        {//Any request OPTIONS
            path: '/{text*}',
            method: ['OPTIONS'],
            config: {
                handler: function(request, reply) {
                    return reply().code(204);
                }
            }
        }

    ]);
};

module.exports.register.attributes = {
    name: 'Default Router',
    version: global.helpers.pkg.version
};