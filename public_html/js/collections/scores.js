define(function (require) {

    var Backbone = require('backbone');
    var ScoreModel = require('models/score');

    //noinspection UnnecessaryLocalVariableJS
    var Collection = Backbone.Collection.extend({
        model: ScoreModel,
        comparator: function(model1, model2) {
            var score1 = model1.get('score'),
                score2 = model2.get('score');

            if (score1 > score2) {
                return -1;
            } else if (score1 < score2) {
                return 1;
            } else {
                return 0;
            }
        }
    });

    return Collection;
    
});
