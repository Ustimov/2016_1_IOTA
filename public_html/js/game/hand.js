define(function (require) {

    var __extends = require('./extends'),
        Renderer = require( './renderer'),
        Card = require('./card'),
        $ = require('jquery');

    //noinspection UnnecessaryLocalVariableJS
    var Hand = (function (_super) {

        __extends(Hand, _super);

        function Hand(canvas) {
            _super.call(this);
            this.canvas = canvas;
        }

        var heightCard = $('#canvas').height() / 6;

        Hand.prototype.getCard = function (x, y) {
            for (var i = 0; i < this.drawables.length; i++) {
                if (this.drawables[i].contains(x, y) && this.drawables[i].getInHand() && !this.drawables[i].isOver) {
                    return this.drawables[i];
                }
            }
            return null;
        };

        Hand.prototype.draw = function (canvas) {
            for (var i = 0; i < this.drawables.length; i++) {
                if (this.drawables[i].getInHand()) {
                    this.drawables[i].draw(canvas);
                }
            }
        };

        Hand.prototype.clear = function() {
            while(this.drawables.length) {
                this.drawables.pop();
            }
        };

        Hand.prototype.update = function (cards) {
            var coord = [
                [this.canvas.width / 2 - 24 - 2 * heightCard, this.canvas.height - heightCard - 10],
                [this.canvas.width / 2 - 8 - heightCard, this.canvas.height - heightCard - 10],
                [this.canvas.width / 2 + 8, this.canvas.height - heightCard - 10],
                [this.canvas.width / 2 + 24 + heightCard, this.canvas.height - heightCard - 10]
            ];
            //delete this.drawables;
            for (var i = 0; i < cards.length; i++) {
                this.drawables.push(new Card(coord[i][0], coord[i][1], heightCard, heightCard, cards[i].number, cards[i].color, cards[i].shape, true, cards[i].concrete, cards[i].uuid, cards[i].passed));
            }
        };

        Hand.prototype.size = function () {
            var count = 0;
            for (var i = 0; i < this.drawables.length; i++) {
                if (this.drawables[i].getInHand()) {
                    count++;
                }

            }
            return count;
        };

        Hand.prototype.reSize = function () {
            var canvasEl = $('#canvas');
            heightCard = canvasEl.height() / 6;
            this.canvas.width = canvasEl.width();
            this.canvas.height = canvasEl.height()
        };

        return Hand;

    }(Renderer));

    return Hand;

});
