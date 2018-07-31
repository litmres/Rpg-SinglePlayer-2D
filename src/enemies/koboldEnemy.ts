/// <reference path="./masterEnemy.ts"/>

class KoboldEnemy extends MasterEnemy {
    wanderRange = 100;
    maxWanderRange = 100;
    bodyWidth: number;
    bodyHeight: number;
    aggroRange = 100;
    defaultDirection = -1;
    hitBox1: Phaser.Sprite;
    damageFrames = [12, 13, 14];
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
            const rndNumber = this.game.rnd.integerInRange(1, 100);
            if (!this.friendly && rndNumber > 20 && rndNumber < 90) {
                this.wander();
            }
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

    update() {
        this.resetVelocity();

        this.animations.play(this.enemyAnimations[this.enemyState]);

        if (!this.friendly) {
            this.handleInput();
            this.stopMovingTo();
            this.idle();
        }

        this.checkForHitting();

        this.checkForGettingHit();

        this.handleDeath();

        this.updateHitbox();
    }

    handleInput() {
        if (this.player) {
            const distance = this.game.physics.arcade.distanceBetween(this, this.player);
            if (distance < Math.abs(this.hitBox1.width) && this.canAttack[this.enemyState]) {
                this.attack();
            } else if (distance < this.aggroRange && this.canChase[this.enemyState]) {
                this.chase();
            }
        }
    }
}
