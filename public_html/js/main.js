require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        bootstrap: "lib/bootstrap.min"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

define(function (require) {

    var Backbone = require('backbone'),
        Router = require('router'),
        session = require('models/session'),
        boostrap = require('bootstrap');

    session.read();

    session.listenTo(session, 'authChecked', function () {
        var router = new Router();
        Backbone.history.start();
    });

});
