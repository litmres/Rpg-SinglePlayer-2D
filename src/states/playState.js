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
var PlayState = /** @class */ (function (_super) {
    __extends(PlayState, _super);
    function PlayState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelNumber = levelsEnum.level0;
        _this.playerStorage = JSON.parse(window.localStorage.getItem("player"));
        return _this;
    }
    PlayState.prototype.preload = function () {
        this.background = 0x49801;
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, this.game.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.width;
        this.platforms.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.npcs = this.game.add.group();
        this.npcs.add(new RogueNpc(this.game, 600, ground.y - ground.height));
        this.game.time.advancedTiming = true;
        this.game.physics.enable(ground, Phaser.Physics.ARCADE);
    };
    PlayState.prototype.create = function () {
        this.game.stage.backgroundColor = this.background;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        if (!this.playerStorage) {
            this.playerStorage.x = 0;
            this.playerStorage.y = 0;
        }
        this.player = new Player(this.game, this.playerStorage.x, this.playerStorage.y);
        this.player.x += this.player.width;
        this.player.y -= this.player.height * 2;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    };
    PlayState.prototype.update = function () {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.npcs, this.platforms);
        if (this.player.x >= this.game.width - this.player.width) {
            this.nextLevel();
        }
        this.playerFacingNpc();
    };
    PlayState.prototype.playerFacingNpc = function () {
        for (var ii = 0; ii < this.npcs.children.length; ii++) {
            if (this.game.physics.arcade.distanceBetween(this.player, this.npcs.children[ii]) < this.npcs.children[ii].interactRange) {
                this.npcs.children[ii].canInteract = true;
                this.player.facingNpc = this.npcs.children[ii];
            }
            else {
                this.npcs.children[ii].canInteract = false;
                this.player.facingNpc = null;
            }
        }
    };
    PlayState.prototype.nextLevel = function () {
        this.savePlayer();
        this.game.state.start("level" + (this.levelNumber + 1), true, false);
    };
    PlayState.prototype.savePlayer = function (x) {
        if (x === void 0) { x = 0; }
        var savePlayer = {
            lastCheckPoint: this.player.lastCheckPoint,
            currentRoom: this.levelNumber,
            maxhp: this.player.maxHealth,
            hp: this.player.health,
            y: this.player.y,
            x: x,
        };
        window.localStorage.setItem("player", JSON.stringify(savePlayer));
    };
    return PlayState;
}(Phaser.State));
//# sourceMappingURL=playState.js.map