define(function (require) {

    var Backbone = require('backbone');

    //noinspection UnnecessaryLocalVariableJS
    var View = Backbone.View.extend({

        el: '#page',

        initialize: function (session, user) {
            this.session = session;
            this.user = user;
        },

        render: function () {
            this.$el.html('');
            this.session.logout();
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