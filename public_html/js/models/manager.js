define(function (require) {

    var Backbone = require('backbone'),
        session = require('models/session'),
        user = require('models/user'),
        socket = require('models/ws');
    
    //noinspection UnnecessaryLocalVariableJS
    var Manager = Backbone.Model.extend({
        
        initialize: function () {
            this.listenTo(session, 'loginOk', this.loginOk);
            this.listenTo(session, 'logoutOk', this.logoutOk);
            this.listenTo(session, 'readOk', this.readOk);
            this.listenTo(user, 'waitLogin', this.waitLogin);
        },
        
        loginOk: function () {
            console.log('manager');
            socket.connect();
        },
        
        logoutOk: function () {
            socket.close();
        },
        
        readOk: function (id) {
            socket.connect();
            user.setId(id);
            user.read();
        },

        waitLogin: function () {
            console.log('wait login received');
            session.read();
            user.trigger('registerOk');
        }
        
    });

    return new Manager();

});