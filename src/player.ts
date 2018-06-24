class Player extends Phaser.Sprite {
    playerState: playerStateEnum = playerStateEnum.idle;
    lastCheckPoint: levelsEnum = levelsEnum.level0;
    invincible = false;
    canWalk: playerAllowanceInterface = {
        [playerStateEnum.movingWalk]: true,
        [playerStateEnum.movingFall]: false,
        [playerStateEnum.idle]: true,
        [playerStateEnum.attack1]: false,
        [playerStateEnum.attack2]: false,
        [playerStateEnum.attack3]: false,
        [playerStateEnum.death]: false,
        [playerStateEnum.sit]: false,
        [playerStateEnum.sitDown]: false,
        [playerStateEnum.standUp]: false,
        [playerStateEnum.movingStartWalk]: true,
        [playerStateEnum.autoWalkTo]: false,
        [playerStateEnum.knockBack]: false,
    };
    canIdle: playerAllowanceInterface = {
        [playerStateEnum.movingWalk]: true,
        [playerStateEnum.movingFall]: false,
        [playerStateEnum.idle]: false,
        [playerStateEnum.attack1]: false,
        [playerStateEnum.attack2]: false,
        [playerStateEnum.attack3]: false,
        [playerStateEnum.death]: false,
        [playerStateEnum.sit]: false,
        [playerStateEnum.sitDown]: false,
        [playerStateEnum.standUp]: false,
        [playerStateEnum.movingStartWalk]: true,
        [playerStateEnum.autoWalkTo]: false,
        [playerStateEnum.knockBack]: false,
    };
    canAttack: playerAllowanceInterface = {
        [playerStateEnum.movingWalk]: true,
        [playerStateEnum.movingFall]: false,
        [playerStateEnum.idle]: true,
        [playerStateEnum.attack1]: false,
        [playerStateEnum.attack2]: false,
        [playerStateEnum.attack3]: false,
        [playerStateEnum.death]: false,
        [playerStateEnum.sit]: false,
        [playerStateEnum.sitDown]: false,
        [playerStateEnum.standUp]: false,
        [playerStateEnum.movingStartWalk]: true,
        [playerStateEnum.autoWalkTo]: false,
        [playerStateEnum.knockBack]: false,
    };
    canSitDown: playerAllowanceInterface = {
        [playerStateEnum.movingWalk]: true,
        [playerStateEnum.movingFall]: false,
        [playerStateEnum.idle]: true,
        [playerStateEnum.attack1]: false,
        [playerStateEnum.attack2]: false,
        [playerStateEnum.attack3]: false,
        [playerStateEnum.death]: false,
        [playerStateEnum.sit]: false,
        [playerStateEnum.sitDown]: false,
        [playerStateEnum.standUp]: false,
        [playerStateEnum.movingStartWalk]: true,
        [playerStateEnum.autoWalkTo]: false,
        [playerStateEnum.knockBack]: false,
    };
    facingNpc: any;
    facingBonfire: any;
    pauseMenu: any = {
        backgroundImage: null,
        continueGame: null,
        loadGame: null,
        options: null,
        githubLink: null,
    };
    fpsCounter: Phaser.Text = this.game.add.text(this.game.camera.x, 0, "FPS: " + this.game.time.fps, {
        font: "24px Arial",
        fill: "#fff"
    });
    stats: playerStatsInterface;
    playerHealthBar: any = null;
    playerStaminaBar: any = null;
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
    };
    DialogueStyle = {
        font: "bold 10px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "player", 0);
        this.anchor.setTo(0.5, 0);
        //this.scale.setTo(1.5, 1.5);
        this.game.physics.arcade.enableBody(this);
        this.game.add.existing(this);
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.bodyWidth = 12;
        this.bodyHeight = 24;
        this.body.setSize(this.bodyWidth / this.scale.x, this.bodyHeight / this.scale.y, (this.width - this.bodyWidth) / 2, 32);
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
        this.controls = {
            UP: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            DOWN: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            LEFT: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            RIGHT: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            E: this.game.input.keyboard.addKey(Phaser.Keyboard.E),
            ESC: this.game.input.keyboard.addKey(Phaser.Keyboard.ESC),
            P: this.game.input.keyboard.addKey(Phaser.Keyboard.P),
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

        this.animations.add("idle", [24, 25, 26, 27], 10, false);
        this.animations.add("startwalk", [1, 2, 3], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.playerState = playerStateEnum.movingWalk;
        });
        this.animations.add("walk", [28, 29, 30, 31], 10, true);
        this.animations.add("attack1", [20, 21, 22, 23], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.playerState = playerStateEnum.idle;
        });
        this.animations.add("attack2", [24, 25, 26], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.playerState = playerStateEnum.idle;
        });
        this.animations.add("attack3", [27, 28, 29], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.playerState = playerStateEnum.idle;
        });
        this.animations.add("sitdown", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.savePlayer(this.x);
            this.playerState = playerStateEnum.sit;
        });
        this.animations.add("sit", [9], 3, false);
        this.animations.add("standup", [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10, false).onComplete.add(() => {
            this.animations.stop();
            this.playerState = playerStateEnum.idle;
        });
        this.animations.add("death", [71, 72, 73, 74, 75, 76, 78, 79, 80, 81, 81, 82, 83], 10, false).onComplete.add(() => {
            this.game.state.start("title");
        });
        this.animations.add("knockback", [83], 10, true);

        this.healthBar();
        this.staminaBar();
    }

    update() {
        this.resetVelocity();

        this.animations.play(this.playerAnimations[this.playerState]);

        this.handleInput();

        this.updateHealthBar();
        this.updateStaminaBar();

        this.handleEnteringLevel();

        this.handleDeath();

        this.fpsCounter.setText("FPS: " + this.game.time.fps);
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
            this.game.time.events.add(1000, this.resetInvincable, this);
            this.knockBack(objPositionX);
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
        } else if (this.canIdle[this.playerState]) {
            this.idle();
        }

        if ((this.controls.LEFT.justPressed() || this.controls.RIGHT.justPressed()) && this.playerState === playerStateEnum.sit) {
            this.playerState = playerStateEnum.standUp;
        }

        if (this.controls.ESC.isDown || this.controls.P.isDown) {
            this.handlePauseMenu();
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
        /*
        if(this.x < 0 && this.playerState !== playerStateEnum.autoWalkTo){
            this.EnterThisFromPreviousLevel();
        }
        if(this.x > this.game.width && this.playerState !== playerStateEnum.autoWalkTo){
            this.EnterThisFromNextLevel();
        }
        */
        if (this.game.physics.arcade.distanceToXY(this, this.game.width, this.y) < this.width) {
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
        this.movePlayerTo(this.game.width + this.width, this.y, 0.2, 700, playerStateEnum.idle, "nextLevel");
    }

    EnterPreviousLevel() {
        this.scale.setTo(-1, 1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.width, this.y, 0.2, 700, playerStateEnum.idle, "previousLevel");
    }
    /*
    EnterThisFromPreviousLevel(){
        this.scale.setTo(1,1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.width*2, this.y, 0.2, 700);
    }

    EnterThisFromNextLevel(){
        this.scale.setTo(-1,1);
        this.playerState = playerStateEnum.autoWalkTo;
        this.movePlayerTo(this.game.width-(this.width*2), this.y, 0.2, 700);
    }
    */

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
        this.facingNpc.nextDialogueText();
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
        if (this.facingBonfire.isLit) {
            this.playerState = playerStateEnum.sitDown;
        } else if (!this.facingBonfire.isLit) {
            this.facingBonfire.isLit = true;
            this.lastCheckPoint = this.currentRoom;
        }
    }

    healthBar() {
        if (!this.playerHealthBar) {
            this.playerHealthBar = this.game.add.sprite(50, 50, "healthbar");
            this.playerHealthBar.height = 15;
        }
    }

    updateHealthBar() {
        if (this.stats) {
            this.playerHealthBar.width = this.stats.health * 2;
        }
    }

    updateStaminaBar() {
        if (this.stats) {
            this.playerStaminaBar.width = this.stats.stamina * 2;
        }
    }

    staminaBar() {
        if (!this.playerStaminaBar && this.playerHealthBar) {
            const x = this.playerHealthBar.x;
            const y = this.playerHealthBar.y + this.playerHealthBar.width;
            this.playerStaminaBar = this.game.add.sprite(x, y, "staminabar");
            this.playerStaminaBar.height = 15;
        }
    }

    resetVelocity() {
        if (this.playerState !== playerStateEnum.autoWalkTo &&
            this.playerState !== playerStateEnum.knockBack
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

    handlePauseMenu() {
        this.game.paused = true;
        this.pauseMenu.backgroundImage = this.game.add.image(0, 0, "wall");
        this.pauseMenu.backgroundImage.width = this.game.camera.width;
        this.pauseMenu.backgroundImage.height = this.game.camera.height;
        const style = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        this.pauseMenu.continueGame = this.game.add.text(0, 0, "Continue Game", style);
        this.pauseMenu.saveGame = this.game.add.text(0, 50, "Save Game", style);
        this.pauseMenu.loadGame = this.game.add.text(0, 100, "Load Game", style);
        this.pauseMenu.options = this.game.add.text(0, 150, "Options", style);
        this.pauseMenu.githubLink = this.game.add.text(0, 300, "Github", style);

        const array = [
            this.pauseMenu.continueGame,
            this.pauseMenu.saveGame,
            this.pauseMenu.loadGame,
            this.pauseMenu.options,
            this.pauseMenu.githubLink
        ];

        array.forEach((text) => {
            text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
            text.setTextBounds(0, 200, 800, 100);
            text.inputEnabled = true;
            text.events.onInputOver.addOnce(this.pauseMenuGlow, this);
            text.events.onInputOut.addOnce(this.pauseMenuStopGlow, this);
            text.events.onInputUp.addOnce(this.pauseMenuFadeOut, this);
        });

        this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.addOnce(() => {
            if (this.game.paused) {
                this.pauseMenuFadeOut(this.pauseMenu.continueGame);
            }
        });

        this.game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.addOnce(() => {
            if (this.game.paused) {
                this.pauseMenuFadeOut(this.pauseMenu.continueGame);
            }
        });
    }

    pauseMenuFadeOut(item: Phaser.Text) {
        switch (item) {
            case this.pauseMenu.continueGame: this.continueTheGame();
                break;
            case this.pauseMenu.saveGame: this.savePlayer(this.x);
                alert("Game Saved");
                break;
            case this.pauseMenu.loadGame: const loadedGame = JSON.parse(window.localStorage.getItem("player")!);
                if (loadedGame) {
                    this.game.state.start("level" + loadedGame.currentRoom);
                    this.continueTheGame();
                } else {
                    alert("no Saved Game Found!");
                }
                break;
            case this.pauseMenu.options:
                break;
            case this.pauseMenu.githubLink: window.open("http://www.github.com/twofist");
                break;
            default:
        }
    }

    pauseMenuGlow(item: Phaser.Text) {
        item.fill = "#ffff44";
    }

    pauseMenuStopGlow(item: Phaser.Text) {
        item.fill = "#fff";
    }

    continueTheGame() {
        this.destroyPauseMenu();
        this.game.paused = false;
    }

    destroyPauseMenu() {
        for (const key in this.pauseMenu) {
            if (this.pauseMenu[key]) {
                this.pauseMenu[key].destroy();
            }
        }
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
