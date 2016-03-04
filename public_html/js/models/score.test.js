define(function (require) {

    QUnit.module("models/score");

    QUnit.test("ScoreModel - экземпляр Backbone.Model", function () {

        var ScoreModel = require('./score'),
            score = new ScoreModel();

        QUnit.ok(score instanceof Backbone.Model);

    });

    QUnit.test("ScoreModel - корректность значений по умолчанию", function () {
        var ScoreModel = require('./score'),
            score = new ScoreModel();

        QUnit.equal(score.get('name'), '', 'Корректное имя по умолчанию');
        QUnit.equal(score.get('score'), 0, 'Корректный счёт по умолчанию');
    });

    QUnit.test("ScoreModel - корректность установки значений", function () {
        var ScoreModel = require('./score'),
            score = new ScoreModel({name: 'Artem', score: 1337});

        QUnit.equal(score.get('name'), 'Artem', 'Имя установлено корректно');
        QUnit.equal(score.get('score'), 1337, 'Счёт установлен корректно');
    });
    
});
