/// <reference path="./masterEnemy.ts"/>

class SlimeBaby extends MasterEnemy {
    bodyWidth: number;
    bodyHeight: number;
    parentBoss: SlimeBoss;
    defaultDirection = -1;
    isMoving = false;
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
            this.kill();
        });
        this.health = this.maxHealth;
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

    takeDamage(damage: number, objPositionX: number) {
        if (this.canTakeDamage()) {
            this.stats.health -= this.calculateDamage(damage);
        }
    }

    mergeWithParent() {
        if (this.game.physics.arcade.overlap(this, this.parentBoss)) {
            this.parentBoss.fakeHealth += this.stats.health;
            this.kill();
            setTimeout(() => {
                this.destroy();
            }, 5000);
        }
    }

    moveToParent() {
        if (this.isMoving) { return; }
        this.enemyState = enemyStateEnum.movingWalk;
        this.moveNpcTowards(this.parentBoss.body.x, this.body.y, this.stats.movespeed, 5000);
        this.isMoving = true;
    }
}
