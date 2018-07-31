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
    canJumpToPlayer = slimeBossAllowance([
        slimeBossStateEnum.idle
    ]);
    canJumpToWall = slimeBossAllowance([
        slimeBossStateEnum.idle
    ]);
    canSplatter = slimeBossAllowance([
        slimeBossStateEnum.jumpingToPlayer
    ]);
    canRegenerate = slimeBossAllowance([
        slimeBossStateEnum.regenerating,
        slimeBossStateEnum.splattered
    ]);
    canDoNothing = slimeBossAllowance([
        slimeBossStateEnum.regenerating
    ]);
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
    bossOverlay: Phaser.Group;
    canSpawnNormalEnemy = true;
    damageFrames = [26];
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
            this.bossOverlay.destroy();
            this.kill();
        });
        this.animations.add("splatter", [17, 18, 19, 20], 10, false).onComplete.add(() => {

        });

        this.animations.add("regenerating", [21, 22, 23, 24, 25], 1, false).onComplete.add(() => {

        });
        this.health = this.maxHealth;

        this.bossOverlay = this.game.add.group();
        this.bossOverlay.add(new BossOverlay(this.game, this.game.camera.width / 4, this.game.camera.height - 29, this));
        this.game.world.bringToTop(this.bossOverlay);
    }

    update() {
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

    handleDeath() {
        if (this.stats.health <= 0 && this.slimeBossState !== slimeBossStateEnum.death) {
            this.invincible = true;
            this.slimeBossState = slimeBossStateEnum.death;
        }
    }

    handleRotation() {
        if (this.onGround()) {
            this.angle = 0;
        }
        if (this.onWall()) {
            this.anchor.setTo(0.5, 0.5);
            if (this.body.x < 300) {
                this.updateScale(-1, 1);
                this.angle = 90;
            } else {
                this.updateScale(1, -1);
                this.angle = -90;
            }

        }
        if (!this.onWall() && !this.onGround() && this.body.velocity.x > 0) {
            this.updateScale(1);
        } else {
            this.updateScale(-1);
        }
    }

    checkForHitting() {
        if (this.animations.currentAnim.name === "jump" &&
            this.animations.frame >= 26 &&
            this.animations.frame <= 26 &&
            this.game.physics.arcade.overlap(this, this.player) &&
            this.slimeBossState === slimeBossStateEnum.jumpingToPlayer
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
        const ty = arrayY[wall];
        const angle = this.game.physics.arcade.angleToXY(this, tx, ty);

        const arrayD = [-1, 1];
        const direction = this.game.rnd.integerInRange(0, arrayD.length - 1);

        this.body.velocity.x = -(this.body.x + Math.cos(angle) * this.width / 2) * arrayD[direction] * 2;
        this.body.velocity.y = -(this.body.y + Math.sin(angle) * this.height / 2);

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
    // tslint:disable-next-line:cyclomatic-complexity
    handleInput() {
        if (this.canJumpToWall[this.slimeBossState] && this.onGround() && !this.goingToJump) {
            this.goingToJump = true;
            setTimeout(() => {
                this.jumpToWall();
            }, this.game.rnd.integerInRange(1000, 2000));
        }
        if (this.canJumpToPlayer[this.slimeBossState] && this.onWall() && !this.goingToJump) {
            this.goingToJump = true;
            setTimeout(() => {
                this.jumpAttack();
            }, this.game.rnd.integerInRange(500, 2500));
        }
        if (this.canSplatter[this.slimeBossState] && this.onGround()) {
            this.splatter();
        }
        if (this.canRegenerate[this.slimeBossState]) {
            this.regenerate();
        }
        if (this.slimeBossState === slimeBossStateEnum.jumpingToWall &&
            this.canSpawnNormalEnemy &&
            this.x < this.player.x &&
            this.x + this.width > this.player.x + this.player.width
        ) {
            this.spawnNormalEnemy();
        }

        this.idle();
    }

    spawnNormalEnemy() {
        this.canSpawnNormalEnemy = false;
        setTimeout(() => {
            this.canSpawnNormalEnemy = true;
        }, 1000);
        this.stats.health -= 5;
        this.fakeHealth = this.stats.health;
        const slime = new Slime(this.game, this.centerX, this.y - 30);
        slime.player = this.player;
        this.enemyGroup.add(slime);
    }

    idle() {
        if ((this.onWall() && this.slimeBossState !== slimeBossStateEnum.jumpingToPlayer) ||
            (this.onGround() && this.canDoNothing[this.slimeBossState] && this.stats.health === this.fakeHealth)
        ) {
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
        const px = this.player.body.x + this.player.width / 2;
        const py = this.player.body.y - this.player.height / 2;

        this.game.physics.arcade.moveToXY(this, px, py, 1000, 500);
        setTimeout(() => {
            this.x = px;
            this.y = py;
        }, 500);
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

function slimeBossAllowance(array: Array<slimeBossStateEnum>): slimeBossAllowanceInterface {

    const obj: slimeBossAllowanceInterface = {
        [slimeBossStateEnum.jumpingToPlayer]: false,
        [slimeBossStateEnum.jumpingToWall]: false,
        [slimeBossStateEnum.idle]: false,
        [slimeBossStateEnum.death]: false,
        [slimeBossStateEnum.regenerating]: false,
        [slimeBossStateEnum.splattered]: false,
    };

    array.forEach((v) => {
        obj[v] = true;
    });

    return obj;
}
