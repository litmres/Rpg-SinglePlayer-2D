class RogueNpc extends Phaser.Sprite {
    npcState: npcStateEnum = npcStateEnum.idle;
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
    npcDialogueLine = 0;
    player: Player;
    targetX = 0;
    targetY = 0;
    bodyWidth: number;
    bodyHeight: number;
    maxWanderRange = 100;
    attackRange = 0;
    spawnPositionX: number;
    spawnPositionY: number;
    aggroRange = 100;
    canInteract = false;
    canInteractText!: Phaser.Text | null;
    DialogueStyle = {
        font: "bold 10px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };
    friendly = true;
    canWalk: npcAllowanceInterface = {
        [npcStateEnum.movingWalk]: true,
        [npcStateEnum.movingFall]: false,
        [npcStateEnum.idle]: true,
        [npcStateEnum.idleSpecial]: true,
        [npcStateEnum.attack1]: false,
        [npcStateEnum.attack2]: false,
        [npcStateEnum.attack3]: false,
        [npcStateEnum.death]: false,
        [npcStateEnum.sit]: false,
        [npcStateEnum.sitDown]: false,
        [npcStateEnum.movingChase]: false,
        [npcStateEnum.knockBack]: false,
    };
    canIdle: npcAllowanceInterface = {
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
    canChase: npcAllowanceInterface = {
        [npcStateEnum.movingWalk]: true,
        [npcStateEnum.movingFall]: false,
        [npcStateEnum.idle]: true,
        [npcStateEnum.idleSpecial]: true,
        [npcStateEnum.attack1]: false,
        [npcStateEnum.attack2]: false,
        [npcStateEnum.attack3]: false,
        [npcStateEnum.death]: false,
        [npcStateEnum.sit]: false,
        [npcStateEnum.sitDown]: false,
        [npcStateEnum.movingChase]: true,
        [npcStateEnum.knockBack]: false,
    };
    canAttack: npcAllowanceInterface = {
        [npcStateEnum.movingWalk]: true,
        [npcStateEnum.movingFall]: false,
        [npcStateEnum.idle]: true,
        [npcStateEnum.idleSpecial]: true,
        [npcStateEnum.attack1]: false,
        [npcStateEnum.attack2]: false,
        [npcStateEnum.attack3]: false,
        [npcStateEnum.death]: false,
        [npcStateEnum.sit]: false,
        [npcStateEnum.sitDown]: false,
        [npcStateEnum.movingChase]: true,
        [npcStateEnum.knockBack]: false,
    };
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
    hitBox1: Phaser.Sprite;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "rogue", 0);
        this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(this);
        game.add.existing(this);
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.bodyWidth = 16;
        this.bodyHeight = 32;
        this.body.setSize(this.bodyWidth / this.scale.x, this.bodyHeight / this.scale.y, (this.width - this.bodyWidth) / 2, this.height - this.bodyHeight);
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

        this.hitBoxes = this.game.add.group();

        this.addChild(this.hitBoxes);

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

    attack() {
        if (this.player.x > this.x) {
            this.scale.setTo(1, 1);
        } else {
            this.scale.setTo(-1, 1);
        }
        this.npcState = npcStateEnum.attack1;
    }

    chase() {
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
            if (this.npcDialogueLine >= this.npcDialogue.length - 1) {
                this.friendly = false;
            }
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
        this.npcState = npcStateEnum.idle;
    }
}
