/// <reference path="./masterEnemy.ts"/>

class Slime extends MasterEnemy {
    minWanderRange = 100;
    bodyWidth: number;
    bodyHeight: number;
    maxWanderRange = 100;
    maxAggroRange = 100;
    hitBox1: Phaser.Sprite;
    defaultDirection = -1;
    damageFrames = [10, 11];
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "slime", 0);
        this.bodyWidth = 16;
        this.bodyHeight = 15;
        this.body.setSize(this.bodyWidth / this.scale.x, this.bodyHeight / this.scale.y, (this.width - this.bodyWidth) / 2, this.height - this.bodyHeight);
        this.stats = {
            level: 1,
            maxHealth: this.maxHealth,
            health: this.maxHealth,
            maxStamina: this.maxHealth,
            stamina: this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 50,
            luck: 1,
        };
        this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(() => {

        });
        this.animations.add("idlespecial", [0, 1, 2, 3], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("walk", [4, 5, 6, 7], 10, true);
        this.animations.add("attack1", [8, 9, 10, 11, 12], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("death", [17, 18, 19, 20], 10, false).onComplete.add(() => {
            this.kill();
        });
        this.health = this.maxHealth;

        this.hitBox1 = this.hitBoxes.create(0, this.height / 2);
        this.game.physics.enable(this.hitBoxes, Phaser.Physics.ARCADE);
        this.hitBox1.body.setSize(15, 10);
        this.hitBox1.name = "attack1";
    }
}
