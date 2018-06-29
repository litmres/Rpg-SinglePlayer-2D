class MasterLevel extends Phaser.State {
    levelNumber = levelsEnum.level0;
    background!: number | Phaser.Image;
    music!: Phaser.Sound;
    player!: Player;
    platforms!: Phaser.Group;
    playerStorage: savePlayerInterface = JSON.parse(window.localStorage.getItem("player")!);
    enemies!: Phaser.Group;
    npcs!: Phaser.Group;
    bonfires!: Phaser.Group;
    gates!: Phaser.Group;
    debugMode = true;

    update() {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.enemies, this.platforms);
        this.game.physics.arcade.collide(this.npcs, this.platforms);
        this.game.physics.arcade.collide(this.bonfires, this.platforms);
        this.game.physics.arcade.collide(this.player, this.gates);
        this.game.physics.arcade.collide(this.enemies, this.gates);
        this.game.physics.arcade.collide(this.npcs, this.gates);

        this.playerFacingBonfire();
        this.playerFacingNpc();

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
        this.gates = this.game.add.group();
        this.npcs = this.game.add.group();
        this.bonfires = this.game.add.group();
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
        this.gates.forEach((v: Gate) => {
            this.game.debug.body(v);
        });
    }
}
