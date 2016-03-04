define(function (require) {

    var Backbone = require('backbone');
    var tmpl = require('tmpl/login');
    var messagingCenter = require('messaging_center');

    //noinspection UnnecessaryLocalVariableJS
    var View = Backbone.View.extend({

        el: '#page',
        template: tmpl,

        initialize: function (session) {
            this.session = session;
            this.listenTo(messagingCenter, 'loginError', this.loginError);
        },

        render: function () {
            this.$el.html(this.template);
            this.$el.css('overflow', 'visible');
            this.$alert = $('.js-alert');
            $('.js-submit').on('submit', {session: this.session, alert: this.$alert}, this.login);
        },

        show: function () {
            this.render();
        },

        hide: function () {
            // TODO
        },

        login: function (event) {
            event.preventDefault();
            event.data.alert.html('');

            if (this.password.value.length < 6) {
                event.data.alert.html('Пароль не должен быть короче 6 символов');
                return;
            }

            event.data.session.login(this.login.value, this.password.value);
        },

        loginError: function (errorMsg) {
            this.$alert.html(errorMsg);
        }

    });

    return View;

});