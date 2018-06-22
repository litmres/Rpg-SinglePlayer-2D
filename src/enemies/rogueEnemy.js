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
var RogueEnemy = /** @class */ (function (_super) {
    __extends(RogueEnemy, _super);
    function RogueEnemy(game, x, y) {
        var _this = _super.call(this, game, x, y, "rogue", 0) || this;
        _this.enemyState = enemyStateEnum.idle;
        _this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(_this);
        game.add.existing(_this);
        _this.body.gravity.y = 1000;
        _this.body.collideWorldBounds = true;
        game.physics.enable(_this, Phaser.Physics.ARCADE);
        _this.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3, true);
        _this.animations.add("butterfly", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 3, true);
        _this.animations.add("walk", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 3, true);
        _this.animations.add("attack1", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 3, true);
        _this.animations.add("death", [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 3, true);
        _this.health = _this.maxHealth;
        return _this;
    }
    RogueEnemy.prototype.update = function () {
        this.resetVelocity();
        this.idle();
    };
    RogueEnemy.prototype.resetVelocity = function () {
        this.body.velocity.x = 0;
    };
    RogueEnemy.prototype.moveLeft = function () {
        this.enemyState = enemyStateEnum.movingWalk;
        this.body.velocity.x = -150;
    };
    RogueEnemy.prototype.moveRight = function () {
        this.enemyState = enemyStateEnum.movingWalk;
        this.body.velocity.x = 150;
    };
    RogueEnemy.prototype.idle = function () {
        this.enemyState = enemyStateEnum.idle;
    };
    return RogueEnemy;
}(Phaser.Sprite));
//# sourceMappingURL=rogueEnemy.js.map