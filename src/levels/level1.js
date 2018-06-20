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
var Level1 = /** @class */ (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelNumber = levelsEnum.level1;
        _this.playerStorage = JSON.parse(window.localStorage.getItem("player"));
        _this.interActive = {
            gate1: {
                closed: false,
                gate: null,
            },
            gate2: {
                closed: true,
                gate: null,
            },
        };
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
        wall.height = this.game.height - wall.height * 2 - ceiling.height;
        var wall2 = this.platforms.create(this.game.width - wall.width, ceiling.height, "wall");
        wall2.height = this.game.height - wall2.height * 2 - ceiling.height;
        this.interActive.gate1.gate = this.platforms.create(0, wall.height, "gate");
        this.interActive.gate2.gate = this.platforms.create(this.game.width - this.interActive.gate1.gate.width, wall2.height, "gate");
        this.interActive.gate2.gate.y += this.interActive.gate2.gate.height;
        this.platforms.forEach(function (platform) {
            platform.body.immovable = true;
        });
        this.enemies = this.game.add.group();
        this.enemies.add(new RogueEnemy(this.game, 600, ground.y - ground.height));
        this.physics.enable(this.platforms, Phaser.Physics.ARCADE);
    };
    Level1.prototype.create = function () {
        this.game.stage.backgroundColor = this.background;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.player = new Player(this.game, 0, 0);
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
    };
    Level1.prototype.update = function () {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.enemies, this.platforms);
        this.closeGate();
        this.openGate();
        this.nextLevel();
    };
    Level1.prototype.nextLevel = function () {
        if (!this.interActive.gate2.closed && this.player.x >= this.interActive.gate2.gate.x) {
            this.player.savePlayer(0, this.levelNumber + 1);
            this.game.state.start("level" + (this.levelNumber + 1), true, false);
        }
    };
    Level1.prototype.previousLevel = function () {
        if (this.player.x <= this.interActive.gate1.gate.x + this.interActive.gate1.gate.width) {
            this.player.savePlayer(this.player.x, this.levelNumber - 1);
            this.game.state.start("level" + (this.levelNumber - 1), true, false);
        }
    };
    Level1.prototype.closeGate = function () {
        var _this = this;
        if (!this.interActive.gate1.closed && !this.roomIsClear() && this.player.x > this.interActive.gate1.gate.x + this.interActive.gate1.gate.width * 2) {
            this.interActive.gate1.closed = true;
            var endX_1 = this.interActive.gate1.gate.x;
            var endY_1 = this.interActive.gate1.gate.y + this.interActive.gate1.gate.height;
            this.game.physics.arcade.moveToXY(this.interActive.gate1.gate, this.interActive.gate1.gate.x, this.interActive.gate1.gate.y + this.interActive.gate1.gate.height, 0.2, 500);
            this.game.time.events.add(500, function () {
                _this.interActive.gate1.gate.body.velocity.x = 0;
                _this.interActive.gate1.gate.body.velocity.y = 0;
                _this.interActive.gate1.gate.body.x = endX_1;
                _this.interActive.gate1.gate.body.y = endY_1;
            }, this);
        }
    };
    Level1.prototype.openGate = function () {
        var _this = this;
        if (this.interActive.gate1.closed && this.roomIsClear()) {
            this.interActive.gate1.closed = false;
            var endX_2 = this.interActive.gate1.gate.x;
            var endY_2 = this.interActive.gate1.gate.y -= this.interActive.gate1.gate.height;
            this.game.physics.arcade.moveToXY(this.interActive.gate1.gate, endX_2, endY_2, 0.1, 500);
            this.game.time.events.add(500, function () {
                _this.interActive.gate1.gate.body.velocity.x = 0;
                _this.interActive.gate1.gate.body.velocity.y = 0;
                _this.interActive.gate1.gate.body.x = endX_2;
                _this.interActive.gate1.gate.body.y = endY_2;
            }, this);
        }
        if (this.interActive.gate2.closed && this.roomIsClear()) {
            this.interActive.gate2.closed = false;
            var endX_3 = this.interActive.gate2.gate.x;
            var endY_3 = this.interActive.gate2.gate.y -= this.interActive.gate2.gate.height;
            this.game.physics.arcade.moveToXY(this.interActive.gate2.gate, endX_3, endY_3, 0.1, 500);
            this.game.time.events.add(500, function () {
                _this.interActive.gate2.gate.body.velocity.x = 0;
                _this.interActive.gate2.gate.body.velocity.y = 0;
                _this.interActive.gate2.gate.body.x = endX_3;
                _this.interActive.gate2.gate.body.y = endY_3;
            }, this);
        }
    };
    Level1.prototype.roomIsClear = function () {
        if (this.enemies.children.length === 0) {
            return true;
        }
        return false;
    };
    return Level1;
}(Phaser.State));
//# sourceMappingURL=level1.js.map