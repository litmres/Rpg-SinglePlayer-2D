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
var gameStateEnum;
(function (gameStateEnum) {
    gameStateEnum[gameStateEnum["startMenu"] = 0] = "startMenu";
    gameStateEnum[gameStateEnum["inGame"] = 1] = "inGame";
})(gameStateEnum || (gameStateEnum = {}));
var playerStateEnum;
(function (playerStateEnum) {
    playerStateEnum[playerStateEnum["movingWalk"] = 0] = "movingWalk";
    playerStateEnum[playerStateEnum["movingFall"] = 1] = "movingFall";
    playerStateEnum[playerStateEnum["idle"] = 2] = "idle";
    playerStateEnum[playerStateEnum["attack1"] = 3] = "attack1";
    playerStateEnum[playerStateEnum["attack2"] = 4] = "attack2";
    playerStateEnum[playerStateEnum["attack3"] = 5] = "attack3";
    playerStateEnum[playerStateEnum["death"] = 6] = "death";
    playerStateEnum[playerStateEnum["sit"] = 7] = "sit";
    playerStateEnum[playerStateEnum["sitDown"] = 8] = "sitDown";
    playerStateEnum[playerStateEnum["movingStartWalk"] = 9] = "movingStartWalk";
    playerStateEnum[playerStateEnum["standUp"] = 10] = "standUp";
    playerStateEnum[playerStateEnum["autoWalkTo"] = 11] = "autoWalkTo";
    playerStateEnum[playerStateEnum["knockBack"] = 12] = "knockBack";
})(playerStateEnum || (playerStateEnum = {}));
var enemyStateEnum;
(function (enemyStateEnum) {
    enemyStateEnum[enemyStateEnum["movingWalk"] = 0] = "movingWalk";
    enemyStateEnum[enemyStateEnum["movingFall"] = 1] = "movingFall";
    enemyStateEnum[enemyStateEnum["idle"] = 2] = "idle";
    enemyStateEnum[enemyStateEnum["idleSpecial"] = 3] = "idleSpecial";
    enemyStateEnum[enemyStateEnum["attack1"] = 4] = "attack1";
    enemyStateEnum[enemyStateEnum["attack2"] = 5] = "attack2";
    enemyStateEnum[enemyStateEnum["attack3"] = 6] = "attack3";
    enemyStateEnum[enemyStateEnum["death"] = 7] = "death";
    enemyStateEnum[enemyStateEnum["sit"] = 8] = "sit";
    enemyStateEnum[enemyStateEnum["sitDown"] = 9] = "sitDown";
    enemyStateEnum[enemyStateEnum["movingChase"] = 10] = "movingChase";
})(enemyStateEnum || (enemyStateEnum = {}));
var npcStateEnum;
(function (npcStateEnum) {
    npcStateEnum[npcStateEnum["movingWalk"] = 0] = "movingWalk";
    npcStateEnum[npcStateEnum["movingFall"] = 1] = "movingFall";
    npcStateEnum[npcStateEnum["idle"] = 2] = "idle";
    npcStateEnum[npcStateEnum["idleSpecial"] = 3] = "idleSpecial";
    npcStateEnum[npcStateEnum["attack1"] = 4] = "attack1";
    npcStateEnum[npcStateEnum["attack2"] = 5] = "attack2";
    npcStateEnum[npcStateEnum["attack3"] = 6] = "attack3";
    npcStateEnum[npcStateEnum["death"] = 7] = "death";
    npcStateEnum[npcStateEnum["sit"] = 8] = "sit";
    npcStateEnum[npcStateEnum["sitDown"] = 9] = "sitDown";
    npcStateEnum[npcStateEnum["movingChase"] = 10] = "movingChase";
})(npcStateEnum || (npcStateEnum = {}));
var levelsEnum;
(function (levelsEnum) {
    levelsEnum[levelsEnum["level0"] = 0] = "level0";
    levelsEnum[levelsEnum["level1"] = 1] = "level1";
    levelsEnum[levelsEnum["level2"] = 2] = "level2";
    levelsEnum[levelsEnum["level3"] = 3] = "level3";
})(levelsEnum || (levelsEnum = {}));
var SimpleGame = /** @class */ (function (_super) {
    __extends(SimpleGame, _super);
    function SimpleGame() {
        var _this = _super.call(this, 800, 600, Phaser.AUTO, "content", null) || this;
        _this.state.add("boot", new BootState());
        _this.state.add("preload", new PreloadState());
        _this.state.add("title", new TitleState());
        _this.state.add("level0", new Level0());
        _this.state.add("level1", new Level1());
        _this.state.start("boot");
        return _this;
    }
    return SimpleGame;
}(Phaser.Game));
window.onload = function () {
    var game = new SimpleGame();
};
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(game, x, y) {
        var _a, _b, _c, _d, _e;
        var _this = _super.call(this, game, x, y, "player", 0) || this;
        _this.playerState = playerStateEnum.idle;
        _this.lastCheckPoint = levelsEnum.level0;
        _this.invincible = false;
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
            _a[playerStateEnum.knockBack] = false,
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
            _b[playerStateEnum.knockBack] = false,
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
            _c[playerStateEnum.knockBack] = false,
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
            _d[playerStateEnum.knockBack] = false,
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
            _e[playerStateEnum.movingStartWalk] = "walk",
            _e[playerStateEnum.autoWalkTo] = "walk",
            _e[playerStateEnum.knockBack] = "knockback",
            _e);
        _this.DialogueStyle = {
            font: "bold 10px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.anchor.setTo(0.5, 0);
        //this.scale.setTo(1.5, 1.5);
        _this.game.physics.arcade.enableBody(_this);
        _this.game.add.existing(_this);
        _this.body.gravity.y = 1000;
        _this.body.collideWorldBounds = true;
        _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.setSize(12 / _this.scale.x, 24 / _this.scale.y, 24, 32);
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
        _this.animations.add("idle", [24, 25, 26, 27], 10, false);
        _this.animations.add("startwalk", [1, 2, 3], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.playerState = playerStateEnum.movingWalk;
        });
        _this.animations.add("walk", [28, 29, 30, 31], 10, true);
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
        _this.animations.add("sitdown", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.savePlayer(_this.x);
            _this.playerState = playerStateEnum.sit;
        });
        _this.animations.add("sit", [9], 3, false);
        _this.animations.add("standup", [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10, false).onComplete.add(function () {
            _this.animations.stop();
            _this.playerState = playerStateEnum.idle;
        });
        _this.animations.add("death", [71, 72, 73, 74, 75, 76, 78, 79, 80, 81, 81, 82, 83], 10, false).onComplete.add(function () {
            _this.game.state.start("title");
        });
        _this.animations.add("knockback", [83], 10, true);
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
        this.handleDeath();
        this.fpsCounter.setText("FPS: " + this.game.time.fps);
    };
    Player.prototype.handleDeath = function () {
        if (this.stats.health <= 0 && this.playerState !== playerStateEnum.death) {
            this.invincible = true;
            this.playerState = playerStateEnum.death;
        }
    };
    Player.prototype.takeDamage = function (damage, objPositionX) {
        if (this.canTakeDamage()) {
            this.stats.health -= this.calculateDamage(damage);
            this.invincible = true;
            this.game.time.events.add(1000, this.resetInvincable, this);
            this.knockBack(objPositionX);
        }
    };
    Player.prototype.knockBack = function (objPositionX) {
        this.playerState = playerStateEnum.knockBack;
        if (this.x > objPositionX) {
            this.scale.setTo(-1, 1);
            this.movePlayerTo(this.x - this.width, this.y, 0.2, 700, playerStateEnum.idle);
        }
        else {
            this.scale.setTo(1, 1);
            this.movePlayerTo(this.x - this.width, this.y, 0.2, 700, playerStateEnum.idle);
        }
    };
    Player.prototype.resetInvincable = function () {
        this.invincible = false;
    };
    Player.prototype.calculateDamage = function (damage) {
        if (this.stats.health - damage < 0) {
            return 0;
        }
        return damage;
    };
    Player.prototype.canTakeDamage = function () {
        if (this.invincible || this.playerState === playerStateEnum.death) {
            return false;
        }
        return true;
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
        /*
        if(this.x < 0 && this.playerState !== playerStateEnum.autoWalkTo){
            this.EnterThisFromPreviousLevel();
        }
        if(this.x > this.game.width && this.playerState !== playerStateEnum.autoWalkTo){
            this.EnterThisFromNextLevel();
        }
        */
        if (this.game.physics.arcade.distanceToXY(this, this.game.width, this.y) < this.width) {
            this.EnterLevelHandler.Next = true;
        }
        else {
            this.EnterLevelHandler.Next = false;
        }
        if (this.game.physics.arcade.distanceToXY(this, 0, this.y) < -this.width && this.currentRoom > 0) {
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
        this.movePlayerTo(this.game.width + this.width, this.y, 0.2, 700, playerStateEnum.idle, "nextLevel");
    };
    Player.prototype.EnterPreviousLevel = function () {
        this.scale.setTo(-1, 1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.width, this.y, 0.2, 700, playerStateEnum.idle, "previousLevel");
    };
    /*
    EnterThisFromPreviousLevel(){
        this.scale.setTo(1,1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.width*2, this.y, 0.2, 700);
    }

    EnterThisFromNextLevel(){
        this.scale.setTo(-1,1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.game.width-(this.width*2), this.y, 0.2, 700);
    }
    */
    Player.prototype.movePlayerTo = function (toX, toY, speed, time, endState, nextLevel) {
        var _this = this;
        if (time === void 0) { time = 0; }
        if (endState === void 0) { endState = playerStateEnum.idle; }
        if (nextLevel === void 0) { nextLevel = ""; }
        this.game.physics.arcade.moveToXY(this, toX, toY, speed, time);
        this.game.time.events.add(time, function () {
            _this.body.velocity.x = 0;
            _this.body.velocity.y = 0;
            _this.x = toX;
            _this.y = toY;
            _this.playerState = endState;
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
        if (this.playerState !== playerStateEnum.autoWalkTo &&
            this.playerState !== playerStateEnum.knockBack) {
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
            text.events.onInputOver.addOnce(_this.pauseMenuGlow, _this);
            text.events.onInputOut.addOnce(_this.pauseMenuStopGlow, _this);
            text.events.onInputUp.addOnce(_this.pauseMenuFadeOut, _this);
        });
        this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.addOnce(function () {
            if (_this.game.paused) {
                _this.pauseMenuFadeOut(_this.pauseMenu.continueGame);
            }
        });
        this.game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.addOnce(function () {
            if (_this.game.paused) {
                _this.pauseMenuFadeOut(_this.pauseMenu.continueGame);
            }
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
var AdventurerEnemy = /** @class */ (function (_super) {
    __extends(AdventurerEnemy, _super);
    function AdventurerEnemy(game, x, y) {
        var _a, _b, _c, _d, _e;
        var _this = _super.call(this, game, x, y, "adventurer", 0) || this;
        _this.enemyState = enemyStateEnum.idle;
        _this.friendly = false;
        _this.wanderRange = 100;
        _this.targetX = 0;
        _this.targetY = 0;
        _this.maxWanderRange = 100;
        _this.attackRange = 0;
        _this.aggroRange = 100;
        _this.canWalk = (_a = {},
            _a[enemyStateEnum.movingWalk] = true,
            _a[enemyStateEnum.movingFall] = false,
            _a[enemyStateEnum.idle] = true,
            _a[enemyStateEnum.idleSpecial] = true,
            _a[enemyStateEnum.attack1] = false,
            _a[enemyStateEnum.attack2] = false,
            _a[enemyStateEnum.attack3] = false,
            _a[enemyStateEnum.death] = false,
            _a[enemyStateEnum.sit] = false,
            _a[enemyStateEnum.sitDown] = false,
            _a[enemyStateEnum.movingChase] = false,
            _a);
        _this.canIdle = (_b = {},
            _b[enemyStateEnum.movingWalk] = false,
            _b[enemyStateEnum.movingFall] = false,
            _b[enemyStateEnum.idle] = false,
            _b[enemyStateEnum.idleSpecial] = false,
            _b[enemyStateEnum.attack1] = false,
            _b[enemyStateEnum.attack2] = false,
            _b[enemyStateEnum.attack3] = false,
            _b[enemyStateEnum.death] = false,
            _b[enemyStateEnum.sit] = false,
            _b[enemyStateEnum.sitDown] = false,
            _b[enemyStateEnum.movingChase] = false,
            _b);
        _this.canChase = (_c = {},
            _c[enemyStateEnum.movingWalk] = true,
            _c[enemyStateEnum.movingFall] = false,
            _c[enemyStateEnum.idle] = true,
            _c[enemyStateEnum.idleSpecial] = true,
            _c[enemyStateEnum.attack1] = false,
            _c[enemyStateEnum.attack2] = false,
            _c[enemyStateEnum.attack3] = false,
            _c[enemyStateEnum.death] = false,
            _c[enemyStateEnum.sit] = false,
            _c[enemyStateEnum.sitDown] = false,
            _c[enemyStateEnum.movingChase] = true,
            _c);
        _this.canAttack = (_d = {},
            _d[enemyStateEnum.movingWalk] = true,
            _d[enemyStateEnum.movingFall] = false,
            _d[enemyStateEnum.idle] = true,
            _d[enemyStateEnum.idleSpecial] = true,
            _d[enemyStateEnum.attack1] = false,
            _d[enemyStateEnum.attack2] = false,
            _d[enemyStateEnum.attack3] = false,
            _d[enemyStateEnum.death] = false,
            _d[enemyStateEnum.sit] = false,
            _d[enemyStateEnum.sitDown] = false,
            _d[enemyStateEnum.movingChase] = true,
            _d);
        _this.enemyAnimations = (_e = {},
            _e[enemyStateEnum.movingWalk] = "walk",
            _e[enemyStateEnum.movingFall] = "fall",
            _e[enemyStateEnum.idle] = "idle",
            _e[enemyStateEnum.attack1] = "attack1",
            _e[enemyStateEnum.attack2] = "attack2",
            _e[enemyStateEnum.attack3] = "attack3",
            _e[enemyStateEnum.death] = "death",
            _e[enemyStateEnum.sit] = "sit",
            _e[enemyStateEnum.sitDown] = "sitdown",
            _e[enemyStateEnum.movingChase] = "walk",
            _e[enemyStateEnum.idleSpecial] = "idlespecial",
            _e);
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        game.add.existing(_this);
        _this.body.gravity.y = 1000;
        _this.body.collideWorldBounds = true;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.setSize(10 / _this.scale.x, 30 / _this.scale.y, 30, 5);
        _this.spawnPositionX = x;
        _this.spawnPositionY = y;
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 120,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3], 3, false).onComplete.add(function () {
            var rndNumber = _this.game.rnd.integerInRange(1, 100);
            if (rndNumber > 90) {
                _this.enemyState = enemyStateEnum.idleSpecial;
            }
            else if (!_this.friendly && rndNumber > 20 && rndNumber < 90) {
                _this.wander();
            }
        });
        _this.animations.add("idlespecial", [38, 39, 40, 41], 3, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("walk", [8, 9, 10], 3, true);
        _this.animations.add("attack1", [42, 43, 44, 45, 46, 47, 48, 49], 6, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [62, 63, 64, 65, 66, 67, 68], 3, false).onComplete.add(function () {
            //kill enemy and respawn
        });
        _this.health = _this.maxHealth;
        return _this;
    }
    AdventurerEnemy.prototype.update = function () {
        this.resetVelocity();
        this.animations.play(this.enemyAnimations[this.enemyState]);
        if (!this.friendly) {
            this.handleInput();
        }
        this.checkForHit();
    };
    AdventurerEnemy.prototype.checkForHit = function () {
        if (this.animations.currentAnim.name === "attack1" &&
            this.animations.frame > 42 &&
            this.animations.frame < 46 &&
            this.game.physics.arcade.overlap(this, this.player)) {
            this.player.takeDamage(this.stats.attack * 20, this.x);
        }
    };
    AdventurerEnemy.prototype.resetVelocity = function () {
        if (this.enemyState !== enemyStateEnum.movingWalk) {
            this.body.velocity.x = 0;
        }
    };
    // tslint:disable-next-line:cyclomatic-complexity
    AdventurerEnemy.prototype.handleInput = function () {
        if (this.enemyState === enemyStateEnum.movingWalk) {
            if (this.game.physics.arcade.distanceToXY(this, this.targetX, this.targetY) < 5) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.body.velocity.setTo(0, 0);
                this.enemyState = enemyStateEnum.idle;
            }
        }
        if (this.player) {
            var distance = this.game.physics.arcade.distanceBetween(this, this.player);
            var fullAttackRange = this.attackRange;
            if (this.width < 0) {
                fullAttackRange += (this.width / 2) * -1;
            }
            else {
                fullAttackRange += this.width / 2;
            }
            if (this.player.width < 0) {
                fullAttackRange += (this.player.width / 2) * -1;
            }
            else {
                fullAttackRange += this.player.width / 2;
            }
            if (distance < fullAttackRange && this.canAttack[this.enemyState]) {
                this.attack();
            }
            else if (distance < this.aggroRange && this.canChase[this.enemyState]) {
                this.chase();
            }
        }
        if (this.canIdle[this.enemyState]) {
            this.idle();
        }
    };
    AdventurerEnemy.prototype.attack = function () {
        if (this.player.x > this.x) {
            this.scale.setTo(1, 1);
        }
        else {
            this.scale.setTo(-1, 1);
        }
        this.enemyState = enemyStateEnum.attack1;
    };
    AdventurerEnemy.prototype.chase = function () {
        this.enemyState = enemyStateEnum.movingChase;
        if (this.player.x > this.x) {
            this.scale.setTo(1, 1);
        }
        else {
            this.scale.setTo(-1, 1);
        }
        this.game.physics.arcade.moveToXY(this, this.player.x, this.y, this.stats.movespeed);
    };
    AdventurerEnemy.prototype.wander = function () {
        if (this.game.physics.arcade.distanceToXY(this, this.spawnPositionX, this.spawnPositionY) > this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX, this.spawnPositionY, this.stats.movespeed);
            return;
        }
        var direction = this.game.rnd.integerInRange(0, 1);
        var distance = this.game.rnd.integerInRange(10, this.maxWanderRange);
        if (direction) {
            this.moveLeft(distance);
        }
        else {
            this.moveRight(distance);
        }
    };
    AdventurerEnemy.prototype.moveEnemyTo = function (toX, toY, speed) {
        this.enemyState = enemyStateEnum.movingWalk;
        this.game.physics.arcade.moveToXY(this, toX, toY, speed);
        this.targetX = toX;
        this.targetY = toY;
        if (this.targetX > this.x) {
            this.scale.setTo(1, 1);
        }
        else {
            this.scale.setTo(-1, 1);
        }
    };
    AdventurerEnemy.prototype.moveLeft = function (distance) {
        if (this.x - distance < this.spawnPositionX - this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX - this.maxWanderRange, this.y, this.stats.movespeed);
        }
        else {
            this.moveEnemyTo(this.x - distance, this.y, this.stats.movespeed);
        }
    };
    AdventurerEnemy.prototype.moveRight = function (distance) {
        if (this.x + distance > this.spawnPositionX + this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX + this.maxWanderRange, this.y, this.stats.movespeed);
        }
        else {
            this.moveEnemyTo(this.x + distance, this.y, this.stats.movespeed);
        }
    };
    AdventurerEnemy.prototype.idle = function () {
        this.enemyState = enemyStateEnum.idle;
    };
    return AdventurerEnemy;
}(Phaser.Sprite));
var RogueEnemy = /** @class */ (function (_super) {
    __extends(RogueEnemy, _super);
    function RogueEnemy(game, x, y) {
        var _a, _b, _c, _d, _e;
        var _this = _super.call(this, game, x, y, "rogue", 0) || this;
        _this.enemyState = enemyStateEnum.idle;
        _this.friendly = false;
        _this.wanderRange = 100;
        _this.targetX = 0;
        _this.targetY = 0;
        _this.maxWanderRange = 100;
        _this.attackRange = 0;
        _this.aggroRange = 100;
        _this.canWalk = (_a = {},
            _a[enemyStateEnum.movingWalk] = true,
            _a[enemyStateEnum.movingFall] = false,
            _a[enemyStateEnum.idle] = true,
            _a[enemyStateEnum.idleSpecial] = true,
            _a[enemyStateEnum.attack1] = false,
            _a[enemyStateEnum.attack2] = false,
            _a[enemyStateEnum.attack3] = false,
            _a[enemyStateEnum.death] = false,
            _a[enemyStateEnum.sit] = false,
            _a[enemyStateEnum.sitDown] = false,
            _a[enemyStateEnum.movingChase] = false,
            _a);
        _this.canIdle = (_b = {},
            _b[enemyStateEnum.movingWalk] = false,
            _b[enemyStateEnum.movingFall] = false,
            _b[enemyStateEnum.idle] = false,
            _b[enemyStateEnum.idleSpecial] = false,
            _b[enemyStateEnum.attack1] = false,
            _b[enemyStateEnum.attack2] = false,
            _b[enemyStateEnum.attack3] = false,
            _b[enemyStateEnum.death] = false,
            _b[enemyStateEnum.sit] = false,
            _b[enemyStateEnum.sitDown] = false,
            _b[enemyStateEnum.movingChase] = false,
            _b);
        _this.canChase = (_c = {},
            _c[enemyStateEnum.movingWalk] = true,
            _c[enemyStateEnum.movingFall] = false,
            _c[enemyStateEnum.idle] = true,
            _c[enemyStateEnum.idleSpecial] = true,
            _c[enemyStateEnum.attack1] = false,
            _c[enemyStateEnum.attack2] = false,
            _c[enemyStateEnum.attack3] = false,
            _c[enemyStateEnum.death] = false,
            _c[enemyStateEnum.sit] = false,
            _c[enemyStateEnum.sitDown] = false,
            _c[enemyStateEnum.movingChase] = true,
            _c);
        _this.canAttack = (_d = {},
            _d[enemyStateEnum.movingWalk] = true,
            _d[enemyStateEnum.movingFall] = false,
            _d[enemyStateEnum.idle] = true,
            _d[enemyStateEnum.idleSpecial] = true,
            _d[enemyStateEnum.attack1] = false,
            _d[enemyStateEnum.attack2] = false,
            _d[enemyStateEnum.attack3] = false,
            _d[enemyStateEnum.death] = false,
            _d[enemyStateEnum.sit] = false,
            _d[enemyStateEnum.sitDown] = false,
            _d[enemyStateEnum.movingChase] = true,
            _d);
        _this.enemyAnimations = (_e = {},
            _e[enemyStateEnum.movingWalk] = "walk",
            _e[enemyStateEnum.movingFall] = "fall",
            _e[enemyStateEnum.idle] = "idle",
            _e[enemyStateEnum.attack1] = "attack1",
            _e[enemyStateEnum.attack2] = "attack2",
            _e[enemyStateEnum.attack3] = "attack3",
            _e[enemyStateEnum.death] = "death",
            _e[enemyStateEnum.sit] = "sit",
            _e[enemyStateEnum.sitDown] = "sitdown",
            _e[enemyStateEnum.movingChase] = "walk",
            _e[enemyStateEnum.idleSpecial] = "butterfly",
            _e);
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        game.add.existing(_this);
        _this.body.gravity.y = 1000;
        _this.body.collideWorldBounds = true;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.setSize(26 / _this.scale.x, 32 / _this.scale.y, 6, 0);
        _this.spawnPositionX = x;
        _this.spawnPositionY = y;
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 120,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3, false).onComplete.add(function () {
            var rndNumber = _this.game.rnd.integerInRange(1, 100);
            if (rndNumber > 90) {
                _this.enemyState = enemyStateEnum.idleSpecial;
            }
            else if (!_this.friendly && rndNumber > 20 && rndNumber < 90) {
                _this.wander();
            }
        });
        _this.animations.add("butterfly", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 3, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("walk", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 3, true);
        _this.animations.add("attack1", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 6, false).onComplete.add(function () {
            _this.animations.stop();
            _this.enemyState = enemyStateEnum.idle;
        });
        _this.animations.add("death", [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 3, false).onComplete.add(function () {
            //kill enemy and respawn
        });
        _this.health = _this.maxHealth;
        return _this;
    }
    RogueEnemy.prototype.update = function () {
        this.resetVelocity();
        this.animations.play(this.enemyAnimations[this.enemyState]);
        if (!this.friendly) {
            this.handleInput();
        }
        this.checkForHit();
    };
    RogueEnemy.prototype.checkForHit = function () {
        if (this.animations.currentAnim.name === "attack1" &&
            this.animations.frame > 30 &&
            this.animations.frame < 39 &&
            this.game.physics.arcade.overlap(this, this.player)) {
            this.player.takeDamage(this.stats.attack * 20, this.x);
        }
    };
    RogueEnemy.prototype.resetVelocity = function () {
        if (this.enemyState !== enemyStateEnum.movingWalk) {
            this.body.velocity.x = 0;
        }
    };
    // tslint:disable-next-line:cyclomatic-complexity
    RogueEnemy.prototype.handleInput = function () {
        if (this.enemyState === enemyStateEnum.movingWalk) {
            if (this.game.physics.arcade.distanceToXY(this, this.targetX, this.targetY) < 5) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.body.velocity.setTo(0, 0);
                this.enemyState = enemyStateEnum.idle;
            }
        }
        if (this.player) {
            var distance = this.game.physics.arcade.distanceBetween(this, this.player);
            var fullAttackRange = this.attackRange;
            if (this.width < 0) {
                fullAttackRange += (this.width / 2) * -1;
            }
            else {
                fullAttackRange += this.width / 2;
            }
            if (this.player.width < 0) {
                fullAttackRange += (this.player.width / 2) * -1;
            }
            else {
                fullAttackRange += this.player.width / 2;
            }
            if (distance < fullAttackRange && this.canAttack[this.enemyState]) {
                this.attack();
            }
            else if (distance < this.aggroRange && this.canChase[this.enemyState]) {
                this.chase();
            }
        }
        if (this.canIdle[this.enemyState]) {
            this.idle();
        }
    };
    RogueEnemy.prototype.attack = function () {
        if (this.player.x > this.x) {
            this.scale.setTo(1, 1);
        }
        else {
            this.scale.setTo(-1, 1);
        }
        this.enemyState = enemyStateEnum.attack1;
    };
    RogueEnemy.prototype.chase = function () {
        this.enemyState = enemyStateEnum.movingChase;
        if (this.player.x > this.x) {
            this.scale.setTo(1, 1);
        }
        else {
            this.scale.setTo(-1, 1);
        }
        this.game.physics.arcade.moveToXY(this, this.player.x, this.y, this.stats.movespeed);
    };
    RogueEnemy.prototype.wander = function () {
        if (this.game.physics.arcade.distanceToXY(this, this.spawnPositionX, this.spawnPositionY) > this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX, this.spawnPositionY, this.stats.movespeed);
            return;
        }
        var direction = this.game.rnd.integerInRange(0, 1);
        var distance = this.game.rnd.integerInRange(10, this.maxWanderRange);
        if (direction) {
            this.moveLeft(distance);
        }
        else {
            this.moveRight(distance);
        }
    };
    RogueEnemy.prototype.moveEnemyTo = function (toX, toY, speed) {
        this.enemyState = enemyStateEnum.movingWalk;
        this.game.physics.arcade.moveToXY(this, toX, toY, speed);
        this.targetX = toX;
        this.targetY = toY;
        if (this.targetX > this.x) {
            this.scale.setTo(1, 1);
        }
        else {
            this.scale.setTo(-1, 1);
        }
    };
    RogueEnemy.prototype.moveLeft = function (distance) {
        if (this.x - distance < this.spawnPositionX - this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX - this.maxWanderRange, this.y, this.stats.movespeed);
        }
        else {
            this.moveEnemyTo(this.x - distance, this.y, this.stats.movespeed);
        }
    };
    RogueEnemy.prototype.moveRight = function (distance) {
        if (this.x + distance > this.spawnPositionX + this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX + this.maxWanderRange, this.y, this.stats.movespeed);
        }
        else {
            this.moveEnemyTo(this.x + distance, this.y, this.stats.movespeed);
        }
    };
    RogueEnemy.prototype.idle = function () {
        this.enemyState = enemyStateEnum.idle;
    };
    return RogueEnemy;
}(Phaser.Sprite));
var Level0 = /** @class */ (function (_super) {
    __extends(Level0, _super);
    function Level0() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelNumber = levelsEnum.level0;
        _this.playerStorage = JSON.parse(window.localStorage.getItem("player"));
        return _this;
    }
    Level0.prototype.preload = function () {
        this.background = 0x49801;
        this.game.add.text(100, 0, "Everything you see is a Placeholder");
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, this.game.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.width;
        this.platforms.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.enemies = this.game.add.group();
        this.npcs = this.game.add.group();
        this.npcs.add(new RogueNpc(this.game, 600, ground.y - ground.height));
        this.bonfires = this.game.add.group();
        this.game.time.advancedTiming = true;
        this.game.physics.enable(ground, Phaser.Physics.ARCADE);
    };
    Level0.prototype.create = function () {
        this.game.stage.backgroundColor = this.background;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.player = new Player(this.game, 0, 0);
        this.player.y -= this.player.height * 2;
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
        this.addPlayerToNpcs();
        this.addPlayerToEnemies();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    };
    Level0.prototype.update = function () {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.npcs, this.platforms);
        this.game.physics.arcade.collide(this.enemies, this.platforms);
        this.game.physics.arcade.collide(this.bonfires, this.platforms);
        this.playerFacingNpc();
        this.playerFacingBonfire();
    };
    Level0.prototype.addPlayerToNpcs = function () {
        for (var ii = 0; ii < this.npcs.children.length; ii++) {
            this.npcs.children[ii].player = this.player;
        }
    };
    Level0.prototype.addPlayerToEnemies = function () {
        for (var ii = 0; ii < this.enemies.children.length; ii++) {
            this.enemies.children[ii].player = this.player;
        }
    };
    Level0.prototype.playerFacingNpc = function () {
        for (var ii = 0; ii < this.npcs.children.length; ii++) {
            if (this.game.physics.arcade.overlap(this.player, this.npcs.children[ii])) {
                this.npcs.children[ii].canInteract = true;
                this.player.facingNpc = this.npcs.children[ii];
            }
            else {
                this.npcs.children[ii].canInteract = false;
                this.player.facingNpc = null;
            }
        }
    };
    Level0.prototype.playerFacingBonfire = function () {
        for (var ii = 0; ii < this.bonfires.children.length; ii++) {
            if (this.game.physics.arcade.overlap(this.player, this.bonfires.children[ii])) {
                this.bonfires.children[ii].canInteract = true;
                this.player.facingBonfire = this.bonfires.children[ii];
            }
            else {
                this.bonfires.children[ii].canInteract = false;
                this.player.facingBonfire = null;
            }
        }
    };
    return Level0;
}(Phaser.State));
var Level1 = /** @class */ (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelNumber = levelsEnum.level1;
        _this.playerStorage = JSON.parse(window.localStorage.getItem("player"));
        return _this;
    }
    Level1.prototype.preload = function () {
        this.background = 0x49801;
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, this.game.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.width;
        var ceiling = this.platforms.create(0, 0, "ceiling");
        ceiling.width = this.game.width;
        var wall = this.platforms.create(0, ceiling.height, "wall");
        wall.height = this.game.height - wall.height * 2 - ceiling.height * 2;
        var wall2 = this.platforms.create(this.game.width - wall.width, ceiling.height, "wall");
        wall2.height = this.game.height - wall2.height * 2 - ceiling.height * 2;
        this.gates = this.game.add.group();
        this.gates.enableBody = true;
        this.gates.add(new Gate(this.game, wall.x, wall.height));
        this.gates.add(new Gate(this.game, wall2.x, wall2.height));
        this.platforms.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.gates.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.enemies = this.game.add.group();
        this.enemies.add(new RogueEnemy(this.game, 600, ground.y - ground.height));
        this.enemies.add(new AdventurerEnemy(this.game, 300, ground.y - ground.height * 2));
        this.npcs = this.game.add.group();
        this.bonfires = this.game.add.group();
        this.bonfires.add(new Bonfire(this.game, 500, ground.y - ground.height));
        this.physics.enable(this.platforms, Phaser.Physics.ARCADE);
        this.physics.enable(this.gates, Phaser.Physics.ARCADE);
    };
    Level1.prototype.create = function () {
        this.game.stage.backgroundColor = this.background;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.player = new Player(this.game, 0, 0);
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
        this.addPlayerToEnemies();
        this.addPlayerToNpcs();
        this.addPlayerToGates();
    };
    Level1.prototype.update = function () {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.enemies, this.platforms);
        this.game.physics.arcade.collide(this.bonfires, this.platforms);
        this.game.physics.arcade.collide(this.player, this.gates);
        this.game.physics.arcade.collide(this.enemies, this.gates);
        this.playerFacingBonfire();
        this.playerFacingNpc();
    };
    Level1.prototype.addPlayerToNpcs = function () {
        for (var ii = 0; ii < this.npcs.children.length; ii++) {
            this.npcs.children[ii].player = this.player;
        }
    };
    Level1.prototype.addPlayerToGates = function () {
        for (var ii = 0; ii < this.gates.children.length; ii++) {
            this.gates.children[ii].player = this.player;
        }
    };
    Level1.prototype.addPlayerToEnemies = function () {
        for (var ii = 0; ii < this.enemies.children.length; ii++) {
            this.enemies.children[ii].player = this.player;
        }
    };
    Level1.prototype.playerFacingNpc = function () {
        for (var ii = 0; ii < this.npcs.children.length; ii++) {
            if (this.game.physics.arcade.overlap(this.player, this.npcs.children[ii])) {
                this.npcs.children[ii].canInteract = true;
                this.player.facingNpc = this.npcs.children[ii];
            }
            else {
                this.npcs.children[ii].canInteract = false;
                this.player.facingNpc = null;
            }
        }
    };
    Level1.prototype.playerFacingBonfire = function () {
        for (var ii = 0; ii < this.bonfires.children.length; ii++) {
            if (this.game.physics.arcade.overlap(this.player, this.bonfires.children[ii])) {
                this.bonfires.children[ii].canInteract = true;
                this.player.facingBonfire = this.bonfires.children[ii];
            }
            else {
                this.bonfires.children[ii].canInteract = false;
                this.player.facingBonfire = null;
            }
        }
    };
    Level1.prototype.roomIsClear = function () {
        if (this.enemies.children.length === 0) {
            for (var ii = 0; ii < this.gates.children.length; ii++) {
                this.gates.children[ii].roomIsClear = true;
            }
            return true;
        }
        return false;
    };
    return Level1;
}(Phaser.State));
var RogueNpc = /** @class */ (function (_super) {
    __extends(RogueNpc, _super);
    function RogueNpc(game, x, y) {
        var _a, _b, _c, _d, _e;
        var _this = _super.call(this, game, x, y, "rogue", 0) || this;
        _this.npcState = npcStateEnum.idle;
        _this.npcDialogue = [
            "Press E to Talk",
            "hello there traveler",
            "i am A",
            "*Cough*",
            "Aron",
            "it's tough out here you know",
            "hmmm...",
            "it looks like you're new to this place",
            "this place is quite dangerous",
            "heh hehe he",
            "you should be careful",
            "here take this",
            "..."
        ];
        _this.npcDialogueLine = 0;
        _this.targetX = 0;
        _this.targetY = 0;
        _this.maxWanderRange = 100;
        _this.attackRange = 0;
        _this.aggroRange = 100;
        _this.canInteract = false;
        _this.DialogueStyle = {
            font: "bold 10px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.friendly = true;
        _this.canWalk = (_a = {},
            _a[npcStateEnum.movingWalk] = true,
            _a[npcStateEnum.movingFall] = false,
            _a[npcStateEnum.idle] = true,
            _a[npcStateEnum.idleSpecial] = true,
            _a[npcStateEnum.attack1] = false,
            _a[npcStateEnum.attack2] = false,
            _a[npcStateEnum.attack3] = false,
            _a[npcStateEnum.death] = false,
            _a[npcStateEnum.sit] = false,
            _a[npcStateEnum.sitDown] = false,
            _a[npcStateEnum.movingChase] = false,
            _a);
        _this.canIdle = (_b = {},
            _b[npcStateEnum.movingWalk] = false,
            _b[npcStateEnum.movingFall] = false,
            _b[npcStateEnum.idle] = false,
            _b[npcStateEnum.idleSpecial] = false,
            _b[npcStateEnum.attack1] = false,
            _b[npcStateEnum.attack2] = false,
            _b[npcStateEnum.attack3] = false,
            _b[npcStateEnum.death] = false,
            _b[npcStateEnum.sit] = false,
            _b[npcStateEnum.sitDown] = false,
            _b[npcStateEnum.movingChase] = false,
            _b);
        _this.canChase = (_c = {},
            _c[npcStateEnum.movingWalk] = true,
            _c[npcStateEnum.movingFall] = false,
            _c[npcStateEnum.idle] = true,
            _c[npcStateEnum.idleSpecial] = true,
            _c[npcStateEnum.attack1] = false,
            _c[npcStateEnum.attack2] = false,
            _c[npcStateEnum.attack3] = false,
            _c[npcStateEnum.death] = false,
            _c[npcStateEnum.sit] = false,
            _c[npcStateEnum.sitDown] = false,
            _c[npcStateEnum.movingChase] = true,
            _c);
        _this.canAttack = (_d = {},
            _d[npcStateEnum.movingWalk] = true,
            _d[npcStateEnum.movingFall] = false,
            _d[npcStateEnum.idle] = true,
            _d[npcStateEnum.idleSpecial] = true,
            _d[npcStateEnum.attack1] = false,
            _d[npcStateEnum.attack2] = false,
            _d[npcStateEnum.attack3] = false,
            _d[npcStateEnum.death] = false,
            _d[npcStateEnum.sit] = false,
            _d[npcStateEnum.sitDown] = false,
            _d[npcStateEnum.movingChase] = true,
            _d);
        _this.npcAnimations = (_e = {},
            _e[npcStateEnum.movingWalk] = "walk",
            _e[npcStateEnum.movingFall] = "fall",
            _e[npcStateEnum.idle] = "idle",
            _e[npcStateEnum.attack1] = "attack1",
            _e[npcStateEnum.attack2] = "attack2",
            _e[npcStateEnum.attack3] = "attack3",
            _e[npcStateEnum.death] = "death",
            _e[npcStateEnum.sit] = "sit",
            _e[npcStateEnum.sitDown] = "sitdown",
            _e[npcStateEnum.movingChase] = "walk",
            _e[npcStateEnum.idleSpecial] = "butterfly",
            _e);
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        game.add.existing(_this);
        _this.body.gravity.y = 1000;
        _this.body.collideWorldBounds = true;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.body.setSize(26 / _this.scale.x, 32 / _this.scale.y, 6, 0);
        _this.spawnPositionX = x;
        _this.spawnPositionY = y;
        _this.stats = {
            level: 1,
            maxHealth: _this.maxHealth,
            health: _this.maxHealth,
            maxStamina: _this.maxHealth,
            stamina: _this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 120,
            luck: 1,
        };
        _this.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3, false).onComplete.add(function () {
            var rndNumber = _this.game.rnd.integerInRange(1, 100);
            if (rndNumber > 90) {
                _this.npcState = npcStateEnum.idleSpecial;
            }
            else if (!_this.friendly && rndNumber > 20 && rndNumber < 90) {
                _this.wander();
            }
        });
        _this.animations.add("butterfly", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 3, false).onComplete.add(function () {
            _this.animations.stop();
            _this.npcState = npcStateEnum.idle;
        });
        _this.animations.add("walk", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 3, true);
        _this.animations.add("attack1", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 6, false).onComplete.add(function () {
            _this.animations.stop();
            _this.npcState = npcStateEnum.idle;
        });
        _this.animations.add("death", [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 3, false).onComplete.add(function () {
            //kill npc and respawn
        });
        _this.health = _this.maxHealth;
        return _this;
    }
    RogueNpc.prototype.update = function () {
        this.resetVelocity();
        this.animations.play(this.npcAnimations[this.npcState]);
        if (!this.friendly) {
            this.handleInput();
        }
        if (!this.friendly) {
            this.canInteract = false;
        }
        this.interaction();
        this.checkForHit();
    };
    RogueNpc.prototype.checkForHit = function () {
        if (this.animations.currentAnim.name === "attack1" &&
            this.animations.frame > 30 &&
            this.animations.frame < 39 &&
            this.game.physics.arcade.overlap(this, this.player)) {
            this.player.takeDamage(this.stats.attack * 50, this.x);
        }
    };
    // tslint:disable-next-line:cyclomatic-complexity
    RogueNpc.prototype.handleInput = function () {
        if (this.npcState === npcStateEnum.movingWalk) {
            if (this.game.physics.arcade.distanceToXY(this, this.targetX, this.targetY) < 5) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.body.velocity.setTo(0, 0);
                this.npcState = npcStateEnum.idle;
            }
        }
        if (this.player) {
            var distance = this.game.physics.arcade.distanceBetween(this, this.player);
            var fullAttackRange = this.attackRange;
            if (this.width < 0) {
                fullAttackRange += (this.width / 2) * -1;
            }
            else {
                fullAttackRange += this.width / 2;
            }
            if (this.player.width < 0) {
                fullAttackRange += (this.player.width / 2) * -1;
            }
            else {
                fullAttackRange += this.player.width / 2;
            }
            if (distance < fullAttackRange && this.canAttack[this.npcState]) {
                this.attack();
            }
            else if (distance < this.aggroRange && this.canChase[this.npcState]) {
                this.chase();
            }
        }
        if (this.canIdle[this.npcState]) {
            this.idle();
        }
    };
    RogueNpc.prototype.attack = function () {
        if (this.player.x > this.x) {
            this.scale.setTo(1, 1);
        }
        else {
            this.scale.setTo(-1, 1);
        }
        this.npcState = npcStateEnum.attack1;
    };
    RogueNpc.prototype.chase = function () {
        this.npcState = npcStateEnum.movingChase;
        if (this.player.x > this.x) {
            this.scale.setTo(1, 1);
        }
        else {
            this.scale.setTo(-1, 1);
        }
        this.game.physics.arcade.moveToXY(this, this.player.x, this.y, this.stats.movespeed);
    };
    RogueNpc.prototype.wander = function () {
        if (this.game.physics.arcade.distanceToXY(this, this.spawnPositionX, this.spawnPositionY) > this.maxWanderRange) {
            this.moveNpcTo(this.spawnPositionX, this.spawnPositionY, this.stats.movespeed);
            return;
        }
        var direction = this.game.rnd.integerInRange(0, 1);
        var distance = this.game.rnd.integerInRange(10, this.maxWanderRange);
        if (direction) {
            this.moveLeft(distance);
        }
        else {
            this.moveRight(distance);
        }
    };
    RogueNpc.prototype.moveNpcTo = function (toX, toY, speed) {
        this.npcState = npcStateEnum.movingWalk;
        this.game.physics.arcade.moveToXY(this, toX, toY, speed);
        this.targetX = toX;
        this.targetY = toY;
        if (this.targetX > this.x) {
            this.scale.setTo(1, 1);
        }
        else {
            this.scale.setTo(-1, 1);
        }
    };
    RogueNpc.prototype.interaction = function () {
        if (!this.canInteractText) {
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 20, 0, 0);
        }
        if (this.canInteract) {
            if (this.npcDialogueLine >= this.npcDialogue.length) {
                this.npcDialogueLine = this.npcDialogue.length - 1;
            }
            this.canInteractText.setText(this.npcDialogue[this.npcDialogueLine]);
            if (this.npcDialogueLine >= this.npcDialogue.length - 1) {
                this.friendly = false;
            }
        }
        else if (!this.canInteract) {
            this.canInteractText.setText("");
            if (this.npcDialogueLine > 0) {
                this.npcDialogueLine = 1;
            }
        }
    };
    RogueNpc.prototype.nextDialogueText = function () {
        if (this.canInteract && this.friendly) {
            this.npcDialogueLine++;
        }
    };
    RogueNpc.prototype.resetVelocity = function () {
        if (this.npcState !== npcStateEnum.movingWalk) {
            this.body.velocity.x = 0;
        }
    };
    RogueNpc.prototype.moveLeft = function (distance) {
        if (this.x - distance < this.spawnPositionX - this.maxWanderRange) {
            this.moveNpcTo(this.spawnPositionX - this.maxWanderRange, this.y, this.stats.movespeed);
        }
        else {
            this.moveNpcTo(this.x - distance, this.y, this.stats.movespeed);
        }
    };
    RogueNpc.prototype.moveRight = function (distance) {
        if (this.x + distance > this.spawnPositionX + this.maxWanderRange) {
            this.moveNpcTo(this.spawnPositionX + this.maxWanderRange, this.y, this.stats.movespeed);
        }
        else {
            this.moveNpcTo(this.x + distance, this.y, this.stats.movespeed);
        }
    };
    RogueNpc.prototype.idle = function () {
        this.npcState = npcStateEnum.idle;
    };
    return RogueNpc;
}(Phaser.Sprite));
var Bonfire = /** @class */ (function (_super) {
    __extends(Bonfire, _super);
    function Bonfire(game, x, y) {
        var _this = _super.call(this, game, x, y, "bonfire", 0) || this;
        _this.bonfireDialogue = {
            lit: "Press E to sit Down",
            unlit: "Press E to light bonfire",
        };
        _this.canInteract = false;
        _this.DialogueStyle = {
            font: "bold 10px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        _this.scale.setTo(0.05, 0.05);
        game.add.existing(_this);
        _this.body.collideWorldBounds = true;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.animations.add("bonfire_not_lit", [0]);
        _this.animations.add("bonfire_lit", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, true);
        _this.isLit = false;
        return _this;
    }
    Bonfire.prototype.update = function () {
        if (this.isLit) {
            this.animations.play("bonfire_lit");
        }
        else {
            this.animations.play("bonfire_not_lit");
        }
        this.interaction();
    };
    Bonfire.prototype.interaction = function () {
        if (!this.canInteractText) {
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 20, 0, 0);
        }
        if (this.canInteract && this.isLit) {
            this.canInteractText.setText(this.bonfireDialogue.lit);
        }
        else if (this.canInteract && !this.isLit) {
            this.canInteractText.setText(this.bonfireDialogue.unlit);
        }
        else if (!this.canInteract) {
            this.canInteractText.setText("");
        }
    };
    return Bonfire;
}(Phaser.Sprite));
var Gate = /** @class */ (function (_super) {
    __extends(Gate, _super);
    function Gate(game, x, y) {
        var _this = _super.call(this, game, x, y, "gate", 0) || this;
        _this.roomIsClear = false;
        _this.isClosed = false;
        _this.height = _this.height * 2;
        _this.y -= (_this.height / 2);
        return _this;
    }
    Gate.prototype.update = function () {
        if (this.player) {
            this.closeGate();
            this.openGate();
        }
    };
    Gate.prototype.openGate = function () {
        var _this = this;
        if (this.isClosed && this.roomIsClear) {
            this.isClosed = false;
            var endX_1 = this.x;
            var endY_1 = this.y -= this.height;
            this.game.physics.arcade.moveToXY(this, endX_1, endY_1, 0.1, 500);
            this.game.time.events.add(500, function () {
                _this.body.velocity.x = 0;
                _this.body.velocity.y = 0;
                _this.x = endX_1;
                _this.y = endY_1;
            }, this);
        }
    };
    Gate.prototype.closeGate = function () {
        var _this = this;
        var distance = this.x - this.player.x;
        if (distance < 0) {
            distance *= -1;
        }
        if (!this.isClosed && !this.roomIsClear && distance > this.width * 2) {
            this.isClosed = true;
            var endX_2 = this.x;
            var endY_2 = this.y + this.height;
            this.game.physics.arcade.moveToXY(this, endX_2, endY_2, 0.2, 500);
            this.game.time.events.add(500, function () {
                _this.body.velocity.x = 0;
                _this.body.velocity.y = 0;
                _this.x = endX_2;
                _this.y = endY_2;
            }, this);
        }
    };
    return Gate;
}(Phaser.Sprite));
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
var PreloadState = /** @class */ (function (_super) {
    __extends(PreloadState, _super);
    function PreloadState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreloadState.prototype.preload = function () {
        this.game.load.onLoadStart.add(this.assets, this);
        //need one here for it to work apparently
        this.game.load.spritesheet("player", "bin/assets/player/player.png", 64, 64);
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
        this.game.load.image("floor", "bin/assets/foundations/floor.png");
        this.game.load.image("wall", "bin/assets/foundations/wall.png");
        this.game.load.image("gate", "bin/assets/foundations/gate.png");
        this.game.load.image("ceiling", "bin/assets/foundations/ceiling.png");
        this.game.load.spritesheet("rogue", "bin/assets/rogue/rogue.png", 32, 32);
        this.game.load.image("healthbar", "bin/assets/UI/healthbar.png");
        this.game.load.image("staminabar", "bin/assets/UI/staminabar.png");
        this.game.load.spritesheet("bonfire", "bin/assets/bonfire/bonfire.png", 500, 740);
        this.game.load.spritesheet("chest", "bin/assets/chest/chest.png", 30, 30);
        this.game.load.spritesheet("explosion", "bin/assets/explosion/explosion.png", 30, 30);
        this.game.load.spritesheet("adventurer", "bin/assets/adventurer/adventurer.png", 50, 37);
    };
    PreloadState.prototype.finishedLoading = function () {
        this.loadingText.setText("Load Complete");
    };
    return PreloadState;
}(Phaser.State));
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
                this.startTheGame();
                break;
            case this.loadGame:
                this.loadTheGame();
                break;
            case this.Options:
                this.optionsMenu();
                break;
            case this.githubLink:
                this.openGithubLink();
                break;
            default:
        }
    };
    TitleState.prototype.startTheGame = function () {
        window.localStorage.setItem("player", "null");
        this.switchState("level" + levelsEnum.level0);
    };
    TitleState.prototype.loadTheGame = function () {
        var loadedGame = JSON.parse(window.localStorage.getItem("player"));
        if (loadedGame) {
            this.switchState("level" + loadedGame.currentRoom);
        }
        else {
            alert("no Saved Game Found!");
        }
    };
    TitleState.prototype.optionsMenu = function () {
    };
    TitleState.prototype.openGithubLink = function () {
        window.open("http://www.github.com/twofist");
    };
    TitleState.prototype.glow = function (item) {
        item.fill = "#ffff44";
    };
    TitleState.prototype.stopGlow = function (item) {
        item.fill = "#fff";
    };
    TitleState.prototype.switchState = function (state) {
        this.game.state.start(state);
    };
    return TitleState;
}(Phaser.State));
//# sourceMappingURL=game.js.map