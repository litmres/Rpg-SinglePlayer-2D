/// <reference path="./masterEnemy.ts"/>

class RogueEnemy extends MasterEnemy {
    wanderRange = 100;
    bodyWidth: number;
    bodyHeight: number;
    maxWanderRange = 100;
    aggroRange = 100;
    hitBox1: Phaser.Sprite;
    damageFrames = [34, 35, 36];
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "rogue", 0);
        this.bodyWidth = 16;
        this.bodyHeight = 32;
        this.body.setSize(this.bodyWidth / this.scale.x, this.bodyHeight / this.scale.y, (this.width - this.bodyWidth) / 2, this.height - this.bodyHeight);
        this.stats = {
            level: 1,
            maxHealth: this.maxHealth,
            health: this.maxHealth,
            maxStamina: this.maxHealth,
            stamina: this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 120,
            luck: 1,
        };
        this.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false).onComplete.add(() => {
            const rndNumber = this.game.rnd.integerInRange(1, 100);
            if (rndNumber > 90) {
                this.enemyState = enemyStateEnum.idleSpecial;
            } else if (!this.friendly && rndNumber > 20 && rndNumber < 90) {
                this.wander();
            }
        });
        this.animations.add("idlespecial", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("walk", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 10, true);
        this.animations.add("attack1", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("death", [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 10, false).onComplete.add(() => {
            this.kill();
        });
        this.health = this.maxHealth;

        this.hitBox1 = this.hitBoxes.create(0, this.height / 2);
        this.game.physics.enable(this.hitBoxes, Phaser.Physics.ARCADE);
        this.hitBox1.body.setSize(15, 10);
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

    checkForHitting() {
        if (this.animations.currentAnim.name === "attack1" &&
            this.animations.frame >= 34 &&
            this.animations.frame <= 36 &&
            this.game.physics.arcade.overlap(this.hitBox1, this.player)
        ) {
            this.player.takeDamage(this.stats.attack * 20, this.x);
        }
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
