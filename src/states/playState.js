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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //level!:Level;
    PlayState.prototype.preload = function () {
        this.background = 0x49801;
        //this.level = new Level();
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, this.game.height, "ground");
        ground.y -= ground.height;
        ground.body.immovable = true;
        this.game.physics.enable(ground, Phaser.Physics.ARCADE);
    };
    PlayState.prototype.create = function () {
        this.game.stage.backgroundColor = this.background;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.player = new Player(this.game, 200, 500);
    };
    PlayState.prototype.update = function () {
        this.game.physics.arcade.collide(this.player, this.platforms);
    };
    PlayState.prototype.LoadLevel = function () {
    };
    return PlayState;
}(Phaser.State));
//# sourceMappingURL=playState.js.map