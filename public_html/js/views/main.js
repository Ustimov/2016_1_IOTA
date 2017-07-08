define(function (require) {

    var BaseView = require('views/base'),
        tmpl = require('tmpl/main'),
        session = require('models/session'),
        user = require('models/user');

    //noinspection UnnecessaryLocalVariableJS
    var MainView = BaseView.extend({

        template: tmpl,
        attributes: {class: "grid__str_10"},

        events: {
            'submit .js-submit-login': 'login',
            'submit .js-submit-reg': 'register'
        },

        initialize: function () {
            this.listenTo(user, 'registerOk', this.registerOk);
            this.listenTo(user, 'registerError', this.registerError);
            this.listenTo(session, 'loginOk', this.loginOk);
            this.listenTo(session, 'loginError', this.loginError);
            this.render();
        },

        render: function () {
            this.$el.html(this.template);
            this.$alertMain = this.$('.js-alert-main');
            this.$alertText = this.$('.js-alert-text');
            this.$login = this.$('.js-login');
            this.$email = this.$('.js-email');
            this.$password = this.$('.js-password');
            this.$password2 = this.$('.js-password2');
            this.$loginLog = this.$('.js-login-log');
            this.$passwordLog = this.$('.js-password-log');
        },

        login: function (event) {
            event.preventDefault();
            this.$alertMain.hide();
            this.$alertText.text('');

            var regExp = /^[a-z0-9]+$/i;

            if (!regExp.test(this.$loginLog.val()) || !regExp.test(this.$passwordLog.val())) {
                this.$alertMain.show();
                this.$alertText.text('Логин и пароль должны содержать только цифры и латинские буквы');
                return;
            }

            if (this.$passwordLog.val().length < 6) {
                this.$alertMain.show();
                this.$alertText.text('Пароль не должен быть короче 6 символов');
                return;
            }
            session.login(this.$loginLog.val(), this.$passwordLog.val());
        },

        loginError: function (errorMsg) {
            this.$alertMain.show();
            this.$alertText.text(errorMsg);
        },

        loginOk: function () {
            this.$loginLog.val('');
            this.$passwordLog.val('');
            this.$alertMain.hide();
            this.$alertText.text('');
        },

        register: function (event) {
            event.preventDefault();
            this.$alertMain.hide();
            this.$alertText.text('');

            var regExp = /^[a-z0-9]+$/i;

            if (!regExp.test(this.$login.val()) || !regExp.test(this.$password.val())) {
                this.$alertMain.show();
                this.$alertText.text('Логин и пароль должны содержать только цифры и латинские буквы');
                return;
            }

            if (this.$password.val() !== this.$password2.val()) {
                this.$alertMain.show();
                this.$alertText.text('Пароли не совпадают');
                return;
            }

            if (this.$password.val().length < 6) {
                this.$alertMain.show();
                this.$alertText.text('Пароль не должен быть короче 6 символов');
                return;
            }
            console.log(this.$login.val(), this.$password.val(), this.$email.val());
            user.create(this.$login.val(), this.$password.val(), this.$email.val());
        },

        registerError: function (errorMsg) {
            this.$alertMain.show();
            this.$alertText.text(errorMsg);
        },

        registerOk: function () {
            session.login(this.$login.val(), this.$password.val());
        }

    });

    return MainView;

});