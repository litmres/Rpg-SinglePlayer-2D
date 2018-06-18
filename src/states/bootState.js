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
var BootState = /** @class */ (function (_super) {
    __extends(BootState, _super);
    function BootState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BootState.prototype.preload = function () {
        this.background = 0xA00999;
    };
    BootState.prototype.create = function () {
        this.game.stage.backgroundColor = this.background;
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start("preload", true, false);
    };
    return BootState;
}(Phaser.State));
//# sourceMappingURL=bootState.js.map