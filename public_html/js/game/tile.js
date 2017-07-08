define(function (require) {

    var __extends = require('./extends'),
        Sprite = require('./sprite');

    //noinspection UnnecessaryLocalVariableJS
    var Tile = (function (_super) {

        __extends(Tile, _super);

        function Tile(x, y, width, height) {
            _super.call(this, x, y, width, height);
            this.possible = false;
        }

        Tile.prototype.draw = function (canvas) {
            if (this.content) {
                this.content.draw(canvas);
            }
            else {
                var context = canvas.getContext('2d');
            }
        };

        Tile.prototype.setContent = function (card) {
            card.setX(this.x);
            card.setY(this.y);
            this.content = card;
        };

        Tile.prototype.unsetContent = function(card) {
            delete this.content;
        };

        Tile.prototype.canContain = function () {
            return (this.content == undefined && this.possible);
        };

        Tile.prototype.setValid = function (possible) {
            this.possible = possible;
        };

        return Tile;

    }(Sprite));

    return Tile;

});
