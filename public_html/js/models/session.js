define(function (require) {

    var Backbone = require('backbone');
    var $ = require('jquery');
    var messagingCenter = require('messaging_center');

    //noinspection UnnecessaryLocalVariableJS
    var SessionModel = Backbone.Model.extend({

        sessionUrl: '/api/session/',
        isAuth: false,

        login: function (login, password) {
            var self = this;
            $.ajax({
                method: 'PUT',
                url: this.sessionUrl,
                data: JSON.stringify({
                    'login': login,
                    'password': password
                }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.status === 0) {
                        self.isAuth = true;
                        messagingCenter.trigger('loginOk');
                        // TODO
                        console.log(self);
                    } else {
                        messagingCenter.trigger('loginError', data.message);
                    }
                },
                error: function (data) {
                    messagingCenter.trigger('loginError', 'Неизвестная ошибка');
                }
            });
        },

        logout: function () {
            var self = this;
            $.ajax({
                method: 'DELETE',
                url: this.sessionUrl,
                success: function (data) {
                    self.isAuth = false;
                    console.log(data);
                    messagingCenter.trigger('logoutOk');
                },
                error: function(data) {
                    console.log(data);
                    messagingCenter.trigger('logoutError');
                }
            });
        },
        get: function () {
            var self = this;
            $.ajax({
                method: 'GET',
                url: this.sessionUrl,
                success: function (data) {
                    self.isAuth = true;
                    console.log(data);
                    console.log("First: " + self.isAuth);
                    messagingCenter.trigger('authChecked', 'Вход выполнен');
                },
                
                error: function (data) {
                    console.log(data);
                    messagingCenter.trigger('authChecked', 'Необходимо выполненить вход');
                }
            });
        }

    });

    return SessionModel;

});