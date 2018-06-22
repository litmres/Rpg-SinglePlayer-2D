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
        this.player = new Player(this.game, 20, 0);
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
//# sourceMappingURL=level0.js.map