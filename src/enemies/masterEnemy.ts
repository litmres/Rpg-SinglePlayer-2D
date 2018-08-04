class MasterEnemy extends Phaser.Sprite {
    enemyState: enemyStateEnum = enemyStateEnum.idle;
    friendly = false;
    player: Player | null = null;
    targetX = 0;
    targetY = 0;
    defaultScaleWidth = 1;
    defaultScaleHeight = 1;
    defaultDirection = 1;
    maxWanderRange = 100;
    spawnPositionX: number;
    spawnPositionY: number;
    maxRestRange = 40;
    maxAggroRange = 100;
    attackCooldown = 2000;
    attackTimer: null | number = null;
    allowAttack = true;
    canWalk = enemyAllowance([
        enemyStateEnum.idle,
        enemyStateEnum.idleSpecial,
    ]);
    canIdle = enemyAllowance([
        enemyStateEnum.movingChase
    ]);
    canChase = enemyAllowance([
        enemyStateEnum.movingWalk,
        enemyStateEnum.idle,
        enemyStateEnum.idleSpecial,
        enemyStateEnum.movingChase
    ]);
    canAttack = enemyAllowance([
        enemyStateEnum.movingWalk,
        enemyStateEnum.idle,
        enemyStateEnum.idleSpecial,
        enemyStateEnum.movingChase
    ]);
    stats: playerStatsInterface;
    enemyAnimations: enemyAnimationInterface = {
        [enemyStateEnum.movingWalk]: "walk",
        [enemyStateEnum.movingFall]: "fall",
        [enemyStateEnum.idle]: "idle",
        [enemyStateEnum.attack1]: "attack1",
        [enemyStateEnum.attack2]: "attack2",
        [enemyStateEnum.attack3]: "attack3",
        [enemyStateEnum.death]: "death",
        [enemyStateEnum.sit]: "sit",
        [enemyStateEnum.sitDown]: "sitdown",
        [enemyStateEnum.movingChase]: "walk",
        [enemyStateEnum.idleSpecial]: "idlespecial",
        [enemyStateEnum.knockBack]: "knockback",
    };
    hitBox1: Phaser.Sprite | null = null;
    invincible = false;
    hitBoxes: Phaser.Group;
    patrolDirection = 1;
    damageFrames: number[] = [];
    moveOption = moveOption.guard;
    constructor(game: Phaser.Game, x: number, y: number, key?: string, frame?: number) {
        super(game, x, y, key, frame);
        this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(this);
        game.add.existing(this);
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.spawnPositionX = x;
        this.spawnPositionY = y;
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
        this.hitBoxes = this.game.add.group();

        this.addChild(this.hitBoxes);
    }

    update() {
        this.resetVelocity();

        this.animations.play(this.enemyAnimations[this.enemyState]);

        if (!this.friendly) {
            this.handleInput();
            this.stopMovingTo();
        }

        this.checkForHitting();

        this.checkForGettingHit();

        this.handleDeath();

        this.updateHitbox();
    }

    handleInput() {
        if (this.player) {
            const distance = this.game.physics.arcade.distanceBetween(this, this.player);
            if (this.isAllowedToAttack(distance)) {
                this.attack();
            } else if (this.isAllowedToChase(distance)) {
                this.chase();
            } else if (this.isAllowedToWander()) {
                if (this.moveOption === moveOption.patrol) {
                    this.patrol();
                } else if (this.moveOption === moveOption.wander) {
                    this.wander();
                }
            } else {
                this.idle();
            }
        }
    }

    isAllowedToWander() {
        if (this.canWalk[this.enemyState]) {
            return true;
        }
        return false;
    }

    isAllowedToChase(distance: number) {
        if (!this.allowRestRange(distance) &&
            this.betweenAggroRange(distance) &&
            this.canChase[this.enemyState]) {
            return true;
        }
        return false;
    }

    isAllowedToAttack(distance: number) {
        if (this.game.physics.arcade.overlap(this.player, this.hitBox1) &&
            this.canAttack[this.enemyState] &&
            this.allowAttack) {
            return true;
        }
        return false;
    }

    allowRestRange(distance: number) {
        if (!this.allowAttack && distance < this.maxRestRange) {
            return true;
        }
        return false;
    }

    betweenAggroRange(distance: number) {
        if (!this.game.physics.arcade.overlap(this.player, this.hitBox1) && distance < this.maxAggroRange) {
            return true;
        }
        return false;
    }

    stopMovingTo() {
        if (this.enemyState === enemyStateEnum.movingWalk) {
            if (Math.abs(this.targetX - this.x) < 5) {
                this.x = this.targetX;
                this.y = this.y;
                this.body.velocity.setTo(0, 0);
                this.enemyState = enemyStateEnum.idle;
            }
        }
    }

    updateHitbox() {
        this.hitBoxes.forEach((v: Phaser.Sprite) => {
            if (this.width < 0) {
                v.scale.setTo(this.defaultDirection * this.defaultScaleWidth * -1, this.defaultScaleHeight);
            } else {
                v.scale.setTo(this.defaultDirection * this.defaultScaleWidth, this.defaultScaleHeight);
            }
        });
    }

    // tslint:disable-next-line:cyclomatic-complexity
    checkForGettingHit() {
        if (this.player && this.player.damageFrames.indexOf(this.player.animations.frame) >= 0) {
            if (this.player.playerState === playerStateEnum.attack1 && this.game.physics.arcade.overlap(this, this.player.hitBox1)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            } else if (this.player.playerState === playerStateEnum.attack2 && this.game.physics.arcade.overlap(this, this.player.hitBox2)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            } else if (this.player.playerState === playerStateEnum.attack3 && this.game.physics.arcade.overlap(this, this.player.hitBox3)) {
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
        }
    }

    handleDeath() {
        if (this.stats.health <= 0 && this.enemyState !== enemyStateEnum.death) {
            this.invincible = true;
            this.enemyState = enemyStateEnum.death;
        }
    }

    takeDamage(damage: number, objPositionX: number) {
        if (this.canTakeDamage()) {
            this.stats.health -= this.calculateDamage(damage);
            this.invincible = true;
            if (this.stats.health > 0) {
                this.game.time.events.add(1000, this.resetInvincable, this);
                this.hurt();
                //fix knockback
                //this.knockBack(objPositionX);
            }
        }
    }

    hurt() {
        this.enemyState = enemyStateEnum.knockBack;
        setTimeout(() => {
            this.enemyState = enemyStateEnum.idle;
        }, 750);
    }

    knockBack(objPositionX: number) {
        this.enemyState = enemyStateEnum.knockBack;
        if (this.x > objPositionX) {
            this.updateScale(-1);
            this.moveNpcTowards(this.x - this.width * this.defaultDirection, this.y, 0.2, 700, enemyStateEnum.idle);
        } else {
            this.updateScale(1);
            this.moveNpcTowards(this.x - this.width * this.defaultDirection, this.y, 0.2, 700, enemyStateEnum.idle);
        }
    }

    moveNpcTowards(toX: number, toY: number, speed: number, time = 0, endState = enemyStateEnum.idle) {
        this.game.physics.arcade.moveToXY(
            this,
            toX,
            toY,
            speed,
            time
        );

        this.game.time.events.add(time, () => {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.x = toX;
            this.y = toY;
            this.enemyState = endState;
        }, this);
    }

    checkForHitting() {
        if (this.player &&
            this.damageFrames.indexOf(this.animations.frame) >= 0 &&
            this.game.physics.arcade.overlap(this.hitBox1, this.player)
        ) {
            this.player.takeDamage(this.stats.attack * 20, this.x);
        }
    }

    resetInvincable() {
        this.invincible = false;
    }

    calculateDamage(damage: number) {
        if (this.stats.health - damage < 0) {
            return this.stats.health;
        }
        return damage;
    }

    canTakeDamage() {
        if (this.invincible || this.enemyState === enemyStateEnum.death) {
            return false;
        }
        return true;
    }

    resetVelocity() {
        if (
            this.enemyState !== enemyStateEnum.movingWalk &&
            this.enemyState !== enemyStateEnum.knockBack
        ) {
            this.body.velocity.x = 0;
        }
    }

    attack() {
        if (this.player && this.player.x > this.x) {
            this.scale.setTo(this.defaultDirection * this.defaultScaleWidth, this.defaultScaleHeight);
        } else {
            this.scale.setTo(this.defaultDirection * this.defaultScaleWidth * -1, this.defaultScaleHeight);
        }
        this.enemyState = enemyStateEnum.attack1;
        this.allowAttack = false;
        this.attackTimer = setTimeout(() => {
            this.allowAttack = true;
        }, this.attackCooldown);
    }

    chase() {
        if (!this.player) { return; }
        this.enemyState = enemyStateEnum.movingChase;
        if (this.player.x > this.x) {
            this.updateScale(1);
        } else {
            this.updateScale(-1);
        }
        this.game.physics.arcade.moveToXY(this, this.player.x, this.y, this.stats.movespeed);
    }

    patrol() {
        if (this.x > this.spawnPositionX + this.maxWanderRange) {
            this.patrolDirection = 1;
        } else if (this.x < this.spawnPositionX - this.maxWanderRange) {
            this.patrolDirection = 0;
        }

        if (this.patrolDirection) {
            this.moveLeft(this.maxWanderRange);
        } else {
            this.moveRight(this.maxWanderRange);
        }
    }

    wander() {
        if (this.x > this.spawnPositionX + this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX, this.spawnPositionY, this.stats.movespeed);
            return;
        } else if (this.x < this.spawnPositionX - this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX, this.spawnPositionY, this.stats.movespeed);
            return;
        }
        const direction = this.game.rnd.integerInRange(0, 1);
        const distance = this.game.rnd.integerInRange(20, this.maxWanderRange);
        if (direction) {
            this.moveLeft(distance);
        } else {
            this.moveRight(distance);
        }
    }

    moveEnemyTo(toX: number, toY: number, speed: number) {
        this.enemyState = enemyStateEnum.movingWalk;
        this.game.physics.arcade.moveToXY(
            this,
            toX,
            toY,
            speed
        );
        this.targetX = toX;
        this.targetY = toY;

        if (this.targetX > this.x) {
            this.updateScale(1);
        } else {
            this.updateScale(-1);
        }
    }

    moveLeft(distance: number) {
        if (this.x - distance < this.spawnPositionX - this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX - this.maxWanderRange, this.y, this.stats.movespeed);
        } else {
            this.moveEnemyTo(this.x - distance, this.y, this.stats.movespeed);
        }
    }

    moveRight(distance: number) {
        if (this.x + distance > this.spawnPositionX + this.maxWanderRange) {
            this.moveEnemyTo(this.spawnPositionX + this.maxWanderRange, this.y, this.stats.movespeed);
        } else {
            this.moveEnemyTo(this.x + distance, this.y, this.stats.movespeed);
        }
    }

    idle() {
        if (this.canIdle[this.enemyState]) {
            const rndNumber = this.game.rnd.integerInRange(1, 100);
            if (rndNumber > 90) {
                this.enemyState = enemyStateEnum.idleSpecial;
            } else {
                this.enemyState = enemyStateEnum.idle;
            }
        }
    }

    updateScale(direction = 1, upsideDown = 1) {
        this.scale.setTo(this.defaultDirection * this.defaultScaleWidth * direction, this.defaultScaleHeight * upsideDown);
    }
}

function enemyAllowance(array: Array<enemyStateEnum>): enemyAllowanceInterface {

    const obj: enemyAllowanceInterface = {
        [enemyStateEnum.movingWalk]: false,
        [enemyStateEnum.movingFall]: false,
        [enemyStateEnum.idle]: false,
        [enemyStateEnum.idleSpecial]: false,
        [enemyStateEnum.attack1]: false,
        [enemyStateEnum.attack2]: false,
        [enemyStateEnum.attack3]: false,
        [enemyStateEnum.death]: false,
        [enemyStateEnum.sit]: false,
        [enemyStateEnum.sitDown]: false,
        [enemyStateEnum.movingChase]: false,
        [enemyStateEnum.knockBack]: false,
    };

    array.forEach((v) => {
        obj[v] = true;
    });

    return obj;
}
