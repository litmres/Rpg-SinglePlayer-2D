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
        _this.attackRange = 5;
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
//# sourceMappingURL=rogueNpc.js.map