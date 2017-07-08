define(function (require) {

    var Backbone = require('backbone'),
        user = require('models/user');

    //noinspection UnnecessaryLocalVariableJS
    var BaseView = Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
        },

        show: function () {
            this.trigger('show', this);
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        }

    });

    return BaseView;

});