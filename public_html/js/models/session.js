define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var SessionModel = Backbone.Model.extend({

        url: '/api/session',

        defaults: {
            // Otherwise requests will be not sent
            id: -1,
            isAuth: false
        },

        login: function (login, password) {
            this.save({login: login, password: password}, {
                success: function (model, response) {
                    console.log(response);
                    if (response.__ok) {
                        model.set('isAuth', true);
                        model.trigger('loginOk');
                    } else {
                        model.trigger('loginError', 'Ошибка входа');
                    }
                },
                error: function (model, response) {
                    console.log(response);
                    if (response.status === 222) {
                        model.trigger('loginError', 'Приложение оффлайн!');
                    } else {
                        model.trigger('loginError', 'Неизвестная ошибка');
                    }
                }
            });
        },

        logout: function () {
            this.destroy({
                success: function (model, response) {
                    console.log(response);
                    model.set('isAuth', false);
                    model.trigger('logoutOk');
                },
                error: function (model, response) {
                    console.log(response);
                    model.trigger('logoutError');
                }
            });
        },

        read: function () {
            this.fetch({
                success: function (model, response) {
                    console.log(response);
                    if (response.__ok) {
                        model.set('isAuth', true);
                        model.trigger('readOk', response.id);
                    }
                    model.trigger('authOk', 'Вход выполнен');
                },
                error: function (model, response) {
                    console.log(response);
                    model.trigger('authOk', 'Необходимо выполнить вход');
                }
            });
        }

    });

    return new SessionModel();

});