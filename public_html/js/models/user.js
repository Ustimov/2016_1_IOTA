define(function (require) {

    var Backbone = require('backbone');
    var $ = require('jquery');
    var messagingCenter = require('messaging_center');

    //noinspection UnnecessaryLocalVariableJS
    var UserModel = Backbone.Model.extend({

        userUrl: '/api/user/',

        get: function (id) {
            $.ajax({
                method: 'GET',
                url: this.userUrl + id,
                success: function (data) {
                    console.log(data);
                },
                error: function (data) {
                    console.log(data);
                }
            });
        },

        delete: function (id) {
            $.ajax({
                method: 'DELETE',
                url: this.userUrl + id,
                success: function (data) {
                    console.log(data);
                },
                error: function () {
                    console.log(data);
                }
            });
        },

        create: function (login, password, email) {
            $.ajax({
                method: 'POST',
                url: this.userUrl,
                data: JSON.stringify({
                    'login': login,
                    'password': password,
                    'email': email
                }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.status === 0) {
                        messagingCenter.trigger('registerOk');
                    } else {
                        messagingCenter.trigger('registerError', data.message);
                    }
                },
                error: function () {
                    messagingCenter.trigger('registerError', 'Неизвестная ошибка');
                }
            });
        },

        update: function (login, password, email) {
            $.ajax({
                method: 'POST',
                url: this.userUrl + id,
                data: JSON.stringify({
                    'login': login,
                    'password': password,
                    'email': email
                }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }

    });

    return UserModel;

});