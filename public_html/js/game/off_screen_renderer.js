define(function (require) {

    var __extends = require('./extends'),
        Renderer = require('./renderer');

    //noinspection UnnecessaryLocalVariableJS
    var OffScreenRenderer = (function (_super) {

        __extends(OffScreenRenderer, _super);

        function OffScreenRenderer(canvas, backgroundCanvas, width, height) {
            _super.call(this);
            canvas.width = width;
            canvas.height = height;
            backgroundCanvas.width = canvas.width;
            backgroundCanvas.height = canvas.height;
            this.canvas = canvas;

            var context = backgroundCanvas.getContext("2d");
            var gradient = context.createRadialGradient(width / 2, height / 2, height / 10, 0, height / 2, width);
            gradient.addColorStop(0, "#eef2f3");
            gradient.addColorStop(1, "#8e9eab");
            context.fillStyle = gradient;
            context.fillRect(0, 0, width, height);
        }

        OffScreenRenderer.prototype.render = function () {
            _super.prototype.draw.call(this, this.canvas);
        };

        return OffScreenRenderer;

    }(Renderer));

    return OffScreenRenderer;

});
