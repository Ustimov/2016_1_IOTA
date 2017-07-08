define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var UserModel = Backbone.Model.extend({

        url: '/api/user',

        defaults: {
            id: -1
        },

        setId: function (id) {
            this.set('id', id);
        },

        read: function () {
            this.fetch({
                url: this.url + '/' + this.get('id'),
                success: function (model, response) {
                    console.log(response);
                },
                error: function (model, response) {
                    console.log(response);
                }
            });
        },

        delete: function (id) {
            this.destroy({
                url: this.url + '/' + this.get('id'),
                success: function (model, response) {
                    console.log(response);
                },
                error: function (model, response) {
                    console.log(response);
                }
            });
        },

        create: function (login, password, email) {
            this.save({login: login, password: password, email: email}, {
                success: function (model, response) {
                    console.log(response);
                    if (response.__ok) {
                        model.trigger('registerOk');
                    } else {
                        model.trigger('registerError', 'Ошибка регистрации');
                    }
                },
                error: function (model, response) {
                    console.log(response);
                    if (response.status === 222) {
                        model.trigger('registerError', 'Приложение оффлайн!');
                    } else {
                        model.trigger('registerError', 'Ошибка регистрации');
                    }
                }
            });
        },

        update: function (login, password, email) {
            this.save({login: login, password: password, email: email},{
                url: this.url + '/' + this.get('id'),
                success: function (model, response) {
                    console.log(response);
                },
                error: function (model, response) {
                    console.log(response);
                }
            });
        }

    });

    return new UserModel();

});