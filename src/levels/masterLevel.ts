class MasterLevel extends Phaser.State {
    levelNumber = levelsEnum.level0;
    background!: number | Phaser.Image;
    music!: Phaser.Sound;
    player!: Player;
    platforms!: Phaser.Group;
    grounds!: Phaser.Group;
    walls!: Phaser.Group;
    ceilings!: Phaser.Group;
    playerStorage: savePlayerInterface = JSON.parse(window.localStorage.getItem("player")!);
    enemies!: Phaser.Group;
    npcs!: Phaser.Group;
    bonfires!: Phaser.Group;
    gates!: Phaser.Group;
    items!: Phaser.Group;
    signs!: Phaser.Group;
    debugMode = false;

    update() {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.enemies, this.platforms);
        this.game.physics.arcade.collide(this.npcs, this.platforms);
        this.game.physics.arcade.collide(this.bonfires, this.platforms);
        this.game.physics.arcade.collide(this.items, this.platforms);
        this.game.physics.arcade.collide(this.signs, this.platforms);

        this.game.physics.arcade.collide(this.player, this.gates);
        this.game.physics.arcade.collide(this.enemies, this.gates);
        this.game.physics.arcade.collide(this.npcs, this.gates);

        this.game.physics.arcade.collide(this.player, this.grounds);
        this.game.physics.arcade.collide(this.enemies, this.grounds);
        this.game.physics.arcade.collide(this.npcs, this.grounds);
        this.game.physics.arcade.collide(this.bonfires, this.grounds);
        this.game.physics.arcade.collide(this.items, this.grounds);
        this.game.physics.arcade.collide(this.signs, this.grounds);


        this.game.physics.arcade.collide(this.player, this.walls);
        this.game.physics.arcade.collide(this.enemies, this.walls);
        this.game.physics.arcade.collide(this.npcs, this.walls);
        this.game.physics.arcade.collide(this.bonfires, this.walls);
        this.game.physics.arcade.collide(this.items, this.walls);
        this.game.physics.arcade.collide(this.signs, this.walls);


        this.game.physics.arcade.collide(this.player, this.ceilings);
        this.game.physics.arcade.collide(this.enemies, this.ceilings);
        this.game.physics.arcade.collide(this.npcs, this.ceilings);
        this.game.physics.arcade.collide(this.bonfires, this.ceilings);
        this.game.physics.arcade.collide(this.items, this.ceilings);
        this.game.physics.arcade.collide(this.signs, this.ceilings);




        this.playerFacingBonfire();
        this.playerFacingNpc();
        this.playerFacingItem();
        this.playerFacingSign();

        if (this.debugMode) {
            this.debug();
        }
    }

    enablePhysics() {
        this.physics.enable(this.platforms, Phaser.Physics.ARCADE);
        this.physics.enable(this.gates, Phaser.Physics.ARCADE);
    }

    updateFpsTimer() {
        this.game.time.advancedTiming = true;
    }

    addGroups() {
        this.enemies = this.game.add.group();
        this.platforms = this.game.add.group();
        this.ceilings = this.game.add.group();
        this.walls = this.game.add.group();
        this.grounds = this.game.add.group();
        this.gates = this.game.add.group();
        this.npcs = this.game.add.group();
        this.bonfires = this.game.add.group();
        this.items = this.game.add.group();
        this.signs = this.game.add.group();
    }

    addPlayerToNpcs() {
        this.npcs.forEach((v: MasterNpc) => {
            v.player = this.player;
        });
    }

    addPlayerToGates() {
        this.gates.forEach((v: Gate) => {
            v.player = this.player;
        });
    }

    addPlayerToEnemies() {
        this.enemies.forEach((v: MasterEnemy) => {
            v.player = this.player;
        });
    }

    playerFacingNpc() {
        this.npcs.forEach((v: MasterNpc) => {
            if (this.game.physics.arcade.overlap(this.player, v)) {
                v.canInteract = true;
                this.player.facingNpc = v;
            } else {
                v.canInteract = false;
                this.player.facingNpc = null;
            }
        });
    }

    playerFacingItem() {
        this.items.forEach((v: Item) => {
            if (this.game.physics.arcade.overlap(this.player, v)) {
                v.canInteract = true;
                this.player.facingItem = v;
            } else {
                v.canInteract = false;
                this.player.facingItem = null;
            }
        });
    }

    playerFacingBonfire() {
        this.bonfires.forEach((v: Bonfire) => {
            if (this.game.physics.arcade.overlap(this.player, v)) {
                v.canInteract = true;
                this.player.facingBonfire = v;
            } else {
                v.canInteract = false;
                this.player.facingBonfire = null;
            }
        });
    }

    playerFacingSign() {
        this.signs.forEach((v: Sign) => {
            if (this.game.physics.arcade.overlap(this.player, v)) {
                v.canInteract = true;
                this.player.facingSign = v;
            } else {
                v.canInteract = false;
                this.player.facingSign = null;
            }
        });
    }

    roomIsClear(): boolean {
        if (this.enemies.children.length === 0) {
            this.gates.forEach((v: Gate) => {
                v.roomIsClear = true;
            });
            return true;
        }
        return false;
    }

    debug() {
        this.game.debug.body(this.player);
        this.game.debug.physicsGroup(this.player.hitBoxes);
        this.npcs.forEach((v: MasterNpc) => {
            this.game.debug.body(v);
            this.game.debug.physicsGroup(v.hitBoxes);
        });
        this.enemies.forEach((v: MasterEnemy) => {
            this.game.debug.body(v);
            this.game.debug.physicsGroup(v.hitBoxes);
        });
        this.bonfires.forEach((v: Bonfire) => {
            this.game.debug.body(v);
        });
        this.signs.forEach((v: Sign) => {
            this.game.debug.body(v);
        });
        this.gates.forEach((v: Gate) => {
            this.game.debug.body(v);
        });
        this.items.forEach((v: Item) => {
            this.game.debug.body(v);
        });
    }
}
