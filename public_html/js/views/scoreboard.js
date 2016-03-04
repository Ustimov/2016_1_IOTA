define(function (require) {

    var Backbone = require('backbone');
    var ScoreModel = require('tmpl/scoreboard');
    var tmpl = require('models/score');
    var ScoreCollection = require('collections/scores');
    var ScoreboardItemView = require('./scoreboard_item');

    //noinspection UnnecessaryLocalVariableJS
    var View = Backbone.View.extend({

        el: '#page',
        template: tmpl,

        initialize: function (session) {
            this.session = session;
            this.scores = new ScoreCollection();

            var names = [
                'Anthony Langdon',
                'Katherine Bailey',
                'Lauren Hamilton',
                'Brian Hart',
                'Audrey Hunter',
                'Julian Knox',
                'Emma Wright',
                'Richard Fraser',
                'Colin Payne',
                'Keith Young'
            ];

            for (var i = 0; i < names.length; i++) {
                this.scores.add(new ScoreModel({name: names[i], score: Math.round(Math.random() * 1000)}));
            }
        },

        render: function () {
            this.$el.html(this.template);
            this.$el.css('overflow', 'visible');
            this.$table = $('#table').html('');

            var count = 1,
                self = this;

            this.scores.each(function (model) {
                var view = new ScoreboardItemView({model: model});
                self.$table.append(view.render({count: count}).el);
                count++;
            });
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