class Player extends Phaser.Sprite {
    playerState: playerStateEnum = playerStateEnum.idle;
    lastCheckPoint: levelsEnum = levelsEnum.level0;
    invincible = false;
    equipment = new Equipment();
    inventory: Inventory | null;
    canWalk = playerAllowance([
        playerStateEnum.movingWalk,
        playerStateEnum.idle,
        playerStateEnum.movingStartWalk
    ]);
    canIdle = playerAllowance([
        playerStateEnum.movingWalk,
        playerStateEnum.movingStartWalk
    ]);
    canAttack = playerAllowance([
        playerStateEnum.movingWalk,
        playerStateEnum.idle,
        playerStateEnum.movingStartWalk
    ]);
    canSitDown = playerAllowance([
        playerStateEnum.movingWalk,
        playerStateEnum.idle,
        playerStateEnum.movingStartWalk
    ]);
    canRoll = playerAllowance([
        playerStateEnum.movingWalk,
        playerStateEnum.idle,
        playerStateEnum.movingStartWalk
    ]);
    facingNpc: MasterNpc | null | undefined;
    facingBonfire: Bonfire | null | undefined;
    facingItem: Item | null | undefined;
    hitBoxes: Phaser.Group;
    hitBox1: Phaser.Sprite;
    hitBox2: Phaser.Sprite;
    hitBox3: Phaser.Sprite;
    fpsCounter: Phaser.Text = this.game.add.text(this.game.camera.x, 0, "FPS: " + this.game.time.fps, {
        font: "24px Arial",
        fill: "#fff"
    });
    stats: playerStatsInterface;
    playerOverlay: Phaser.Group;
    bodyWidth: number;
    bodyHeight: number;
    controls: any;
    currentRoom = 0;
    EnterLevelHandler = {
        Next: false,
        Previous: false,
        Text: null,
        EnterText: "Press E to go to Next Level",
        PreviousText: "Press E to go to Previous Level",
    };
    playerAnimations: playerAnimationInterface = {
        [playerStateEnum.movingWalk]: "walk",
        [playerStateEnum.movingFall]: "fall",
        [playerStateEnum.idle]: "idle",
        [playerStateEnum.attack1]: "attack1",
        [playerStateEnum.attack2]: "attack2",
        [playerStateEnum.attack3]: "attack3",
        [playerStateEnum.death]: "death",
        [playerStateEnum.sit]: "sit",
        [playerStateEnum.sitDown]: "sitdown",
        [playerStateEnum.standUp]: "standup",
        [playerStateEnum.movingStartWalk]: "walk",
        [playerStateEnum.autoWalkTo]: "walk",
        [playerStateEnum.knockBack]: "knockback",
        [playerStateEnum.roll]: "rolling",
    };
    DialogueStyle = {
        font: "bold 10px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };
    damageFrames = [45, 46, 50, 51, 56, 57, 58];
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "player", 0);
        this.game.camera.follow(this, Phaser.Camera.FOLLOW_PLATFORMER, 0.05, 0.05);
        this.anchor.setTo(0.5, 0);
        //this.scale.setTo(1.5, 1.5);
        this.inventory = null;
        this.game.physics.arcade.enableBody(this);
        this.game.add.existing(this);
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.bodyWidth = 12;
        this.bodyHeight = 30;
        this.body.setSize(this.bodyWidth / this.scale.x, this.bodyHeight / this.scale.y, (this.width - this.bodyWidth) / 2, 5);
        this.stats = {
            level: 1,
            maxHealth: this.maxHealth,
            health: this.maxHealth,
            maxStamina: this.maxHealth,
            stamina: this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 130,
            luck: 1,
        };
        this.controls = {
            UP: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            DOWN: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            LEFT: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            RIGHT: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            E: this.game.input.keyboard.addKey(Phaser.Keyboard.E),
            ESC: this.game.input.keyboard.addKey(Phaser.Keyboard.ESC),
            P: this.game.input.keyboard.addKey(Phaser.Keyboard.P),
            I: this.game.input.keyboard.addKey(Phaser.Keyboard.I),
            SPACE: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            LMB: this.game.input.activePointer.leftButton,
            RMB: this.game.input.activePointer.rightButton,
        };

        this.game.input.onDown.add((pointer: Phaser.Pointer, event: PointerEvent) => {
            if (!this.game.paused) {
                this.handleAttack();
            }
        });

        //stop rightclick from opening a menu
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.W,
            Phaser.Keyboard.A,
            Phaser.Keyboard.S,
            Phaser.Keyboard.D,
            Phaser.Keyboard.E
        ]);

        this.animations.add("idle", [0, 1, 2, 3], 10, false);
        this.animations.add("startwalk", [1, 2, 3], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.playerState = playerStateEnum.movingWalk;
        });
        this.animations.add("walk", [8, 9, 10], 10, true);
        this.animations.add("attack1", [42, 43, 44, 45, 46, 47, 48, 49], 10, false).onComplete.add(() => {
            this.animations.stop();
            if (this.controls.LMB.justPressed(500) || this.controls.LMB.justReleased(500)) {
                this.playerState = playerStateEnum.attack2;
            } else {
                this.playerState = playerStateEnum.idle;
            }
        });
        this.animations.add("attack2", [49, 50, 51, 52, 52], 10, false).onComplete.add(() => {
            this.animations.stop();
            if (this.controls.LMB.justPressed(500) || this.controls.LMB.justReleased(500)) {
                this.playerState = playerStateEnum.attack3;
            } else {
                this.playerState = playerStateEnum.idle;
            }
        });
        this.animations.add("attack3", [53, 54, 55, 56, 57, 58, 59], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.playerState = playerStateEnum.idle;
        });
        this.animations.add("sitdown", [62, 63, 64, 65], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.savePlayer(this.x);
            this.playerState = playerStateEnum.sit;
        });
        this.animations.add("sit", [65], 3, false);
        this.animations.add("standup", [65, 64, 63, 62], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.playerState = playerStateEnum.idle;
        });
        this.animations.add("death", [62, 63, 64, 65, 66, 67, 68], 10, false).onComplete.add(() => {
            this.kill();
            this.game.state.start("title");
        });
        this.animations.add("rolling", [24, 25, 26, 27, 28], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.playerState = playerStateEnum.idle;
        });
        this.animations.add("knockback", [62], 10, true);

        this.hitBoxes = this.game.add.group();

        this.addChild(this.hitBoxes);

        this.hitBox1 = this.hitBoxes.create(0, 0);
        this.game.physics.enable(this.hitBoxes, Phaser.Physics.ARCADE);
        this.hitBox1.body.setSize(25, this.height);
        this.hitBox1.name = "attack1";

        this.hitBox2 = this.hitBoxes.create(-15, 0);
        this.game.physics.enable(this.hitBoxes, Phaser.Physics.ARCADE);
        this.hitBox2.body.setSize(40, this.height);
        this.hitBox2.name = "attack2";

        this.hitBox3 = this.hitBoxes.create(-25, this.height / 2);
        this.game.physics.enable(this.hitBoxes, Phaser.Physics.ARCADE);
        this.hitBox3.body.setSize(50, this.height / 2);
        this.hitBox3.name = "attack3";

        this.playerOverlay = this.game.add.group();
        this.playerOverlay.add(new OverlayBar(this.game, 50, 50, this));
        this.game.world.bringToTop(this.playerOverlay);
        this.fpsCounter.fixedToCamera = true;
    }

    update() {
        this.resetVelocity();

        this.animations.play(this.playerAnimations[this.playerState]);

        this.handleInput();

        this.handleRoll();

        this.handleEnteringLevel();

        this.handleDeath();

        this.updateHitbox();

        this.fpsCounter.setText("FPS: " + this.game.time.fps);
    }

    handleItem() {
        this.equipment.addToInventory(this.facingItem!.item);
        this.facingItem!.remove();
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

    handleRoll() {
        if (this.playerState === playerStateEnum.roll) {
            this.invincible = true;
        } else if (this.playerState !== playerStateEnum.knockBack) {
            this.resetInvincable();
        }
    }

    handleDeath() {
        if (this.stats.health <= 0 && this.playerState !== playerStateEnum.death) {
            this.invincible = true;
            this.playerState = playerStateEnum.death;
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
        this.playerState = playerStateEnum.knockBack;
        if (this.x > objPositionX) {
            this.scale.setTo(-1, 1);
            this.movePlayerTo(this.x - this.width, this.y, 0.2, 700, playerStateEnum.idle);
        } else {
            this.scale.setTo(1, 1);
            this.movePlayerTo(this.x - this.width, this.y, 0.2, 700, playerStateEnum.idle);
        }
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
        if (this.invincible || this.playerState === playerStateEnum.death) {
            return false;
        }
        return true;
    }

    // tslint:disable-next-line:cyclomatic-complexity
    handleInput() {
        if (this.controls.LEFT.isDown && this.canWalk[this.playerState]) {
            this.moveLeft();
        } else if (this.controls.RIGHT.isDown && this.canWalk[this.playerState]) {
            this.moveRight();
        } else if (this.controls.E.justPressed() && this.facingBonfire && this.canSitDown[this.playerState]) {
            this.handleBonfire();
        } else if (this.controls.E.justPressed() && this.facingNpc) {
            this.handleNpc();
        } else if (this.controls.E.justPressed() && this.facingItem) {
            this.handleItem();
        } else if (this.canIdle[this.playerState]) {
            this.idle();
        }

        if (this.controls.SPACE.justPressed() && this.canRoll[this.playerState]) {
            this.playerState = playerStateEnum.roll;
            this.game.physics.arcade.moveToXY(this, this.x + this.scale.x, this.y, this.stats.movespeed * 1.5);
        }

        if ((this.controls.LEFT.justPressed() || this.controls.RIGHT.justPressed()) && this.playerState === playerStateEnum.sit) {
            this.playerState = playerStateEnum.standUp;
        }

        if (this.controls.ESC.isDown || this.controls.P.isDown) {
            new PauseMenu(this.game, 0, 0, this);
        }

        if (this.controls.I.isDown && !this.inventory) {
            this.inventory = new Inventory(this.game, this.game.camera.x + this.game.camera.width / 4, this.game.camera.y + this.game.camera.height / 4, this);
        }
    }

    // tslint:disable-next-line:cyclomatic-complexity
    handleEnteringLevel() {
        if (!this.EnterLevelHandler.Text) {
            this.EnterLevelHandler.Text = this.game.add.text(this.game.camera.x + (this.game.camera.width / 2), this.game.camera.height, "", this.DialogueStyle);
            this.EnterLevelHandler.Text.setTextBounds(30, -20, 0, 0);
        } else {
            this.EnterLevelHandler.Text.x = this.game.camera.x + (this.game.camera.width / 2);
            this.EnterLevelHandler.Text.y = this.game.camera.height;
        }
        if (this.game.physics.arcade.distanceToXY(this, this.game.world.bounds.width, this.y) < this.width) {
            this.EnterLevelHandler.Next = true;
        } else {
            this.EnterLevelHandler.Next = false;
        }
        if (this.game.physics.arcade.distanceToXY(this, 0, this.y) < -this.width && this.currentRoom > 0) {
            this.EnterLevelHandler.Previous = true;
        } else {
            this.EnterLevelHandler.Previous = false;
        }

        if (this.EnterLevelHandler.Next) {
            this.EnterLevelHandler.Text.setText(this.EnterLevelHandler.EnterText);
            if (this.controls.E.justPressed()) {
                this.EnterNextLevel();
            }
        }

        if (this.EnterLevelHandler.Previous) {
            this.EnterLevelHandler.Text.setText(this.EnterLevelHandler.PreviousText);
            if (this.controls.E.justPressed()) {
                this.EnterPreviousLevel();
            }
        }

        if (!this.EnterLevelHandler.Previous && !this.EnterLevelHandler.Next) {
            this.EnterLevelHandler.Text.setText("");
        }
    }

    EnterNextLevel() {
        this.scale.setTo(1, 1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.game.world.bounds.width + this.width, this.y, this.stats.movespeed, 700, playerStateEnum.idle, "nextLevel");
    }

    EnterPreviousLevel() {
        this.scale.setTo(-1, 1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.width, this.y, this.stats.movespeed, 700, playerStateEnum.idle, "previousLevel");
    }

    movePlayerTo(toX: number, toY: number, speed: number, time = 0, endState = playerStateEnum.idle, nextLevel = "") {
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
            this.playerState = endState;
            if (nextLevel === "nextLevel") {
                this.nextLevel();
            } else if (nextLevel === "previousLevel") {
                this.previousLevel();
            }
        }, this);
    }

    handleNpc() {
        this.facingNpc!.nextDialogueText();
    }

    handleAttack() {
        if (this.controls.LMB.justPressed() && this.canAttack[this.playerState]) {
            this.playerState = playerStateEnum.attack1;
        } else if (this.controls.RMB.justPressed() && this.canAttack[this.playerState]) {
            console.log("right mouse button");
        }

        if ((this.controls.LMB.justPressed() || this.controls.RMB.justPressed()) && this.playerState === playerStateEnum.sit) {
            this.playerState = playerStateEnum.standUp;
        }
    }

    handleBonfire() {
        if (this.facingBonfire!.isLit) {
            this.stats.health = this.stats.maxHealth;
            this.stats.stamina = this.stats.maxStamina;
            this.playerState = playerStateEnum.sitDown;
        } else if (!this.facingBonfire!.isLit) {
            this.facingBonfire!.isLit = true;
            this.lastCheckPoint = this.currentRoom;
        }
    }

    resetVelocity() {
        if (this.playerState !== playerStateEnum.autoWalkTo &&
            this.playerState !== playerStateEnum.knockBack &&
            this.playerState !== playerStateEnum.roll
        ) {
            this.body.velocity.x = 0;
        }
    }

    moveLeft() {
        this.playerState = playerStateEnum.movingStartWalk;
        this.scale.setTo(-1, 1);
        this.body.velocity.x = -this.stats.movespeed;
    }

    moveRight() {
        this.playerState = playerStateEnum.movingStartWalk;
        this.scale.setTo(1, 1);
        this.body.velocity.x = this.stats.movespeed;
    }

    idle() {
        this.playerState = playerStateEnum.idle;
    }

    savePlayer(x = 0, levelNumber = this.currentRoom) {
        const savePlayer: savePlayerInterface = {
            lastCheckPoint: this.lastCheckPoint,
            currentRoom: levelNumber,
            stats: this.stats,
            y: this.y,
            x: x,
        };
        window.localStorage.setItem("player", JSON.stringify(savePlayer));
    }

    loadPlayer(playerStorage: savePlayerInterface) {
        if (playerStorage) {
            this.stats = playerStorage.stats;
            this.x = playerStorage.x;
            this.y = playerStorage.y;
            this.lastCheckPoint = playerStorage.lastCheckPoint;
        } else {
            this.x = -this.width;
            this.y = this.game.height - this.height * 2;
        }
    }

    nextLevel() {
        this.savePlayer(0, this.currentRoom + 1);
        this.game.state.start("level" + (this.currentRoom + 1), true, false);
    }

    previousLevel() {
        this.savePlayer(this.x, this.currentRoom - 1);
        this.game.state.start("level" + (this.currentRoom - 1), true, false);
    }
}

function playerAllowance(array: Array<playerStateEnum>): playerAllowanceInterface {

    const obj: playerAllowanceInterface = {
        [playerStateEnum.movingWalk]: false,
        [playerStateEnum.movingFall]: false,
        [playerStateEnum.idle]: false,
        [playerStateEnum.attack1]: false,
        [playerStateEnum.attack2]: false,
        [playerStateEnum.attack3]: false,
        [playerStateEnum.death]: false,
        [playerStateEnum.sit]: false,
        [playerStateEnum.sitDown]: false,
        [playerStateEnum.standUp]: false,
        [playerStateEnum.movingStartWalk]: false,
        [playerStateEnum.autoWalkTo]: false,
        [playerStateEnum.knockBack]: false,
        [playerStateEnum.roll]: false,
    };

    array.forEach((v) => {
        obj[v] = true;
    });

    return obj;
}
