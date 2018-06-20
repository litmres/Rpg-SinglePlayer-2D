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
        _this.playerHealthBar = null;
        _this.playerStaminaBar = null;
        _this.currentRoom = 0;
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        game.add.existing(_this);
        _this.body.gravity.y = 1000;
        _this.body.collideWorldBounds = true;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.stats = {
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 150,
            luck: 1,
        };
        _this.controls = {
            UP: game.input.keyboard.addKey(Phaser.Keyboard.W),
            DOWN: game.input.keyboard.addKey(Phaser.Keyboard.S),
            LEFT: game.input.keyboard.addKey(Phaser.Keyboard.A),
            RIGHT: game.input.keyboard.addKey(Phaser.Keyboard.D),
            E: game.input.keyboard.addKey(Phaser.Keyboard.E),
            ESC: game.input.keyboard.addKey(Phaser.Keyboard.ESC),
            P: game.input.keyboard.addKey(Phaser.Keyboard.P)
        };
        game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.W,
            Phaser.Keyboard.A,
            Phaser.Keyboard.S,
            Phaser.Keyboard.D,
            Phaser.Keyboard.E
        ]);
        _this.healthBar();
        _this.staminaBar();
        return _this;
    }
    Player.prototype.update = function () {
        this.resetVelocity();
        if (this.controls.LEFT.isDown) {
            this.moveLeft();
        }
        else if (this.controls.RIGHT.isDown) {
            this.moveRight();
        }
        else {
            this.idle();
        }
        if (this.controls.ESC.isDown || this.controls.P.isDown) {
            this.handlePauseMenu();
        }
        if (this.controls.E.justPressed()) {
            if (this.facingNpc) {
                this.facingNpc.nextDialogueText();
            }
        }
        this.updateHealthBar();
        this.updateStaminaBar();
        this.fpsCounter.setText("FPS: " + this.game.time.fps);
    };
    Player.prototype.healthBar = function () {
        if (!this.playerHealthBar) {
            this.playerHealthBar = this.game.add.sprite(50, 50, "healthbar");
            this.playerHealthBar.height = 15;
        }
    };
    Player.prototype.updateHealthBar = function () {
        if (this.stats) {
            this.playerHealthBar.width = this.stats.health * 2;
        }
    };
    Player.prototype.updateStaminaBar = function () {
        if (this.stats) {
            this.playerStaminaBar.width = this.stats.stamina * 2;
        }
    };
    Player.prototype.staminaBar = function () {
        if (!this.playerStaminaBar && this.playerHealthBar) {
            var x = this.playerHealthBar.x;
            var y = this.playerHealthBar.y + this.playerHealthBar.width;
            this.playerStaminaBar = this.game.add.sprite(x, y, "staminabar");
            this.playerStaminaBar.height = 15;
        }
    };
    Player.prototype.resetVelocity = function () {
        this.body.velocity.x = 0;
    };
    Player.prototype.moveLeft = function () {
        this.playerState = playerStateEnum.movingLeft;
        this.body.velocity.x = -this.stats.movespeed;
    };
    Player.prototype.moveRight = function () {
        this.playerState = playerStateEnum.movingRight;
        this.body.velocity.x = this.stats.movespeed;
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
        this.pauseMenu.saveGame = this.game.add.text(0, 50, "Save Game", style);
        this.pauseMenu.loadGame = this.game.add.text(0, 100, "Load Game", style);
        this.pauseMenu.options = this.game.add.text(0, 150, "Options", style);
        this.pauseMenu.githubLink = this.game.add.text(0, 300, "Github", style);
        var array = [
            this.pauseMenu.continueGame,
            this.pauseMenu.saveGame,
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
            case this.pauseMenu.saveGame:
                this.savePlayer(this.x);
                this.continueTheGame();
                break;
            case this.pauseMenu.loadGame:
                var loadedGame = JSON.parse(window.localStorage.getItem("player"));
                if (loadedGame) {
                    this.game.state.start("level" + loadedGame.currentRoom);
                }
                else {
                    alert("no Saved Game Found!");
                }
                this.continueTheGame();
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
    Player.prototype.savePlayer = function (x, levelNumber) {
        if (x === void 0) { x = 0; }
        if (levelNumber === void 0) { levelNumber = this.currentRoom; }
        var savePlayer = {
            lastCheckPoint: this.lastCheckPoint,
            currentRoom: levelNumber,
            stats: this.stats,
            y: this.y,
            x: x,
        };
        window.localStorage.setItem("player", JSON.stringify(savePlayer));
    };
    Player.prototype.loadPlayer = function (playerStorage) {
        if (playerStorage) {
            this.stats = playerStorage.stats;
            this.x = playerStorage.x;
            this.y = playerStorage.y;
            this.lastCheckPoint = playerStorage.lastCheckPoint;
        }
        else {
            this.x = 20;
            this.y = this.game.height - this.height * 2;
        }
    };
    return Player;
}(Phaser.Sprite));
//# sourceMappingURL=player.js.map