define(function (require) {

    var __extends = require('./extends'),
        Renderer = require('./renderer'),
        Tile = require('./tile'),
        Card = require('./card');

    //noinspection UnnecessaryLocalVariableJS
    var Table = (function (_super) {

        __extends(Table, _super);

        function Table(rows, columns, tileWidth, tileHeight) {
            _super.call(this);

            this.isMyStep = false;

            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < columns; j++) {
                    var tile = new Tile(i * tileWidth, j * tileHeight, tileWidth, tileHeight);
                    this.drawables.push(tile);
                }
            }
        }

        Table.prototype.draw = function (canvas) {
            for (var i = 0; i < this.drawables.length; i++) {
                this.drawables[i].draw(canvas);
            }
        };

        Table.prototype.placeCard = function (card, camera, canvas) {
            var tile = this.getTileForCard(card, camera, canvas);
            if (tile != null) {
                //tile.setContent(card);
                card.setInHand(false);
                return {
                    x: tile.getX() / 100,
                    y: tile.getY() / 100,
                    uuid: card.getUuid(),
                    card: card
                };
            }
        };

        Table.prototype.checkPlace = function (card, camera, canvas) {
            var tile = this.getTileForCard(card, camera, canvas);
            if (tile != null) {
                card.setHighlightColor("green");
            }
            else {
                card.setHighlightColor("red");
            }
        };

        Table.prototype.getTileForCard = function (card, camera, canvas) {
            var x = camera.getX() + card.getX() * camera.getWidth() / canvas.width + card.getWidth() / 2,
                y = camera.getY() + card.getY() * camera.getHeight() / canvas.height + card.getHeight() / 2;
            for (var i = 0; i < this.drawables.length; i++) {
                if (this.drawables[i].contains(x, y) && this.drawables[i].canContain()) {
                    return this.drawables[i];
                }
            }
            return null;
        };

        Table.prototype.getTile = function (index) {
            return this.drawables[index];
        };

        Table.prototype.getStep = function () {
            return this.isMyStep;
        };

        Table.prototype.setStep = function (step) {
            this.isMyStep = step;
        };

        Table.prototype.clear = function () {
            for(i = 0; i < 65 * 65; i++)
                this.drawables[i].unsetContent();
        };

        Table.prototype.update = function (cards) {
            for (var i = 0; i < cards.length; i++) {
                //console.log(JSON.stringify({n:cards[i].number, c:cards[i].color, s:cards[i].shape, id:cards[i].uuid}));
                this.drawables[cards[i].x * 65 + cards[i].y].setContent(new Card(0, 0, 100, 100, cards[i].number, cards[i].color, cards[i].shape, false, cards[i].concrete, cards[i].uuid, cards[i].passed));
                this.getTile((cards[i].x) * 65 + cards[i].y + 1).setValid(true);
                this.getTile((cards[i].x) * 65 + cards[i].y - 1).setValid(true);
                this.getTile((cards[i].x + 1) * 65 + cards[i].y).setValid(true);
                this.getTile((cards[i].x - 1) * 65 + cards[i].y).setValid(true);
            }
            document.dispatchEvent(new CustomEvent('toRender'));
        };

        return Table;

    }(Renderer));

    return Table;

});
