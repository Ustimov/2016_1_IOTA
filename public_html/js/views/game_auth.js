define(function (require) {

    var BaseView = require('views/base'),
        tmpl = require('tmpl/game_auth'),
        game = require('../game/game'),
        gameModel = require('models/game');

    //noinspection UnnecessaryLocalVariableJS
    var GameAuthView = BaseView.extend({

        template: tmpl,
        attributes: {class: "grid__str_10"},
        isFirst: true,
        events: {
            'click .js-exit': 'exit',
            'click .js-debugConclude': 'debugConclude',
            'click .js-over': 'over',
            'click .js-pass': 'pass',
            'click .js-exit-prev': 'exitPrev'
        },

        exit: function (event) {
            document.dispatchEvent(new CustomEvent('exit'));
        },

        exitPrev: function (event) {
            document.dispatchEvent(new CustomEvent('exitPrev'));
        },

        debugConclude: function (event) {
            document.dispatchEvent(new CustomEvent('debugConclude'));
        },

        over: function (event) {
            document.dispatchEvent(new CustomEvent('over'));
        },

        pass: function (event) {
            document.dispatchEvent(new CustomEvent('pass'));
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();

            if(this.isFirst)
                this.listenToOnce(gameModel, 'ready', function () {
                    this.isFirst = false;
                    console.log('USERS CONNECTED');
                    game(gameModel);
                });
            gameModel.fetch({
                success: function (model, response, options) {
                    if(!response.__ok){
                        console.log("Протухла кука");
                        window.location.href = "./#logout";
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
