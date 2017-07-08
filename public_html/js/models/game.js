define(function (require) {

    var Backbone = require('backbone'),
        socket = require('models/ws');

    //noinspection UnnecessaryLocalVariableJS
    var GameModel = Backbone.Model.extend({
        
        url: '/api/game',
        message: "",
        initialize: function () {
            this.listenTo(socket, 'message', function (data) {
                this.message = JSON.parse(data);
                this.trigger("ready");
                if(this.message.concluded) {
                    this.trigger("endGame");
                    this.trigger("mess");
                }
                else this.trigger("mess");
            });
        },

        start: function () {
            socket.send(JSON.stringify({ready: true}));
        },
        
    });

    return new GameModel();

});