/// <reference path="./masterEnemy.ts"/>

class RatEnemy extends MasterEnemy {
    minWanderRange = 100;
    maxWanderRange = 100;
    bodyWidth: number;
    bodyHeight: number;
    maxAggroRange = 100;
    hitBox1: Phaser.Sprite;
    damageFrames = [12, 13];
    defaultDirection = -1;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "rat", 0);
        this.bodyWidth = 20;
        this.bodyHeight = 15;
        this.body.setSize(this.bodyWidth / this.scale.x, this.bodyHeight / this.scale.y, (this.width - this.bodyWidth) / 3, 5);
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
        this.animations.add("walk", [4, 5, 6, 7], 3, true);
        this.animations.add("attack1", [8, 9, 10, 11, 12, 13], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("death", [20, 21], 10, false).onComplete.add(() => {
            this.kill();
        });
        this.animations.add("knockback", [18, 19], 10, false);

        this.health = this.maxHealth;

        this.hitBox1 = this.hitBoxes.create(0, this.height / 2);
        this.game.physics.enable(this.hitBoxes, Phaser.Physics.ARCADE);
        this.hitBox1.body.setSize(22, 10);
        this.hitBox1.name = "attack1";
    }
}
