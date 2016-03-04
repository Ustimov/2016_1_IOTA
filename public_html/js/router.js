define(function (require) {

    var Backbone = require('backbone');
    var GameView = require('views/game');
    var LoginView = require('views/login');
    var MainView = require('views/main');
    var ScoreboardView = require('views/scoreboard');
    var RegistrationView = require('views/registration');
    var SessionModel = require('models/session');
    var messagingCenter = require('messaging_center');
    var UserModel = require('models/user');
    var LogoutView = require('views/logout');


    //noinspection UnnecessaryLocalVariableJS
    var Router = Backbone.Router.extend({

        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'registration': 'regAction',
            'logout': 'logoutAction',
            '*default': 'defaultActions'
        },
        initialize: function (session) {
            this.session = session;
            this.user = new UserModel();

            this.game = new GameView(this.session, this.user);
            this.login = new LoginView(this.session, this.user);
            this.main = new MainView(this.session, this.user);
            this.scoreboard = new ScoreboardView(this.session, this.user);
            this.registration = new RegistrationView(this.session, this.user);
            this.logout = new LogoutView(this.session, this.user);

            this.listenTo(messagingCenter, 'loginOk', this.defaultActions);
            this.listenTo(messagingCenter, 'registerOk', this.defaultActions);
            this.listenTo(messagingCenter, 'logoutOk', this.defaultActions);
            this.listenTo(messagingCenter, 'logoutError', this.defaultActions);
        },

        defaultActions: function () {
            console.log("Second: " + this.session.isAuth);
            this.navigate('/#');
            this.main.show();
        },

        scoreboardAction: function () {
            this.scoreboard.show();
        },

        gameAction: function () {
            this.game.show();
        },

        loginAction: function () {
            this.login.show();
        },

        regAction: function () {
            this.registration.show();
        },

        logoutAction: function () {
            this.logout.show();
        }

    });

    return Router;

});