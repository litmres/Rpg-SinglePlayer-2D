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
var TitleState = /** @class */ (function (_super) {
    __extends(TitleState, _super);
    function TitleState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TitleState.prototype.preload = function () {
        this.background = 0x055550;
    };
    TitleState.prototype.create = function () {
        this.game.stage.backgroundColor = this.background;
        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");
        this.logo.anchor.setTo(0.5, 0.5);
        this.input.onDown.addOnce(this.fadeOut, this);
    };
    TitleState.prototype.fadeOut = function () {
        this.game.state.start("play", true, false);
    };
    return TitleState;
}(Phaser.State));
//# sourceMappingURL=titleState.js.map