define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var Socket = Backbone.Model.extend({

        connect: function () {
            var self = this;
            var attempts = 1;

            this.socket = new WebSocket('wss://' + window.location.hostname + ':' + window.location.port + '/api/ws');

            this.socket.onopen = function() {
                attempts = 1;
                console.log("Соединение установлено.");
            };

            this.socket.onclose = function(event) {
                if (event.wasClean) {
                    console.log('Соединение закрыто чисто');
                } else {
                    console.log('Обрыв соединения');
                }
                console.log('Код: ' + event.code + ' причина: ' + event.reason);
                //
                setTimeout(function () {
                    attempts++;
                    self.connect();
                }, self.generateInterval(attempts));
            };

            this.socket.onmessage = function(event) {
                console.log("Получены данные " + event.data);
                self.trigger('message', event.data);
            };

            this.socket.onerror = function(error) {
                console.log("Ошибка " + error.message);
            };
        },

        close: function () {
            this.socket.close();
        },

        send: function (data) {
            this.socket.send(data);
        },

        generateInterval: function (k) {
            return Math.min(30, (Math.pow(2, k) - 1)) * 1000;
        }
    });

    return new Socket();

});
