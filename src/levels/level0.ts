/// <reference path="./masterLevel.ts"/>

class Level0 extends MasterLevel {
    levelNumber = levelsEnum.level0;

    preload() {
        this.addGroups();

        this.background = this.game.add.image(0, 0, "darkbackground");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
        this.game.world.sendToBack(this.background);

        this.game.add.text(100, 0, "Everything you see is a Placeholder");

        this.platforms.enableBody = true;

        const ground = this.platforms.create(0, this.game.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.width;

        this.platforms.forEach(function (platform: Phaser.Sprite) {
            platform.body.immovable = true;
        });

        this.npcs.add(new RogueNpc(this.game, 600, ground.y - ground.height));

        this.updateFpsTimer();

        this.enablePhysics();
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
}
