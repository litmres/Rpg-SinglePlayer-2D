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
var PreloadState = /** @class */ (function (_super) {
    __extends(PreloadState, _super);
    function PreloadState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreloadState.prototype.preload = function () {
        this.game.load.onLoadStart.add(this.assets, this);
        this.game.load.image("floor", "assets/floor.png");
        this.game.load.onFileComplete.add(this.progressBar, this);
        this.game.load.onLoadComplete.add(this.finishedLoading, this);
    };
    PreloadState.prototype.create = function () {
        this.loadingText.destroy();
        this.startTitleMenu();
    };
    PreloadState.prototype.startTitleMenu = function () {
        this.game.state.start("title", true, false);
    };
    PreloadState.prototype.progressBar = function (progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
    };
    PreloadState.prototype.assets = function () {
        this.loadingText = this.game.add.text(this.game.camera.x, this.game.camera.height / 2, "loading...", {
            fill: "#ffffff",
        });
        this.game.stage.backgroundColor = 0xB20059;
        this.game.load.spritesheet("player", "assets/player_placeholder.png", 24, 31);
        this.game.load.image("floor", "assets/floor.png");
        this.game.load.image("wall", "assets/wall.png");
        this.game.load.image("gate", "assets/gate.png");
        this.game.load.image("ceiling", "assets/ceiling.png");
        this.game.load.spritesheet("rogue", "assets/rogue.png", 32, 32);
    };
    PreloadState.prototype.finishedLoading = function () {
        this.loadingText.setText("Load Complete");
    };
    return PreloadState;
}(Phaser.State));
//# sourceMappingURL=preloadState.js.map