/// <reference path="./masterEnemy.ts"/>

class SlimeBoss extends MasterEnemy {
    slimeBossState: slimeBossStateEnum;
    slimeBossAnimations: slimeBossAnimationInterface = {
        [slimeBossStateEnum.jumpingToPlayer]: "jump",
        [slimeBossStateEnum.jumpingToWall]: "jump",
        [slimeBossStateEnum.idle]: "idle",
        [slimeBossStateEnum.death]: "death",
        [slimeBossStateEnum.regenerating]: "regenerating",
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
        [slimeBossStateEnum.regenerating]: true,
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
    goingToJump = false;
    player: Player;
    enemyGroup: Phaser.Group;
    fakeHealth: number;
    constructor(game: Phaser.Game, x: number, y: number, ground: Phaser.Group, walls: Phaser.Group, player: Player, enemyGroup: Phaser.Group) {
        super(game, x, y, "slimeboss", 0);
        this.enemyGroup = enemyGroup;
        this.player = player;
        this.slimeBossState = slimeBossStateEnum.idle;
        this.ground = ground;
        this.walls = walls;
        this.bodyWidth = 75;
        this.bodyHeight = 60;
        this.body.setSize(this.bodyWidth / this.scale.x, this.bodyHeight / this.scale.y, (this.width - this.bodyWidth) / 2, this.height - this.bodyHeight - 6);
        this.maxHealth = 500;
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
        this.fakeHealth = this.maxHealth;
        this.animations.add("idle", [0, 1, 2, 3], 10, false).onComplete.add(() => {

        });
        this.animations.add("walk", [4, 5, 6, 7], 10, true);
        this.animations.add("jump", [26], 10, false);
        this.animations.add("death", [17, 18, 19, 20], 10, false).onComplete.add(() => {
            this.kill();
        });
        this.animations.add("splatter", [17, 18, 19, 20], 10, false).onComplete.add(() => {

        });

        this.animations.add("regenerating", [21, 22, 23, 24, 25], 1, false).onComplete.add(() => {

        });
        this.health = this.maxHealth;
    }

    update() {
        this.game.debug.bodyInfo(this, 32, 32);
        this.game.debug.body(this);
        this.resetVelocity();

        if (this.slimeBossState !== slimeBossStateEnum.regenerating) {
            this.animations.play(this.slimeBossAnimations[this.slimeBossState]);
        }

        this.checkForHitting();

        this.handleInput();

        this.handleDeath();

        this.handleRotation();

        this.updateHitbox();
    }

    handleRotation() {
        if (this.onGround()) {
            this.angle = 0;
        }
        if (this.onWall()) {
            this.anchor.setTo(0.5, 0.5);
            if (this.body.x < 300) {
                this.updateScale(1, 1);
                this.angle = 90;
            } else {
                this.updateScale(1, -1);
                this.angle = 90;
            }

        }
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
        this.slimeBossState = slimeBossStateEnum.jumpingToWall;

        const arrayX: any = [];
        const arrayY: any = [];
        this.walls.forEach((v: Phaser.Sprite) => {
            arrayX.push(v.body.x);
            arrayY.push(v.body.height);
        });
        const wall = this.game.rnd.integerInRange(0, this.walls.length - 1);
        const tx = arrayX[wall];
        const ty = this.game.rnd.integerInRange(500, 1000);
        const angle = this.game.physics.arcade.angleToXY(this, this.body.x - tx, ty);

        console.log(tx, ty);
        console.log((this.centerX + Math.cos(angle) * this.width / 2));
        console.log(-(this.centerY + Math.sin(angle) * this.height / 2));

        this.body.velocity.x = -(this.centerX + Math.cos(angle) * this.width / 2);
        this.body.velocity.y = -(this.centerY + Math.sin(angle) * this.height / 2);
        this.goingToJump = false;
    }

    resetVelocity() {
        if (this.onGround()) {
            this.body.gravity.y = 0;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
        if (this.onWall() && this.slimeBossState !== slimeBossStateEnum.jumpingToPlayer) {
            this.body.gravity.y = 0;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
        }
        if (!this.onWall() && !this.onGround() && this.slimeBossState !== slimeBossStateEnum.jumpingToPlayer) {
            this.body.gravity.y = 1000;
        }
    }

    handleInput() {
        if (this.canJumpToWall[this.slimeBossState] && this.onGround() && !this.goingToJump) {
            this.goingToJump = true;
            setTimeout(() => {
                this.jumpToWall();
            }, 1000);
        }
        if (this.canJumpToPlayer[this.slimeBossState] && this.onWall() && !this.goingToJump) {
            this.goingToJump = true;
            setTimeout(() => {
                this.jumpAttack();
            }, 1000);
        }
        if (this.canSplatter[this.slimeBossState] && this.onGround()) {
            this.splatter();
        }
        if (this.canRegenerate[this.slimeBossState]) {
            this.regenerate();
        }

        this.idle();
    }

    idle() {
        if (this.onWall() && this.slimeBossState !== slimeBossStateEnum.jumpingToPlayer) {
            this.slimeBossState = slimeBossStateEnum.idle;
        }
    }

    regenerate() {
        this.slimeBossState = slimeBossStateEnum.regenerating;
        const num = this.stats.health / 5;
        if (this.fakeHealth < num) {
            this.animations.frame = 21;
        } else if (this.fakeHealth < num * 2) {
            this.animations.frame = 22;
        } else if (this.fakeHealth < num * 3) {
            this.animations.frame = 23;
        } else if (this.fakeHealth < num * 4) {
            this.animations.frame = 24;
        } else if (this.fakeHealth < num * 5) {
            this.animations.frame = 25;
        }
    }

    onGround() {
        return this.game.physics.arcade.overlap(this, this.ground);
    }

    jumpAttack() {
        this.jumpToPlayer();
        this.isDoingJumpAttack = true;
        if (this.isDoingJumpAttack && this.game.physics.arcade.overlap(this, this.player)) {
            this.player.takeDamage(this.stats.attack * 20, this.x);
        }
        this.goingToJump = false;
    }

    jumpToPlayer() {
        this.slimeBossState = slimeBossStateEnum.jumpingToPlayer;
        const px = this.player.body.x;
        const py = this.player.body.y;

        this.game.physics.arcade.moveToXY(this, px, py, 1000, 500);
        setTimeout(() => {
            this.x = px;
            this.y = py;
        }, 1000);
    }

    onWall() {
        return this.game.physics.arcade.overlap(this, this.walls);
    }

    splatter() {
        this.slimeBossState = slimeBossStateEnum.splattered;
        for (let ii = 0; ii < this.stats.health; ii++) {
            this.fakeHealth -= 1;
            this.enemyGroup.add(new SlimeBaby(this.game, this.centerX, this.y - 30, this, this.player));
        }
    }
}
