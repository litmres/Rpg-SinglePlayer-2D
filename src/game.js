"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SimpleGame = /** @class */ (function (_super) {
    __extends(SimpleGame, _super);
    function SimpleGame() {
        var _this = _super.call(this, 800, 600, Phaser.AUTO, "content", null) || this;
        _this.state.add("boot", new BootState());
        _this.state.add("preload", new PreloadState());
        _this.state.add("title", new TitleState());
        _this.state.add("play", new PlayState());
        _this.state.start("boot");
        return _this;
    }
    return SimpleGame;
}(Phaser.Game));
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=game.js.map