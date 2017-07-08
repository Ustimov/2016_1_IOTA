define(function (require) {

    var __extends = require('./extends'),
        Sprite = require('./sprite');

    //noinspection UnnecessaryLocalVariableJS
    var Score = (function (_super) {

        __extends(Score, _super);

        function Score(x, y, width, height, name, score) {
            _super.call(this, x, y, width, height);
            this.name = name;
            this.score = score;
        }

        Score.prototype.update = function (name, score, isTurnPlayer, isCurrentPlayer) {
            this.name = name;
            this.score = score;
            this.isTurnPlayer = isTurnPlayer;
            this.isCurrentPlayer = isCurrentPlayer;
        };

        Score.prototype.draw = function (canvas) {
            if (!this.name) {
                return;
            }
            var context = canvas.getContext('2d');
            context.font = "18px Courier New";
            if (this.isCurrentPlayer) {
                context.font = "bold " + context.font;
            }
            var printName = this.name;
            if (this.isTurnPlayer) {
                printName = "-> " + printName;
            } else {
                printName = "   " + printName;
            }
            context.fillText(printName + ': ' + this.score, this.x, this.y, this.width);
        };

        return Score;

    }(Sprite));

    return Score;

});