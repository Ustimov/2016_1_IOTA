define(function (require) {

    var __extends = require('./extends'),
        Sprite = require('./sprite');

    //noinspection UnnecessaryLocalVariableJS
    var Card = (function (_super) {

        __extends(Card, _super);
        var back  = new Image();
        back.src = '/images/back.png';

        function Card(x, y, width, height, number, color, shape, inHand, concrete, uuid, passed) {
            _super.call(this, x, y, width, height);
            //console.log(JSON.stringify(uuid));
            this.inHand = inHand;
            this.image = new Image();
            this.concrete = concrete;
            this.image.src = '/images/' + concrete + color + shape + number + '.png';
            this.number = number;
            this.color = color;
            this.shape = shape;
            this.uuid = uuid;
            this.passed = passed;
            this.highlightColor = "black";
        }

        Card.prototype.getInHand = function () {
            return this.inHand;
        };

        Card.prototype.setInHand = function (inHand) {
            this.inHand = inHand;
        };

        Card.prototype.getNumber = function () {
            return this.number;
        };

        Card.prototype.getColor = function () {
            return this.color;
        };

        Card.prototype.getConcrete = function () {
            return this.concrete;
        };

        Card.prototype.getShape = function () {
            return this.shape;
        };

        Card.prototype.getUuid = function () {
            return this.uuid;
        };

        Card.prototype.draw = function (canvas) {
            var context = canvas.getContext('2d');
            if (this.inHand) {
                context.shadowBlur = 10;
                context.shadowColor = this.highlightColor;
            }
            else {
                context.shadowBlur = 1;
                context.shadowColor = "black";
            }
            context.drawImage(this.passed ? back : this.image, this.x, this.y, this.width, this.height);
            context.shadowBlur = 0;
        };

        Card.prototype.setHighlightColor = function (color) {
            this.highlightColor = color;
        };

        return Card;

    }(Sprite));

    return Card;

});
