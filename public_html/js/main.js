require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define(function (require) {

    var Backbone = require('backbone');
    var Router = require('router');
    var SessionModel = require('models/session');
    var messagingCenter = require('messaging_center');

    var session = new SessionModel();
    session.get();

    session.listenTo(messagingCenter, 'authChecked', function (message) {
        console.log(message);
        var router = new Router(session);
        Backbone.history.start();
    });

});
