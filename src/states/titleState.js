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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        return _this;
    }
    TitleState.prototype.preload = function () {
        this.background = 0x055550;
        this.game.add.text(0, 0, "Everything you see is a Placeholder", this.style);
        this.startGame = this.game.add.text(0, 0, "Start New Game", this.style);
        this.loadGame = this.game.add.text(0, 50, "Load Game", this.style);
        this.Options = this.game.add.text(0, 100, "Options", this.style);
        this.githubLink = this.game.add.text(0, 300, "Github", this.style);
    };
    TitleState.prototype.create = function () {
        var _this = this;
        this.game.stage.backgroundColor = this.background;
        var array = [
            this.startGame,
            this.loadGame,
            this.Options,
            this.githubLink
        ];
        array.forEach(function (text) {
            text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
            text.setTextBounds(0, 200, 800, 100);
            text.inputEnabled = true;
            text.events.onInputOver.add(_this.glow, _this);
            text.events.onInputOut.add(_this.stopGlow, _this);
            text.events.onInputUp.add(_this.fadeOut, _this);
        });
    };
    TitleState.prototype.fadeOut = function (item) {
        switch (item) {
            case this.startGame:
                window.localStorage.setItem("player", "null");
                this.game.state.start("level" + levelsEnum.level0, true, false);
                break;
            case this.loadGame:
                var loadedGame = JSON.parse(window.localStorage.getItem("player"));
                if (loadedGame) {
                    this.game.state.start("level" + loadedGame.currentRoom);
                }
                else {
                    alert("no Saved Game Found!");
                }
                break;
            case this.Options:
                break;
            case this.githubLink:
                window.open("http://www.github.com/twofist");
                break;
            default:
        }
    };
    TitleState.prototype.glow = function (item) {
        item.fill = "#ffff44";
    };
    TitleState.prototype.stopGlow = function (item) {
        item.fill = "#fff";
    };
    return TitleState;
}(Phaser.State));
//# sourceMappingURL=titleState.js.map