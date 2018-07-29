/// <reference path="./masterEnemy.ts"/>

class SlimeBaby extends MasterEnemy {
    bodyWidth: number;
    bodyHeight: number;
    parentBoss: SlimeBoss;
    defaultDirection = -1;
    isMoving = false;
    merged = false;
    canStartMovingToParent = false;
    canMerge = false;
    constructor(game: Phaser.Game, x: number, y: number, parentBoss: SlimeBoss, player: Player) {
        super(game, x, y, "slime", 0);
        this.player = player;
        this.parentBoss = parentBoss;
        this.bodyWidth = 16;
        this.bodyHeight = 15;
        this.body.setSize(this.bodyWidth / this.scale.x, this.bodyHeight / this.scale.y, (this.width - this.bodyWidth) / 2, this.height - this.bodyHeight);
        this.maxHealth = 1;
        this.stats = {
            level: 1,
            maxHealth: this.maxHealth,
            health: this.maxHealth,
            maxStamina: this.maxHealth,
            stamina: this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 40,
            luck: 1,
        };
        this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(() => {

        });
        this.animations.add("walk", [4, 5, 6, 7], 10, true);
        this.animations.add("death", [17, 18, 19, 20], 10, false).onComplete.add(() => {
            this.parentBoss.stats.health -= 1;
            this.kill();
        });
        this.health = this.maxHealth;
        this.body.velocity.y = -this.game.rnd.integerInRange(200, 1000);
        this.body.velocity.x = this.game.rnd.integerInRange(-500, 500);
    }

    update() {
        this.resetVelocity();

        this.animations.play(this.enemyAnimations[this.enemyState]);

        this.moveToParent();

        this.mergeWithParent();

        this.checkForGettingHit();

        this.handleDeath();

        this.updateHitbox();
    }

    // tslint:disable-next-line:cyclomatic-complexity
    checkForGettingHit() {
        if (this.player && this.player.playerState === playerStateEnum.attack1) {
            if (!this.merged && this.game.physics.arcade.overlap(this, this.player.hitBox1)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
        } else if (this.player && this.player.playerState === playerStateEnum.attack2) {
            if (!this.merged && this.game.physics.arcade.overlap(this, this.player.hitBox2)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
        } else if (this.player && this.player.playerState === playerStateEnum.attack3) {
            if (!this.merged && this.game.physics.arcade.overlap(this, this.player.hitBox3)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
        }
    }

    mergeWithParent() {
        if (this.stats.health > 0 && this.canMerge && !this.merged && this.game.physics.arcade.overlap(this, this.parentBoss)) {
            this.parentBoss.fakeHealth += this.stats.health;
            this.merged = true;
            this.kill();
            this.destroy();
        }
    }

    resetVelocity() {
        if (this.merged) {
            this.body.velocity.x = 0;
        }
    }

    moveToParent() {
        if (this.isMoving) { return; }
        if (this.body.y < this.parentBoss.body.y) { return; }
        if (this.parentBoss.body.x > this.body.x) {
            this.updateScale(1);
        } else {
            this.updateScale(-1);
        }
        this.enemyState = enemyStateEnum.movingWalk;
        this.game.physics.arcade.moveToXY(
            this,
            this.parentBoss.centerX,
            this.body.y,
            this.stats.movespeed,
        );
        this.isMoving = true;
        this.canMerge = true;
    }
}
