/// <reference path="./masterEnemy.ts"/>

class AdventurerEnemy extends MasterEnemy {
    wanderRange = 100;
    maxWanderRange = 100;
    bodyWidth: number;
    bodyHeight: number;
    aggroRange = 100;
    hitBox1: Phaser.Sprite;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "adventurer", 0);
        this.bodyWidth = 10;
        this.bodyHeight = 30;
        this.body.setSize(this.bodyWidth / this.scale.x, this.bodyHeight / this.scale.y, (this.width - this.bodyWidth) / 2, 5);
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
        this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(() => {
            const rndNumber = this.game.rnd.integerInRange(1, 100);
            if (rndNumber > 90) {
                this.enemyState = enemyStateEnum.idleSpecial;
            } else if (!this.friendly && rndNumber > 20 && rndNumber < 90) {
                this.wander();
            }
        });
        this.animations.add("idlespecial", [38, 39, 40, 41], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("walk", [8, 9, 10], 3, true);
        this.animations.add("attack1", [42, 43, 44, 45, 46, 47, 48, 49], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("death", [62, 63, 64, 65, 66, 67, 68], 10, false).onComplete.add(() => {
            this.kill();
        });
        this.health = this.maxHealth;

        this.hitBox1 = this.hitBoxes.create(0, this.height / 2);
        this.game.physics.enable(this.hitBoxes, Phaser.Physics.ARCADE);
        this.hitBox1.body.setSize(20, 10);
        this.hitBox1.name = "attack1";
    }

    update() {
        this.resetVelocity();

        this.animations.play(this.enemyAnimations[this.enemyState]);

        if (!this.friendly) {
            this.handleInput();
        }

        this.checkForHit();

        this.handleDeath();

        this.updateHitbox();
    }

    updateHitbox() {
        this.hitBoxes.forEach((v: Phaser.Sprite) => {
            if (this.width < 0) {
                v.scale.setTo(-1, 1);
            } else {
                v.scale.setTo(1, 1);
            }
        });
    }

    checkForHit() {
        if (this.animations.currentAnim.name === "attack1" &&
            this.animations.frame >= 45 &&
            this.animations.frame <= 46 &&
            this.game.physics.arcade.overlap(this.hitBox1, this.player)
        ) {
            this.player.takeDamage(this.stats.attack * 20, this.x);
        }
        if (this.player && this.player.playerState === playerStateEnum.attack1) {
            if (this.game.physics.arcade.overlap(this, this.player.hitBox1)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
        }
    }

    // tslint:disable-next-line:cyclomatic-complexity
    handleInput() {
        if (this.enemyState === enemyStateEnum.movingWalk) {
            if (this.game.physics.arcade.distanceToXY(this, this.targetX, this.targetY) < 5) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.body.velocity.setTo(0, 0);
                this.enemyState = enemyStateEnum.idle;
            }
        }

        if (this.player) {
            const distance = this.game.physics.arcade.distanceBetween(this, this.player);
            if (distance < Math.abs(this.hitBox1.width) && this.canAttack[this.enemyState]) {
                this.attack();
            } else if (distance < this.aggroRange && this.canChase[this.enemyState]) {
                this.chase();
            }
        }

        if (this.canIdle[this.enemyState]) {
            this.idle();
        }
    }
}
