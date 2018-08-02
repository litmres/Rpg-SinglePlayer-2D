class MasterNpc extends Phaser.Sprite {
    npcState: npcStateEnum = npcStateEnum.idle;
    npcDialogue = [
        "..."
    ];
    npcDialogueLine = 0;
    player: Player | null = null;
    targetX = 0;
    targetY = 0;
    maxWanderRange = 100;
    attackRange = 0;
    spawnPositionX: number;
    spawnPositionY: number;
    aggroRange = 100;
    canInteract = false;
    canInteractText!: Phaser.Text | null;
    maxRestRange = 40;
    maxAggroRange = 100;
    attackCooldown = 2000;
    attackTimer: null | number = null;
    allowAttack = true;
    DialogueStyle = {
        font: "bold 10px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };
    friendly = true;
    canWalk = npcAllowance([
        npcStateEnum.movingWalk,
        npcStateEnum.idle,
        npcStateEnum.idleSpecial
    ]);
    canIdle = npcAllowance([]);
    canChase = npcAllowance([
        npcStateEnum.movingWalk,
        npcStateEnum.idle,
        npcStateEnum.idleSpecial,
        npcStateEnum.movingChase
    ]);
    canAttack = npcAllowance([
        npcStateEnum.movingWalk,
        npcStateEnum.idle,
        npcStateEnum.idleSpecial,
        npcStateEnum.movingChase
    ]);
    stats: playerStatsInterface;
    npcAnimations: npcAnimationInterface = {
        [npcStateEnum.movingWalk]: "walk",
        [npcStateEnum.movingFall]: "fall",
        [npcStateEnum.idle]: "idle",
        [npcStateEnum.attack1]: "attack1",
        [npcStateEnum.attack2]: "attack2",
        [npcStateEnum.attack3]: "attack3",
        [npcStateEnum.death]: "death",
        [npcStateEnum.sit]: "sit",
        [npcStateEnum.sitDown]: "sitdown",
        [npcStateEnum.movingChase]: "walk",
        [npcStateEnum.idleSpecial]: "idlespecial",
        [npcStateEnum.knockBack]: "knockback",
    };
    invincible = false;
    hitBoxes: Phaser.Group;
    hitBox1: Phaser.Sprite | null = null;
    damageFrames: number[] = [];
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
            movespeed: 120,
            luck: 1,
        };

        this.hitBoxes = this.game.add.group();

        this.addChild(this.hitBoxes);
    }

    update() {
        this.resetVelocity();

        this.animations.play(this.npcAnimations[this.npcState]);

        if (!this.friendly) {
            this.handleInput();
            this.stopMovingTo();
            this.idle();
            this.canInteract = false;
        }

        this.interaction();

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
                //this.wander();
            } else {
                this.idle();
            }
        }
    }

    isAllowedToWander() {
        if (this.canWalk[this.npcState]) {
            return true;
        }
        return false;
    }

    isAllowedToChase(distance: number) {
        if (!this.allowRestRange(distance) &&
            this.betweenAggroRange(distance) &&
            this.canChase[this.npcState]) {
            return true;
        }
        return false;
    }

    isAllowedToAttack(distance: number) {
        if (this.game.physics.arcade.overlap(this.player, this.hitBox1) &&
            this.canAttack[this.npcState] &&
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
        if (this.npcState === npcStateEnum.movingWalk) {
            if (this.game.physics.arcade.distanceToXY(this, this.targetX, this.targetY) < 5) {
                this.x = this.targetX;
                this.y = this.targetY;
                this.body.velocity.setTo(0, 0);
                this.npcState = npcStateEnum.idle;
            }
        }
    }

    // tslint:disable-next-line:cyclomatic-complexity
    checkForGettingHit() {
        if (this.player && this.player.damageFrames.indexOf(this.player.animations.frame) >= 0) {
            if (this.player.playerState === playerStateEnum.attack1 && this.game.physics.arcade.overlap(this, this.player.hitBox1)) {
                this.friendly = false;
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            } else if (this.player.playerState === playerStateEnum.attack2 && this.game.physics.arcade.overlap(this, this.player.hitBox2)) {
                this.friendly = false;
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            } else if (this.player.playerState === playerStateEnum.attack3 && this.game.physics.arcade.overlap(this, this.player.hitBox3)) {
                this.friendly = false;
                this.takeDamage(this.player.stats.attack * 50, this.player.x);
            }
        }
    }

    checkForHitting() {
        if (this.player &&
            this.damageFrames.indexOf(this.animations.frame) >= 0 &&
            this.game.physics.arcade.overlap(this.hitBox1, this.player)
        ) {
            this.player.takeDamage(this.stats.attack * 50, this.x);
        }
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

    handleDeath() {
        if (this.stats.health <= 0 && this.npcState !== npcStateEnum.death) {
            this.invincible = true;
            this.npcState = npcStateEnum.death;
        }
    }

    takeDamage(damage: number, objPositionX: number) {
        if (this.canTakeDamage()) {
            this.stats.health -= this.calculateDamage(damage);
            this.invincible = true;
            if (this.stats.health > 0) {
                this.game.time.events.add(1000, this.resetInvincable, this);
                this.knockBack(objPositionX);
            }
        }
    }

    knockBack(objPositionX: number) {
        this.npcState = npcStateEnum.knockBack;
        if (this.x > objPositionX) {
            this.scale.setTo(-1, 1);
            this.moveNpcTowards(this.x - this.width, this.y, 0.2, 700, npcStateEnum.idle);
        } else {
            this.scale.setTo(1, 1);
            this.moveNpcTowards(this.x - this.width, this.y, 0.2, 700, npcStateEnum.idle);
        }
    }

    moveNpcTowards(toX: number, toY: number, speed: number, time = 0, endState = npcStateEnum.idle) {
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
            this.npcState = endState;
        }, this);
    }

    resetInvincable() {
        this.invincible = false;
    }

    calculateDamage(damage: number) {
        if (this.stats.health - damage < 0) {
            return 0;
        }
        return damage;
    }

    canTakeDamage() {
        if (this.invincible || this.npcState === npcStateEnum.death) {
            return false;
        }
        return true;
    }

    attack() {
        if (this.player && this.player.x > this.x) {
            this.scale.setTo(1, 1);
        } else {
            this.scale.setTo(-1, 1);
        }
        this.npcState = npcStateEnum.attack1;
    }

    chase() {
        if (!this.player) { return; }
        this.npcState = npcStateEnum.movingChase;
        if (this.player.x > this.x) {
            this.scale.setTo(1, 1);
        } else {
            this.scale.setTo(-1, 1);
        }
        this.game.physics.arcade.moveToXY(this, this.player.x, this.y, this.stats.movespeed);
    }

    wander() {
        if (this.game.physics.arcade.distanceToXY(this, this.spawnPositionX, this.spawnPositionY) > this.maxWanderRange) {
            this.moveNpcTo(this.spawnPositionX, this.spawnPositionY, this.stats.movespeed);
            return;
        }
        const direction = this.game.rnd.integerInRange(0, 1);
        const distance = this.game.rnd.integerInRange(10, this.maxWanderRange);
        if (direction) {
            this.moveLeft(distance);
        } else {
            this.moveRight(distance);
        }
    }

    moveNpcTo(toX: number, toY: number, speed: number) {
        this.npcState = npcStateEnum.movingWalk;
        this.game.physics.arcade.moveToXY(
            this,
            toX,
            toY,
            speed
        );
        this.targetX = toX;
        this.targetY = toY;

        if (this.targetX > this.x) {
            this.scale.setTo(1, 1);
        } else {
            this.scale.setTo(-1, 1);
        }
    }

    interaction() {
        if (!this.canInteractText) {
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 20, 0, 0);
        }
        if (this.canInteract) {
            if (this.npcDialogueLine >= this.npcDialogue.length) {
                this.npcDialogueLine = this.npcDialogue.length - 1;
            }
            this.canInteractText.setText(this.npcDialogue[this.npcDialogueLine]);
        } else if (!this.canInteract) {
            this.canInteractText.setText("");
            if (this.npcDialogueLine > 0) {
                this.npcDialogueLine = 1;
            }
        }
    }

    nextDialogueText() {
        if (this.canInteract && this.friendly) {
            this.npcDialogueLine++;
        }
    }

    resetVelocity() {
        if (
            this.npcState !== npcStateEnum.movingWalk &&
            this.npcState !== npcStateEnum.knockBack
        ) {
            this.body.velocity.x = 0;
        }
    }

    moveLeft(distance: number) {
        if (this.x - distance < this.spawnPositionX - this.maxWanderRange) {
            this.moveNpcTo(this.spawnPositionX - this.maxWanderRange, this.y, this.stats.movespeed);
        } else {
            this.moveNpcTo(this.x - distance, this.y, this.stats.movespeed);
        }
    }

    moveRight(distance: number) {
        if (this.x + distance > this.spawnPositionX + this.maxWanderRange) {
            this.moveNpcTo(this.spawnPositionX + this.maxWanderRange, this.y, this.stats.movespeed);
        } else {
            this.moveNpcTo(this.x + distance, this.y, this.stats.movespeed);
        }
    }

    idle() {
        if (this.canIdle[this.npcState]) {
            const rndNumber = this.game.rnd.integerInRange(1, 100);
            if (rndNumber > 90) {
                this.npcState = npcStateEnum.idleSpecial;
            } else {
                this.npcState = npcStateEnum.idle;
            }
        }
    }
}

function npcAllowance(array: Array<npcStateEnum>): enemyAllowanceInterface {

    const obj: enemyAllowanceInterface = {
        [npcStateEnum.movingWalk]: false,
        [npcStateEnum.movingFall]: false,
        [npcStateEnum.idle]: false,
        [npcStateEnum.idleSpecial]: false,
        [npcStateEnum.attack1]: false,
        [npcStateEnum.attack2]: false,
        [npcStateEnum.attack3]: false,
        [npcStateEnum.death]: false,
        [npcStateEnum.sit]: false,
        [npcStateEnum.sitDown]: false,
        [npcStateEnum.movingChase]: false,
        [npcStateEnum.knockBack]: false,
    };

    array.forEach((v) => {
        obj[v] = true;
    });

    return obj;
}
