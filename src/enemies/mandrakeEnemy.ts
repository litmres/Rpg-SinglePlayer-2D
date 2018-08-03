/// <reference path="./masterEnemy.ts"/>

class MandrakeEnemy extends MasterEnemy {
    minWanderRange = 100;
    maxWanderRange = 100;
    bodyWidth: number;
    bodyHeight: number;
    maxAggroRange = 100;
    hitBox1: Phaser.Sprite;
    damageFrames = [19, 20];
    defaultDirection = -1;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "mandrake", 0);
        this.bodyWidth = 10;
        this.bodyHeight = 32;
        this.body.setSize(this.bodyWidth / this.scale.x, this.bodyHeight / this.scale.y, (this.width - this.bodyWidth) / 1.5, 5);
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
        this.animations.add("idle", [5], 10, false).onComplete.add(() => {

        });
        this.animations.add("walk", [6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
        this.animations.add("attack1", [15, 16, 17, 18, 19, 20, 21], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("death", [29, 30, 31, 32, 33, 34], 10, false).onComplete.add(() => {
            this.kill();
        });
        this.health = this.maxHealth;

        this.hitBox1 = this.hitBoxes.create(10, this.height / 2);
        this.game.physics.enable(this.hitBoxes, Phaser.Physics.ARCADE);
        this.hitBox1.body.setSize(25, 10);
        this.hitBox1.name = "attack1";
    }
}
