/// <reference path="./masterEnemy.ts"/>

class KoboldEnemy extends MasterEnemy {
    minWanderRange = 100;
    maxWanderRange = 100;
    bodyWidth: number;
    bodyHeight: number;
    maxAggroRange = 100;
    defaultDirection = -1;
    hitBox1: Phaser.Sprite;
    damageFrames = [12, 13, 14];
    attackCount = 0;
    resetAttackCount: null | number = null;
    attackCooldown = 5000;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "kobold", 0);
        this.bodyWidth = 18;
        this.bodyHeight = 28;
        this.body.setSize(this.bodyWidth / this.scale.x, this.bodyHeight / this.scale.y, (this.width - this.bodyWidth) / 2 + 10, 5);
        this.stats = {
            level: 1,
            maxHealth: this.maxHealth,
            health: this.maxHealth,
            maxStamina: this.maxHealth,
            stamina: this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 150,
            luck: 1,
        };
        this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(() => {

        });
        this.animations.add("walk", [4, 5, 6, 7, 8, 9], 3, true);
        this.animations.add("attack1", [10, 11, 12, 13, 14], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("knockback", [15, 16, 17, 18,], 10, false);
        this.animations.add("death", [19, 20, 21, 22, 23, 24], 10, false).onComplete.add(() => {
            this.kill();
        });
        this.health = this.maxHealth;

        this.hitBox1 = this.hitBoxes.create(0, this.height / 2);
        this.game.physics.enable(this.hitBoxes, Phaser.Physics.ARCADE);
        this.hitBox1.body.setSize(32, 10);
        this.hitBox1.name = "attack1";
    }

    attack() {
        if (this.player && this.player.x > this.x) {
            this.scale.setTo(this.defaultDirection * this.defaultScaleWidth, this.defaultScaleHeight);
        } else {
            this.scale.setTo(this.defaultDirection * this.defaultScaleWidth * -1, this.defaultScaleHeight);
        }
        this.enemyState = enemyStateEnum.attack1;
        this.attackCount++;
        if (this.attackCount >= 3) {
            this.allowAttack = false;
        }
        if (this.resetAttackCount) {
            clearTimeout(this.resetAttackCount);
        }
        this.resetAttackCount = setTimeout(() => {
            this.attackCount = 0;
        }, 3000);
        this.attackTimer = setTimeout(() => {
            this.allowAttack = true;
            this.attackCount = 0;
        }, this.attackCooldown);
    }

}
