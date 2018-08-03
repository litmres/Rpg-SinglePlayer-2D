/// <reference path="./masterLevel.ts"/>

class Level1 extends MasterLevel {
    levelNumber = levelsEnum.level1;

    preload() {
        this.game.world.setBounds(0, 0, this.game.world.width + 1000, this.game.world.height);
        this.addGroups();

        this.background = 0x49801;

        this.platforms.enableBody = true;
        this.grounds.enableBody = true;
        this.ceilings.enableBody = true;
        this.walls.enableBody = true;

        const ground = this.grounds.create(0, this.game.world.bounds.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.world.bounds.width;

        const ceiling = this.ceilings.create(0, 0, "ceiling");
        ceiling.width = this.game.world.bounds.width;

        const wall = this.walls.create(0, ceiling.height, "wall");
        wall.height = this.game.world.bounds.height - wall.height * 2 - ceiling.height * 2;

        const wall2 = this.walls.create(this.world.bounds.width - wall.width, ceiling.height, "wall");
        wall2.height = this.game.world.bounds.height - wall2.height * 2 - ceiling.height * 2;

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

        this.enemies.add(new Slime(this.game, 300, ground.y - ground.height * 2));
        this.enemies.add(new RogueEnemy(this.game, 400, ground.y - ground.height));
        this.enemies.add(new Slime(this.game, 500, ground.y - ground.height * 2));
        this.enemies.add(new AdventurerEnemy(this.game, 600, ground.y - ground.height * 2));
        this.enemies.add(new Slime(this.game, 700, ground.y - ground.height * 2));
        this.enemies.add(new Slime(this.game, 750, ground.y - ground.height * 2));
        this.enemies.add(new KoboldEnemy(this.game, 800, ground.y - ground.height * 2));
        this.enemies.add(new Slime(this.game, 1000, ground.y - ground.height * 2));
        this.enemies.add(new Slime(this.game, 1100, ground.y - ground.height * 2));
        this.enemies.add(new KoboldEnemy(this.game, 1200, ground.y - ground.height * 2));
        this.enemies.add(new KoboldEnemy(this.game, 1400, ground.y - ground.height * 2));
        this.enemies.add(new Slime(this.game, 1600, ground.y - ground.height * 2));

        this.bonfires.add(new Bonfire(this.game, 500, ground.y - ground.height * 2));

        this.updateFpsTimer();

        this.enablePhysics();
    }

    create() {
        this.game.stage.backgroundColor = this.background;
        this.player = new Player(this.game, 0, 0);
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
        this.addPlayerToEnemies();
        this.addPlayerToNpcs();
        this.addPlayerToGates();
    }
}
