/// <reference path="./masterLevel.ts"/>

class Level0 extends MasterLevel {
    levelNumber = levelsEnum.level0;

    preload() {
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.addGroups();

        this.background = this.game.add.image(0, 0, "darkbackground");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
        this.game.world.sendToBack(this.background);

        this.game.add.text(100, 0, "Everything you see is a Placeholder");

        this.platforms.enableBody = true;
        this.grounds.enableBody = true;
        this.ceilings.enableBody = true;
        this.walls.enableBody = true;

        const ground = this.grounds.create(0, this.game.world.bounds.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.world.bounds.width;

        this.platforms.forEach(function (platform: Phaser.Sprite) {
            platform.body.immovable = true;
        });

        this.grounds.forEach(function (platform: Phaser.Sprite) {
            platform.body.immovable = true;
        });

        this.ceilings.forEach(function (platform: Phaser.Sprite) {
            platform.body.immovable = true;
        });

        this.walls.forEach(function (platform: Phaser.Sprite) {
            platform.body.immovable = true;
        });

        this.npcs.add(new RogueNpc(this.game, 600, ground.y - ground.height));

        this.items.add(new Item(this.game, 450, ground.y - ground.height, new RingOfStrength()));

        this.enemies.add(new RatEnemy(this.game, 200, ground.y - ground.height * 2));
        this.enemies.add(new MandrakeEnemy(this.game, 400, ground.y - ground.height * 2));
        this.enemies.add(new SatyrEnemy(this.game, 800, ground.y - ground.height * 2));

        this.updateFpsTimer();

        this.enablePhysics();
    }

    create() {
        this.game.stage.backgroundColor = this.background;
        this.player = new Player(this.game, 0, 0);
        this.player.y -= this.player.height * 2;
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
        this.addPlayerToNpcs();
        this.addPlayerToEnemies();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }
}
