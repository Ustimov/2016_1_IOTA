define(function (require) {

    var Backbone = require('backbone');
    var tmpl = require('tmpl/game');
    var game = require('../game/game');

    //noinspection UnnecessaryLocalVariableJS
    var View = Backbone.View.extend({

        el: '#page',
        template: tmpl,

        initialize: function (session) {
            this.session = session;
        },

        render: function () {
            this.$el.html(this.template);
            this.$el.css('overflow', 'hidden');
            game();
        },

        show: function () {
            this.render();
        },

        hide: function () {
            // TODO
        }

    });

    return View;

});