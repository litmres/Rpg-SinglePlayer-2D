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
        var _a, _b, _c, _d, _e;
        var _this = _super.call(this, game, x, y, "player", 0) || this;
        _this.playerState = playerStateEnum.idle;
        _this.lastCheckPoint = levelsEnum.level0;
        _this.canWalk = (_a = {},
            _a[playerStateEnum.movingWalk] = true,
            _a[playerStateEnum.movingFall] = false,
            _a[playerStateEnum.idle] = true,
            _a[playerStateEnum.attack1] = false,
            _a[playerStateEnum.attack2] = false,
            _a[playerStateEnum.attack3] = false,
            _a[playerStateEnum.death] = false,
            _a[playerStateEnum.sit] = false,
            _a[playerStateEnum.sitDown] = false,
            _a[playerStateEnum.standUp] = false,
            _a[playerStateEnum.movingStartWalk] = true,
            _a[playerStateEnum.autoWalkTo] = false,
            _a);
        _this.canIdle = (_b = {},
            _b[playerStateEnum.movingWalk] = true,
            _b[playerStateEnum.movingFall] = false,
            _b[playerStateEnum.idle] = false,
            _b[playerStateEnum.attack1] = false,
            _b[playerStateEnum.attack2] = false,
            _b[playerStateEnum.attack3] = false,
            _b[playerStateEnum.death] = false,
            _b[playerStateEnum.sit] = false,
            _b[playerStateEnum.sitDown] = false,
            _b[playerStateEnum.standUp] = false,
            _b[playerStateEnum.movingStartWalk] = true,
            _b[playerStateEnum.autoWalkTo] = false,
            _b);
        _this.canAttack = (_c = {},
            _c[playerStateEnum.movingWalk] = true,
            _c[playerStateEnum.movingFall] = false,
            _c[playerStateEnum.idle] = true,
            _c[playerStateEnum.attack1] = false,
            _c[playerStateEnum.attack2] = false,
            _c[playerStateEnum.attack3] = false,
            _c[playerStateEnum.death] = false,
            _c[playerStateEnum.sit] = false,
            _c[playerStateEnum.sitDown] = false,
            _c[playerStateEnum.standUp] = false,
            _c[playerStateEnum.movingStartWalk] = true,
            _c[playerStateEnum.autoWalkTo] = false,
            _c);
        _this.canSitDown = (_d = {},
            _d[playerStateEnum.movingWalk] = true,
            _d[playerStateEnum.movingFall] = false,
            _d[playerStateEnum.idle] = true,
            _d[playerStateEnum.attack1] = false,
            _d[playerStateEnum.attack2] = false,
            _d[playerStateEnum.attack3] = false,
            _d[playerStateEnum.death] = false,
            _d[playerStateEnum.sit] = false,
            _d[playerStateEnum.sitDown] = false,
            _d[playerStateEnum.standUp] = false,
            _d[playerStateEnum.movingStartWalk] = true,
            _d[playerStateEnum.autoWalkTo] = false,
            _d);
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
        _this.EnterLevelHandler = {
            Next: false,
            Previous: false,
            Text: null,
            EnterText: "Press E to go to Next Level",
            PreviousText: "Press E to go to Previous Level",
        };
        _this.playerAnimations = (_e = {},
            _e[playerStateEnum.movingWalk] = "walk",
            _e[playerStateEnum.movingFall] = "fall",
            _e[playerStateEnum.idle] = "idle",
            _e[playerStateEnum.attack1] = "attack1",
            _e[playerStateEnum.attack2] = "attack2",
            _e[playerStateEnum.attack3] = "attack3",
            _e[playerStateEnum.death] = "death",
            _e[playerStateEnum.sit] = "sit",
            _e[playerStateEnum.sitDown] = "sitdown",
            _e[playerStateEnum.standUp] = "standup",
            _e[playerStateEnum.movingStartWalk] = "startwalk",
            _e[playerStateEnum.autoWalkTo] = "walk",
            _e);
        _this.DialogueStyle = {
            font: "bold 10px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        game.add.existing(_this);
        _this.body.gravity.y = 1000;
        _this.body.collideWorldBounds = true;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.stats = {
            level: 1,
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
            UP: _this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            DOWN: _this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            LEFT: _this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            RIGHT: _this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            E: _this.game.input.keyboard.addKey(Phaser.Keyboard.E),
            ESC: _this.game.input.keyboard.addKey(Phaser.Keyboard.ESC),
            P: _this.game.input.keyboard.addKey(Phaser.Keyboard.P),
            LMB: _this.game.input.activePointer.leftButton,
            RMB: _this.game.input.activePointer.rightButton,
        };
        _this.game.input.onDown.add(function (pointer, event) {
            if (!_this.game.paused) {
                _this.handleAttack();
            }
        });
        //stop rightclick from opening a menu
        _this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };
        _this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.W,
            Phaser.Keyboard.A,
            Phaser.Keyboard.S,
            Phaser.Keyboard.D,
            Phaser.Keyboard.E
        ]);
        _this.animations.add("idle", [0], 3, false);
        _this.animations.add("startwalk", [1, 2, 3], 6, false).onComplete.add(function () {
            _this.animations.stop();
            _this.playerState = playerStateEnum.movingWalk;
        });
        _this.animations.add("walk", [4, 5, 6], 6, true);
        _this.animations.add("attack1", [20, 21, 22, 23], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.playerState = playerStateEnum.idle;
        });
        _this.animations.add("attack2", [24, 25, 26], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.playerState = playerStateEnum.idle;
        });
        _this.animations.add("attack3", [27, 28, 29], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.playerState = playerStateEnum.idle;
        });
        _this.animations.add("sitdown", [7, 8, 9], 3, false).onComplete.add(function () {
            _this.animations.stop();
            _this.savePlayer(_this.x);
            _this.playerState = playerStateEnum.sit;
        });
        _this.animations.add("sit", [9], 3, false);
        _this.animations.add("standup", [9, 8, 7], 3, false).onComplete.add(function () {
            _this.animations.stop();
            _this.playerState = playerStateEnum.idle;
        });
        _this.animations.add("death", [51, 52, 54], 3, false).onComplete.add(function () {
            //kill player and respawn
        });
        _this.healthBar();
        _this.staminaBar();
        return _this;
    }
    Player.prototype.update = function () {
        this.resetVelocity();
        this.animations.play(this.playerAnimations[this.playerState]);
        this.handleInput();
        this.updateHealthBar();
        this.updateStaminaBar();
        this.handleEnteringLevel();
        this.fpsCounter.setText("FPS: " + this.game.time.fps);
    };
    // tslint:disable-next-line:cyclomatic-complexity
    Player.prototype.handleInput = function () {
        if (this.controls.LEFT.isDown && this.canWalk[this.playerState]) {
            this.moveLeft();
        }
        else if (this.controls.RIGHT.isDown && this.canWalk[this.playerState]) {
            this.moveRight();
        }
        else if (this.controls.E.justPressed() && this.facingBonfire && this.canSitDown[this.playerState]) {
            this.handleBonfire();
        }
        else if (this.controls.E.justPressed() && this.facingNpc) {
            this.handleNpc();
        }
        else if (this.canIdle[this.playerState]) {
            this.idle();
        }
        if ((this.controls.LEFT.justPressed() || this.controls.RIGHT.justPressed()) && this.playerState === playerStateEnum.sit) {
            this.playerState = playerStateEnum.standUp;
        }
        if (this.controls.ESC.isDown || this.controls.P.isDown) {
            this.handlePauseMenu();
        }
    };
    // tslint:disable-next-line:cyclomatic-complexity
    Player.prototype.handleEnteringLevel = function () {
        if (!this.EnterLevelHandler.Text) {
            this.EnterLevelHandler.Text = this.game.add.text(this.game.camera.x + (this.game.camera.width / 2), this.game.camera.height, "", this.DialogueStyle);
            this.EnterLevelHandler.Text.setTextBounds(30, -20, 0, 0);
        }
        else {
            this.EnterLevelHandler.Text.x = this.game.camera.x + (this.game.camera.width / 2);
            this.EnterLevelHandler.Text.y = this.game.camera.height;
        }
        if (this.x < 0 && this.playerState !== playerStateEnum.autoWalkTo) {
            this.EnterThisFromPreviousLevel();
        }
        if (this.x > this.game.width && this.playerState !== playerStateEnum.autoWalkTo) {
            this.EnterThisFromNextLevel();
        }
        if (this.game.physics.arcade.distanceToXY(this, this.game.width, this.y) < this.width) {
            this.EnterLevelHandler.Next = true;
        }
        else {
            this.EnterLevelHandler.Next = false;
        }
        if (this.game.physics.arcade.distanceToXY(this, 0, this.y) < this.width && this.currentRoom > 0) {
            this.EnterLevelHandler.Previous = true;
        }
        else {
            this.EnterLevelHandler.Previous = false;
        }
        if (this.EnterLevelHandler.Next) {
            this.EnterLevelHandler.Text.setText(this.EnterLevelHandler.EnterText);
            if (this.controls.E.justPressed()) {
                this.EnterNextLevel();
            }
        }
        if (this.EnterLevelHandler.Previous) {
            this.EnterLevelHandler.Text.setText(this.EnterLevelHandler.PreviousText);
            if (this.controls.E.justPressed()) {
                this.EnterPreviousLevel();
            }
        }
        if (!this.EnterLevelHandler.Previous && !this.EnterLevelHandler.Next) {
            this.EnterLevelHandler.Text.setText("");
        }
    };
    Player.prototype.EnterNextLevel = function () {
        this.scale.setTo(1, 1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.game.width + this.width, this.y, 0.2, 700);
    };
    Player.prototype.EnterPreviousLevel = function () {
        this.scale.setTo(-1, 1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(-this.width, this.y, 0.2, 700);
    };
    Player.prototype.EnterThisFromPreviousLevel = function () {
        this.scale.setTo(1, 1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.width * 2, this.y, 0.2, 700);
    };
    Player.prototype.EnterThisFromNextLevel = function () {
        this.scale.setTo(-1, 1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.game.width - (this.width * 2), this.y, 0.2, 700);
    };
    Player.prototype.movePlayerTo = function (toX, toY, speed, time, nextLevel) {
        var _this = this;
        if (time === void 0) { time = 0; }
        if (nextLevel === void 0) { nextLevel = "nextLevel"; }
        this.game.physics.arcade.moveToXY(this, toX, toY, speed, time);
        this.game.time.events.add(time, function () {
            _this.body.velocity.x = 0;
            _this.body.velocity.y = 0;
            _this.x = toX;
            _this.y = toY;
            _this.playerState = playerStateEnum.idle;
            if (nextLevel === "nextLevel") {
                _this.nextLevel();
            }
            else if (nextLevel === "previousLevel") {
                _this.previousLevel();
            }
        }, this);
    };
    Player.prototype.handleNpc = function () {
        this.facingNpc.nextDialogueText();
    };
    Player.prototype.handleAttack = function () {
        if (this.controls.LMB.justPressed() && this.canAttack[this.playerState]) {
            this.playerState = playerStateEnum.attack1;
        }
        else if (this.controls.RMB.justPressed() && this.canAttack[this.playerState]) {
            console.log("right mouse button");
        }
        if ((this.controls.LMB.justPressed() || this.controls.RMB.justPressed()) && this.playerState === playerStateEnum.sit) {
            this.playerState = playerStateEnum.standUp;
        }
    };
    Player.prototype.handleBonfire = function () {
        if (this.facingBonfire.isLit) {
            this.playerState = playerStateEnum.sitDown;
        }
        else if (!this.facingBonfire.isLit) {
            this.facingBonfire.isLit = true;
            this.lastCheckPoint = this.currentRoom;
        }
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
        if (this.playerState !== playerStateEnum.autoWalkTo) {
            this.body.velocity.x = 0;
        }
    };
    Player.prototype.moveLeft = function () {
        this.playerState = playerStateEnum.movingStartWalk;
        this.scale.setTo(-1, 1);
        this.body.velocity.x = -this.stats.movespeed;
    };
    Player.prototype.moveRight = function () {
        this.playerState = playerStateEnum.movingStartWalk;
        this.scale.setTo(1, 1);
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
                alert("Game Saved");
                break;
            case this.pauseMenu.loadGame:
                var loadedGame = JSON.parse(window.localStorage.getItem("player"));
                if (loadedGame) {
                    this.game.state.start("level" + loadedGame.currentRoom);
                    this.continueTheGame();
                }
                else {
                    alert("no Saved Game Found!");
                }
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
            this.x = -this.width;
            this.y = this.game.height - this.height * 2;
        }
    };
    Player.prototype.nextLevel = function () {
        this.savePlayer(0, this.currentRoom + 1);
        this.game.state.start("level" + (this.currentRoom + 1), true, false);
    };
    Player.prototype.previousLevel = function () {
        this.savePlayer(this.x, this.currentRoom - 1);
        this.game.state.start("level" + (this.currentRoom - 1), true, false);
    };
    return Player;
}(Phaser.Sprite));
//# sourceMappingURL=player.js.map