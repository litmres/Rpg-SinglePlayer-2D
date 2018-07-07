/// <reference path="./masterEnemy.ts"/>

class SlimeBoss extends MasterEnemy {
    slimeBossState: slimeBossStateEnum;
    slimeBossAnimations: slimeBossAnimationInterface = {
        [slimeBossStateEnum.jumpingToPlayer]: "jump",
        [slimeBossStateEnum.jumpingToWall]: "jump",
        [slimeBossStateEnum.idle]: "idle",
        [slimeBossStateEnum.death]: "death",
        [slimeBossStateEnum.regenerating]: "death",
        [slimeBossStateEnum.splattered]: "splatter",
    };
    canJumpToPlayer: slimeBossAllowanceInterface = {
        [slimeBossStateEnum.jumpingToPlayer]: false,
        [slimeBossStateEnum.jumpingToWall]: false,
        [slimeBossStateEnum.idle]: true,
        [slimeBossStateEnum.death]: false,
        [slimeBossStateEnum.regenerating]: false,
        [slimeBossStateEnum.splattered]: false,
    };
    canJumpToWall: slimeBossAllowanceInterface = {
        [slimeBossStateEnum.jumpingToPlayer]: false,
        [slimeBossStateEnum.jumpingToWall]: false,
        [slimeBossStateEnum.idle]: true,
        [slimeBossStateEnum.death]: false,
        [slimeBossStateEnum.regenerating]: false,
        [slimeBossStateEnum.splattered]: false,
    };
    canSplatter: slimeBossAllowanceInterface = {
        [slimeBossStateEnum.jumpingToPlayer]: true,
        [slimeBossStateEnum.jumpingToWall]: false,
        [slimeBossStateEnum.idle]: false,
        [slimeBossStateEnum.death]: false,
        [slimeBossStateEnum.regenerating]: false,
        [slimeBossStateEnum.splattered]: false,
    };
    canRegenerate: slimeBossAllowanceInterface = {
        [slimeBossStateEnum.jumpingToPlayer]: false,
        [slimeBossStateEnum.jumpingToWall]: false,
        [slimeBossStateEnum.idle]: false,
        [slimeBossStateEnum.death]: false,
        [slimeBossStateEnum.regenerating]: false,
        [slimeBossStateEnum.splattered]: true,
    };
    canDoNothing: slimeBossAllowanceInterface = {
        [slimeBossStateEnum.jumpingToPlayer]: false,
        [slimeBossStateEnum.jumpingToWall]: false,
        [slimeBossStateEnum.idle]: false,
        [slimeBossStateEnum.death]: false,
        [slimeBossStateEnum.regenerating]: false,
        [slimeBossStateEnum.splattered]: false,
    };
    bodyWidth: number;
    bodyHeight: number;
    defaultDirection = -1;
    isDoingJumpAttack = false;
    ground: Phaser.Group;
    walls: Phaser.Group;
    constructor(game: Phaser.Game, x: number, y: number, ground: Phaser.Group, walls: Phaser.Group) {
        super(game, x, y, "slimeboss", 0);
        this.slimeBossState = slimeBossStateEnum.idle;
        this.ground = ground;
        this.walls = walls;
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
        this.animations.add("walk", [4, 5, 6, 7], 10, true);
        this.animations.add("jump", [27], 10, false);
        this.animations.add("death", [17, 18, 19, 20], 10, false).onComplete.add(() => {
            this.kill();
        });
        this.animations.add("splatter", [17, 18, 19, 20], 10, false).onComplete.add(() => {

        });
        this.animations.add("regenerating", [21, 22, 23, 24, 25, 26], 10, false).onComplete.add(() => {

        });
        this.health = this.maxHealth;
    }

    update() {
        this.resetVelocity();

        this.animations.play(this.slimeBossAnimations[this.slimeBossState]);

        this.checkForHitting();

        this.handleInput();

        this.handleDeath();

        this.updateHitbox();
    }

    checkForHitting() {
        if (this.animations.currentAnim.name === "attack1" &&
            this.animations.frame >= 27 &&
            this.animations.frame <= 27 &&
            this.game.physics.arcade.overlap(this, this.player)
        ) {
            this.player.takeDamage(this.stats.attack * 20, this.x);
        }
    }

    jumpToWall() {
        console.log("jumping to wall");
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
        if (this.canJumpToWall[this.slimeBossState] && this.onGround()) {
            this.jumpToWall();
        }
        if (this.canJumpToPlayer[this.slimeBossState] && this.onWall()) {
            this.jumpAttack();
        }
        if (this.canSplatter[this.slimeBossState]) {
            this.splatter();
        }
        if (this.canRegenerate[this.slimeBossState]) {
            this.regenerate();
        }

        this.idle();
    }

    idle() {
        if (this.canDoNothing[this.slimeBossState]) {
            this.slimeBossState = slimeBossStateEnum.idle;
        }
    }

    regenerate() {

    }

    onGround() {
        if (this.game.physics.arcade.overlap(this, this.ground)) {
            return true;
        }
        return false;
    }

    jumpAttack() {
        this.jumpToPlayer();
        this.isDoingJumpAttack = true;
        if (this.isDoingJumpAttack && this.game.physics.arcade.overlap(this, this.player)) {
            this.player.takeDamage(this.stats.attack * 20, this.x);
        }
    }

    jumpToPlayer() {
        const px = this.player.x;
        const py = this.player.y;

        console.log("jumpingto player");
    }

    onWall() {
        if (this.game.physics.arcade.overlap(this, this.walls)) {
            return true;
        }
        return false;
    }

    splatter() {
        console.log("splat");
    }
}
