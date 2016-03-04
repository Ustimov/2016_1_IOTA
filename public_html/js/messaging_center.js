define(function (require) {

    var Backbone = require('backbone');
    var _ = require('underscore');

    var messagingCenter = {};
    _.extend(messagingCenter, Backbone.Events);

    return messagingCenter;

});