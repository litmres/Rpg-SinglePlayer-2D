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
        var _a, _b, _c, _d;
        var _this = _super.call(this, game, x, y, "rogue", 0) || this;
        _this.npcState = npcStateEnum.idle;
        _this.npcDialogue = [
            "Press E to Talk",
            "hello there wanderer",
            "it looks like you're new to this place",
            "this place is dangerous",
            "you should be careful",
            "here take this",
            "..."
        ];
        _this.npcDialogueLine = 0;
        _this.canInteract = false;
        _this.DialogueStyle = {
            font: "bold 10px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        _this.friendly = true;
        _this.canIdle = (_a = {},
            _a[playerStateEnum.movingWalk] = true,
            _a[playerStateEnum.movingFall] = false,
            _a[playerStateEnum.idle] = false,
            _a[playerStateEnum.attack1] = false,
            _a[playerStateEnum.attack2] = false,
            _a[playerStateEnum.attack3] = false,
            _a[playerStateEnum.death] = false,
            _a[playerStateEnum.sit] = false,
            _a[playerStateEnum.sitDown] = false,
            _a[playerStateEnum.movingStartWalk] = true,
            _a);
        _this.canAttack = (_b = {},
            _b[playerStateEnum.movingWalk] = true,
            _b[playerStateEnum.movingFall] = false,
            _b[playerStateEnum.idle] = true,
            _b[playerStateEnum.attack1] = false,
            _b[playerStateEnum.attack2] = false,
            _b[playerStateEnum.attack3] = false,
            _b[playerStateEnum.death] = false,
            _b[playerStateEnum.sit] = false,
            _b[playerStateEnum.sitDown] = false,
            _b[playerStateEnum.movingStartWalk] = true,
            _b);
        _this.canSitDown = (_c = {},
            _c[playerStateEnum.movingWalk] = true,
            _c[playerStateEnum.movingFall] = false,
            _c[playerStateEnum.idle] = true,
            _c[playerStateEnum.attack1] = false,
            _c[playerStateEnum.attack2] = false,
            _c[playerStateEnum.attack3] = false,
            _c[playerStateEnum.death] = false,
            _c[playerStateEnum.sit] = false,
            _c[playerStateEnum.sitDown] = false,
            _c[playerStateEnum.movingStartWalk] = true,
            _c);
        _this.npcAnimations = (_d = {},
            _d[npcStateEnum.movingWalk] = "walk",
            _d[npcStateEnum.movingFall] = "fall",
            _d[npcStateEnum.idle] = "idle",
            _d[npcStateEnum.attack1] = "attack1",
            _d[npcStateEnum.attack2] = "attack2",
            _d[npcStateEnum.attack3] = "attack3",
            _d[npcStateEnum.death] = "death",
            _d[npcStateEnum.sit] = "sit",
            _d[npcStateEnum.sitDown] = "sitdown",
            _d[npcStateEnum.movingStartWalk] = "startwalk",
            _d);
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
        _this.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3, false).onComplete.add(function () {
            //if(randomchance){
            //    this.animation.play("butterfly");
            //}else{
            _this.animations.play("idle");
            //}
        });
        _this.animations.add("butterfly", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 3, false).onComplete.add(function () {
            _this.animations.stop();
            _this.animations.play("idle");
        });
        _this.animations.add("walk", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 3, true);
        _this.animations.add("attack", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 3, false).onComplete.add(function () {
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
        this.handleInput();
        this.handleAnimation();
        this.interaction();
    };
    // tslint:disable-next-line:cyclomatic-complexity
    RogueNpc.prototype.handleInput = function () {
        /*
        if (this.controls.LEFT.isDown && this.canWalk[this.playerState]) {
            this.moveLeft();
        } else if (this.controls.RIGHT.isDown && this.canWalk[this.playerState]) {
            this.moveRight();
        }else if(this.controls.E.justPressed() && this.facingBonfire && this.canSitDown[this.playerState]){
            this.handleBonfire();
        }else if(this.controls.E.justPressed() && this.facingNpc){
            this.handleNpc();
        }else if(this.canIdle[this.playerState]){
            this.idle();
        }
        */
    };
    // tslint:disable-next-line:cyclomatic-complexity
    RogueNpc.prototype.interaction = function () {
        if (!this.friendly && this.canInteractText) {
            this.canInteractText.setText("");
            return;
        }
        else if (!this.friendly) {
            return;
        }
        if (!this.canInteractText) {
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 20, 0, 0);
        }
        if (this.canInteract) {
            if (this.npcDialogueLine >= this.npcDialogue.length) {
                this.npcDialogueLine = this.npcDialogue.length - 1;
            }
            this.canInteractText.setText(this.npcDialogue[this.npcDialogueLine]);
        }
        else if (!this.canInteract) {
            this.canInteractText.setText("");
            if (this.npcDialogueLine > 0) {
                this.npcDialogueLine = 1;
            }
        }
    };
    RogueNpc.prototype.nextDialogueText = function () {
        if (this.canInteract) {
            this.npcDialogueLine++;
        }
    };
    RogueNpc.prototype.resetVelocity = function () {
        this.body.velocity.x = 0;
    };
    RogueNpc.prototype.moveLeft = function () {
        this.npcState = npcStateEnum.movingWalk;
        this.scale.setTo(-1, 1);
        this.body.velocity.x = -150;
    };
    RogueNpc.prototype.moveRight = function () {
        this.npcState = npcStateEnum.movingWalk;
        this.scale.setTo(1, 1);
        this.body.velocity.x = 150;
    };
    RogueNpc.prototype.idle = function () {
        this.npcState = npcStateEnum.idle;
    };
    RogueNpc.prototype.handleAnimation = function () {
        switch (this.npcState) {
            case npcStateEnum.idle:
                this.play("idle");
                break;
            default:
        }
    };
    return RogueNpc;
}(Phaser.Sprite));
//# sourceMappingURL=rogueNpc.js.map