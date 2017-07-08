define(function (require) {

    var Backbone = require('backbone'),
        ScoreboardView = require('views/scoreboard'),
        GameAuthView = require('views/game_auth'),
        MainView = require('views/main'),
        MainAuthView = require('views/main_auth'),
        ViewManager = require('views/manager'),
        session = require('models/session'),
        user = require('models/user');

    //noinspection UnnecessaryLocalVariableJS
    var Router = Backbone.Router.extend({

        views: {
            scoreboard: new ScoreboardView(),
            gameAuth: new GameAuthView(),
            main: new MainView(),
            mainAuth: new MainAuthView()
        },

        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'logout': 'logoutAction',
            '*default': 'defaultActions'
        },

        initialize: function () {
            this.viewManager = new ViewManager(this.views);
            this.listenTo(session, 'loginOk logoutOk logoutError', this.defaultActions);
            this.listenTo(user, 'registerOk', this.defaultActions);
        },

        defaultActions: function () {
            this.navigate('/#');
            if (session.get('isAuth')) {
                this.show('mainAuth');
            } else {
                this.show('main');
            }
        },

        scoreboardAction: function () {
            this.show('scoreboard');
        },

        gameAction: function () {
            if (session.get('isAuth')) {
                this.show('gameAuth');
            } else {
                window.location.href = "./#";
            }
        },

        logoutAction: function () {
            session.logout();
        },

        show: function (viewName) {
            this.views[viewName].show();
        }

    });

    return Router;

});