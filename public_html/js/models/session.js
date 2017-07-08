define(function (require) {

    var Backbone = require('backbone'),
        user = require('models/user'),
        socket = require('models/ws');

    //noinspection UnnecessaryLocalVariableJS
    var SessionModel = Backbone.Model.extend({

        url: '/api/session',

        defaults: {
            // Otherwise requests will be not sent
            id: -1,
            isAuth: false,
            ref: -1
        },

        login: function (login, password) {
            this.save({login: login, password: password}, {
                success: function (model, response) {
                    console.log(response);
                    if (response.__ok) {
                        socket.connect();
                        model.set('isAuth', true);
                        model.trigger('loginOk');
                        model.set('ref', response.ref);
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
                    socket.close();
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
                        socket.connect();
                        model.set('isAuth', true);
                        model.set('ref', response.ref);
                        user.setId(response.id);
                        user.read();

                    }
                    model.trigger('authChecked', 'Вход выполнен');
                },
                error: function (model, response) {
                    console.log(response);
                    model.trigger('authChecked', 'Необходимо выполнить вход');
                }
            });
        }

    });

    return new SessionModel();

});