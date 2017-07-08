define(function (require) {

    var __extends = require('./extends'),
        Renderer = require('./renderer'),
        $ = require('jquery');

    //noinspection UnnecessaryLocalVariableJS
    var ScreenRenderer = (function (_super) {

        __extends(ScreenRenderer, _super);

        function ScreenRenderer(canvas, camera, table, offScreenRenderer, hand) {
            var _this = this;
            _super.call(this);
            this.table = table;
            this.offScreenRenderer = offScreenRenderer;
            this.canvas = canvas;
            this.drawables.push(camera);
            this.camera = camera;
            this.hand = hand;
            this.addDrawable(this.hand);
            canvas.onmousedown = function (event) {
                if(event.which == 2) {
                    _this.camera.toCenter();
                    document.dispatchEvent(new CustomEvent('toRender'));
                } else {
                    if (table.getStep()) {
                        _this.selectedCard = _this.hand.getCard(event.clientX, event.clientY - window.innerHeight / 10);
                        if (_this.selectedCard != null) {
                            _this.initX = _this.selectedCard.getX();
                            _this.initY = _this.selectedCard.getY();
                            if (!_this.isPass) _this.isDrag = true;
                            return;
                        }
                        _this.isScroll = true;
                        _this.prevX = event.clientX;
                        _this.prevY = event.clientY - window.innerHeight / 10;
                    } else {
                        _this.isScroll = true;
                        _this.prevX = event.clientX;
                        _this.prevY = event.clientY - window.innerHeight / 10;
                    }
                }
            };
            canvas.onmouseup = function (event) {
                _this.isScroll = false;
                if (_this.isDrag) {
                    _this.isDrag = false;
                    var update = _this.table.placeCard(_this.selectedCard, _this.camera, _this.canvas);
                    //console.log(JSON.stringify(update));
                    _this.selectedCard.setX(_this.initX);
                    _this.selectedCard.setY(_this.initY);
                    if (_this.selectedCard.getInHand()) {
                        _this.selectedCard.setHighlightColor("black");
                    } else {
                        document.dispatchEvent(new CustomEvent('cardPlaced', { detail: update}));
                    }
                    _this.clear();
                    _this.render();
                }
                if(_this.isPass) {
                    if (_this.selectedCard != null) {
                        var update = {uuid: _this.selectedCard.getUuid(), card:_this.selectedCard};
                        document.dispatchEvent(new CustomEvent('cardPass', { detail: update}));
                    }
                    _this.clear();
                    _this.render();
                }
            };
            canvas.onmousemove = function (event) {
                if (_this.isDrag) {
                    _this.selectedCard.setX(event.clientX - _this.selectedCard.getWidth() / 2);
                    _this.selectedCard.setY(event.clientY-window.innerHeight/10 - _this.selectedCard.getHeight() / 2);
                    _this.table.checkPlace(_this.selectedCard, _this.camera, _this.canvas);
                    _this.clear();
                    _this.render();
                }
                else if (_this.isScroll) {
                    _this.camera.scroll(_this.prevX - event.clientX, _this.prevY - event.clientY+window.innerHeight/10);
                    _this.prevX = event.clientX;
                    _this.prevY = event.clientY-window.innerHeight/10;
                    _this.clear();
                    _this.render();
                }
            };
            document.addEventListener('pass', function (event) {
                _this.isPass = true;
                $('.js-pass').attr('disabled','');
            });
            document.addEventListener('over', function (event) {
                _this.isPass = false;
            });
        }

        ScreenRenderer.prototype.render = function () {
            _super.prototype.draw.call(this, this.canvas);
        };

        ScreenRenderer.prototype.clear = function () {
            var context = this.canvas.getContext('2d');
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };

        return ScreenRenderer;

    }(Renderer));

    return ScreenRenderer;

});
