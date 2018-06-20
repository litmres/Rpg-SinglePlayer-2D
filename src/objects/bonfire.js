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
var Bonfire = /** @class */ (function (_super) {
    __extends(Bonfire, _super);
    function Bonfire(game, x, y) {
        var _this = _super.call(this, game, x, y, "bonfire", 0) || this;
        _this.bonfireDialogue = {
            lit: "Press E to sit Down",
            unlit: "Press E to light bonfire",
        };
        _this.canInteract = false;
        _this.interactRange = 50;
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
        _this.isLit = true;
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
            this.canInteractText.setText(this.bonfireDialogue.lit);
        }
        else if (!this.canInteract) {
            this.canInteractText.setText("");
        }
    };
    return Bonfire;
}(Phaser.Sprite));
//# sourceMappingURL=bonfire.js.map