define(function (require) {
    QUnit.module("collections/scores");

    QUnit.test("Scores -- Backbone.Collection", function () {
        var ScoresModel = require('./scores'),
            scores = new ScoresModel();

        QUnit.ok(scores instanceof Backbone.Collection);
    });

    QUnit.test("Scores -- Sort Results", function() {
        var ScoreCollection = require('./scores'),
            ScoreModel = require('models/score'),
            scores = new ScoreCollection();

        var names = ['Vasiliy', 'Ivan', 'Petr', 'Vladimir'];
        var points1 = [1, 6, 9, 8];

        for (var i = 0; i < names.length; i++) {
            scores.add(new ScoreModel({name: names[i], score: points1[i]}));
        }

        QUnit.equal(scores.at(1).get('name'), 'Vladimir', 'Sorted!');
    });
});
