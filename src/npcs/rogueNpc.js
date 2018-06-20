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
        _this.interactRange = 50;
        _this.canInteract = false;
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
        _this.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3, true);
        _this.animations.add("butterfly", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 3, true);
        _this.animations.add("walk", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 3, true);
        _this.animations.add("attack", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 3, true);
        _this.animations.add("death", [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 3, true);
        _this.health = _this.maxHealth;
        return _this;
    }
    RogueNpc.prototype.update = function () {
        this.resetVelocity();
        this.idle();
        this.handleAnimation();
        this.interaction();
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
        this.npcState = npcStateEnum.movingLeft;
        this.body.velocity.x = -150;
    };
    RogueNpc.prototype.moveRight = function () {
        this.npcState = npcStateEnum.movingRight;
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