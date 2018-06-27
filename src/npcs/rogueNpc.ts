/// <reference path="./masterNpc.ts"/>

class RogueNpc extends MasterNpc {
    npcDialogue = [
        "Press E to Talk",
        "hello there traveler",
        "i am A",
        "*Cough*",
        "Aron",
        "it's tough out here you know",
        "hmmm...",
        "it looks like you're new to this place",
        "this place is quite dangerous",
        "heh hehe he",
        "you should be careful",
        "here take this",
        "..."
    ];
    bodyWidth: number;
    bodyHeight: number;
    maxWanderRange = 100;
    attackRange = 0;
    aggroRange = 100;
    hitBox1: Phaser.Sprite;
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
                this.npcState = npcStateEnum.idleSpecial;
            } else if (!this.friendly && rndNumber > 20 && rndNumber < 90) {
                this.wander();
            }
        });
        this.animations.add("idlespecial", [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.npcState = npcStateEnum.idle;
        });
        this.animations.add("walk", [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 10, true);
        this.animations.add("attack1", [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.npcState = npcStateEnum.idle;
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

        this.animations.play(this.npcAnimations[this.npcState]);

        if (!this.friendly) {
            this.handleInput();
        }

        if (!this.friendly) {
            this.canInteract = false;
        }

        this.interaction();

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
            this.animations.frame >= 34 &&
            this.animations.frame <= 36 &&
            this.game.physics.arcade.overlap(this.hitBox1, this.player)
        ) {
            this.player.takeDamage(this.stats.attack * 50, this.x);
        }

        if (this.player && this.player.playerState === playerStateEnum.attack1) {
            if (this.game.physics.arcade.overlap(this, this.player.hitBox1)) {
                this.friendly = false;
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
        }
    }

    // tslint:disable-next-line:cyclomatic-complexity
    handleInput() {
        if (this.npcState === npcStateEnum.movingWalk) {
            if (this.game.physics.arcade.distanceToXY(this, this.targetX, this.targetY) < 5) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.body.velocity.setTo(0, 0);
                this.npcState = npcStateEnum.idle;
            }
        }

        if (this.player) {
            const distance = this.game.physics.arcade.distanceBetween(this, this.player);
            if (distance < Math.abs(this.hitBox1.width) && this.canAttack[this.npcState]) {
                this.attack();
            } else if (distance < this.aggroRange && this.canChase[this.npcState]) {
                this.chase();
            }
        }

        if (this.canIdle[this.npcState]) {
            this.idle();
        }
    }
}
