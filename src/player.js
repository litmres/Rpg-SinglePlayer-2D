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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(game, x, y) {
        var _this = _super.call(this, game, x, y, "player", 0) || this;
        _this.playerState = playerStateEnum.idle;
        _this.lastCheckPoint = levelsEnum.level0;
        _this.pauseMenu = {
            backgroundImage: null,
            continueGame: null,
            loadGame: null,
            options: null,
            githubLink: null,
        };
        _this.fpsCounter = _this.game.add.text(_this.game.camera.x, 0, "FPS: " + _this.game.time.fps, {
            font: "24px Arial",
            fill: "#fff"
        });
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        game.add.existing(_this);
        _this.body.gravity.y = 1000;
        _this.body.collideWorldBounds = true;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        return _this;
        //this.health = new Health();
    }
    Player.prototype.update = function () {
        this.resetVelocity();
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.moveLeft();
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.moveRight();
        }
        else {
            this.idle();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC) || this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
            this.handlePauseMenu();
        }
        this.fpsCounter.setText("FPS: " + this.game.time.fps);
    };
    Player.prototype.resetVelocity = function () {
        this.body.velocity.x = 0;
    };
    Player.prototype.moveLeft = function () {
        this.playerState = playerStateEnum.movingLeft;
        this.body.velocity.x = -150;
    };
    Player.prototype.moveRight = function () {
        this.playerState = playerStateEnum.movingRight;
        this.body.velocity.x = 150;
    };
    Player.prototype.idle = function () {
        this.playerState = playerStateEnum.idle;
    };
    Player.prototype.handlePauseMenu = function () {
        var _this = this;
        this.game.paused = true;
        this.pauseMenu.backgroundImage = this.game.add.image(0, 0, "wall");
        this.pauseMenu.backgroundImage.width = this.game.camera.width;
        this.pauseMenu.backgroundImage.height = this.game.camera.height;
        var style = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        this.pauseMenu.continueGame = this.game.add.text(0, 0, "Continue Game", style);
        this.pauseMenu.loadGame = this.game.add.text(0, 50, "Load Game", style);
        this.pauseMenu.options = this.game.add.text(0, 100, "Options", style);
        this.pauseMenu.githubLink = this.game.add.text(0, 300, "Github", style);
        var array = [
            this.pauseMenu.continueGame,
            this.pauseMenu.loadGame,
            this.pauseMenu.options,
            this.pauseMenu.githubLink
        ];
        array.forEach(function (text) {
            text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
            text.setTextBounds(0, 200, 800, 100);
            text.inputEnabled = true;
            text.events.onInputOver.add(_this.pauseMenuGlow, _this);
            text.events.onInputOut.add(_this.pauseMenuStopGlow, _this);
            text.events.onInputUp.add(_this.pauseMenuFadeOut, _this);
        });
    };
    Player.prototype.pauseMenuFadeOut = function (item) {
        switch (item) {
            case this.pauseMenu.continueGame:
                this.continueTheGame();
                break;
            case this.pauseMenu.loadGame:
                break;
            case this.pauseMenu.options:
                break;
            case this.pauseMenu.githubLink:
                window.open("http://www.github.com/twofist");
                break;
            default:
        }
    };
    Player.prototype.pauseMenuGlow = function (item) {
        item.fill = "#ffff44";
    };
    Player.prototype.pauseMenuStopGlow = function (item) {
        item.fill = "#fff";
    };
    Player.prototype.continueTheGame = function () {
        this.destroyPauseMenu();
        this.game.paused = false;
    };
    Player.prototype.destroyPauseMenu = function () {
        for (var key in this.pauseMenu) {
            if (this.pauseMenu[key]) {
                this.pauseMenu[key].destroy();
            }
        }
    };
    return Player;
}(Phaser.Sprite));
//# sourceMappingURL=player.js.map