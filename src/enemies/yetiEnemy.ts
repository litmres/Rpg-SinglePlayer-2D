/// <reference path="./masterEnemy.ts"/>

class YetiEnemy extends MasterEnemy {
    minWanderRange = 100;
    maxWanderRange = 100;
    bodyWidth: number;
    bodyHeight: number;
    maxAggroRange = 100;
    hitBox1: Phaser.Sprite;
    damageFrames = [12];
    defaultDirection = -1;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "yeti", 0);
        this.bodyWidth = 20;
        this.bodyHeight = 50;
        this.body.setSize(this.bodyWidth / this.scale.x, this.bodyHeight / this.scale.y, (this.width - this.bodyWidth) / 1.4, 5);
        this.stats = {
            level: 1,
            maxHealth: this.maxHealth,
            health: this.maxHealth,
            maxStamina: this.maxHealth,
            stamina: this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 180,
            luck: 1,
        };
        this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(() => {

        });
        this.animations.add("walk", [4, 5, 6, 7, 8, 9], 10, true);
        this.animations.add("attack1", [10, 11, 12, 13, 14], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("death", [28, 29, 30, 31, 32, 33], 10, false).onComplete.add(() => {
            this.kill();
        });
        this.health = this.maxHealth;

        this.hitBox1 = this.hitBoxes.create(0, this.height / 2);
        this.game.physics.enable(this.hitBoxes, Phaser.Physics.ARCADE);
        this.hitBox1.body.setSize(25, 10);
        this.hitBox1.name = "attack1";
    }
}
