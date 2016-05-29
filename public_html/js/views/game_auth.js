define(function (require) {

    var BaseView = require('views/base'),
        tmpl = require('tmpl/game_auth'),
        game = require('../game/game'),
        gameModel = require('models/game');

    //noinspection UnnecessaryLocalVariableJS
    var GameAuthView = BaseView.extend({

        template: tmpl,
        attributes: {class: "grid__str_10"},

        show: function () {
            this.trigger('show', this);
            this.$el.show();

            this.listenToOnce(gameModel, 'ready', function () {
                console.log('USERS CONNECTED');
                game(gameModel);
            });
            gameModel.fetch({
                success: function (model, response, options) {
                    if(!response.__ok){
                        console.log("Протухла кука");
                        window.location.href = "./#logout";
                    } else {
                        gameModel.id = response.ref;
                    }
                },
                error: function (model, response, options) {
                    console.log("Сдох сервер");
                    window.location.href = "./#logout";
                }
            });
        }

    });

    return GameAuthView;

});
