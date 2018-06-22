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
        var _a, _b, _c, _d, _e;
        var _this = _super.call(this, game, x, y, "rogue", 0) || this;
        _this.enemyState = enemyStateEnum.idle;
        _this.friendly = false;
        _this.wanderRange = 100;
        _this.targetX = 0;
        _this.targetY = 0;
        _this.maxWanderRange = 100;
        _this.attackRange = 5;
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
//# sourceMappingURL=rogueEnemy.js.map