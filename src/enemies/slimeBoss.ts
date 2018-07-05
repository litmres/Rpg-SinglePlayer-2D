/// <reference path="./masterEnemy.ts"/>

class SlimeBoss extends MasterEnemy {
    bodyWidth: number;
    bodyHeight: number;
    defaultDirection = -1;
    isDoingJumpAttack = false;
    ground = null;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "slimeboss", 0);
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
            movespeed: 60,
            luck: 1,
        };
        this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(() => {

        });
        this.animations.add("idlespecial", [0, 1, 2, 3], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("walk", [4, 5, 6, 7], 10, true);
        this.animations.add("jump", [27], 10, false);
        this.animations.add("attack1", [8, 9, 10, 11, 12], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.enemyState = enemyStateEnum.idle;
        });
        this.animations.add("death", [17, 18, 19, 20], 10, false).onComplete.add(() => {
            this.kill();
        });
        this.health = this.maxHealth;
    }

    update() {
        this.resetVelocity();

        this.animations.play(this.enemyAnimations[this.enemyState]);

        this.checkForHitting();

        this.handleInput();

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

    jumpToWall() {
        const vy = this.game.rnd.integerInRange(-350, 700);
        const vx = this.game.rnd.integerInRange(-500, 500);
        this.body.velocity.y = vy;
        this.body.velocity.x = vx;
    }

    resetVelocity() {
        if (this.onGround() || this.onWall()) {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
    }

    handleInput() {
        if (this.onGround() && this.canJumpToWall()) {
            this.jumpToWall();
        }
        if (this.onWall() && this.canJumpAttack()) {
            this.jumpAttack();
        }
        if (this.onGround() && this.canSplatter()) {
            this.splatter();
        }
    }

    onGround() {
        if (this.game.physics.arcade.overlap(this, this.ground)) {
            return true;
        }
        return false;
    }

    jumpAttack() {
        this.isDoingJumpAttack = true;
        if (this.isDoingJumpAttack && this.game.physics.arcade.overlap(this, this.player)) {
            this.player.takeDamage(this.stats.attack * 20, this.x);
        }
    }

    canJumpToWall() {

    }

    onWall() {
        if (this.game.physics.arcade.overlap(this, this.walls)) {
            return true;
        }
        return false;
    }

    canJumpAttack() {

    }

    canSplatter() {
        if (this.onGround() && this.isDoingJumpAttack) {
            this.splatter();
        }
    }

    splatter() {
        console.log("splat");
    }
}
