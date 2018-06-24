class Level0 extends Phaser.State {
    levelNumber = levelsEnum.level0;
    background!: number | Phaser.Image;
    music!: Phaser.Sound;
    player!: Player;
    platforms!: Phaser.Group;
    playerStorage: savePlayerInterface = JSON.parse(window.localStorage.getItem("player")!);
    enemies!: Phaser.Group;
    npcs!: Phaser.Group;
    bonfires!: Phaser.Group;

    preload() {
        this.background = 0x49801;

        this.game.add.text(100, 0, "Everything you see is a Placeholder");

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        const ground = this.platforms.create(0, this.game.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.width;

        this.platforms.forEach(function (platform: Phaser.Sprite) {
            platform.body.immovable = true;
        });

        this.enemies = this.game.add.group();

        this.npcs = this.game.add.group();
        this.npcs.add(new RogueNpc(this.game, 600, ground.y - ground.height));

        this.bonfires = this.game.add.group();

        this.game.time.advancedTiming = true;

        this.game.physics.enable(ground, Phaser.Physics.ARCADE);
    }

    create() {
        this.game.stage.backgroundColor = this.background;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.player = new Player(this.game, 0, 0);
        this.player.y -= this.player.height * 2;
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
        this.addPlayerToNpcs();
        this.addPlayerToEnemies();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.npcs, this.platforms);
        this.game.physics.arcade.collide(this.enemies, this.platforms);
        this.game.physics.arcade.collide(this.bonfires, this.platforms);
        this.playerFacingNpc();
        this.playerFacingBonfire();
    }

    addPlayerToNpcs() {
        for (let ii = 0; ii < this.npcs.children.length; ii++) {
            this.npcs.children[ii].player = this.player;
        }
    }

    addPlayerToEnemies() {
        for (let ii = 0; ii < this.enemies.children.length; ii++) {
            this.enemies.children[ii].player = this.player;
        }
    }

    playerFacingNpc() {
        for (let ii = 0; ii < this.npcs.children.length; ii++) {
            if (this.game.physics.arcade.overlap(this.player, this.npcs.children[ii])) {
                this.npcs.children[ii].canInteract = true;
                this.player.facingNpc = this.npcs.children[ii];
            } else {
                this.npcs.children[ii].canInteract = false;
                this.player.facingNpc = null;
            }
        }
    }

    playerFacingBonfire() {
        for (let ii = 0; ii < this.bonfires.children.length; ii++) {
            if (this.game.physics.arcade.overlap(this.player, this.bonfires.children[ii])) {
                this.bonfires.children[ii].canInteract = true;
                this.player.facingBonfire = this.bonfires.children[ii];
            } else {
                this.bonfires.children[ii].canInteract = false;
                this.player.facingBonfire = null;
            }
        }
    }
}
