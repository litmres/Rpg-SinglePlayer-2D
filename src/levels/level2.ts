/// <reference path="./masterLevel.ts"/>

class Level2 extends MasterLevel {
    levelNumber = levelsEnum.level2;

    preload() {
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
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

        const wall2 = this.walls.create(this.game.width - wall.width, ceiling.height, "wall");
        wall2.height = this.game.world.bounds.height - wall2.height * 2 - ceiling.height * 2;

        this.gates.enableBody = true;

        this.gates.add(new Gate(this.game, wall.x, wall.height));

        this.gates.add(new Gate(this.game, wall2.x, wall2.height));

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

        this.gates.forEach(function (platform: Phaser.Sprite) {
            platform.body.immovable = true;
        });

        this.updateFpsTimer();

        this.enablePhysics();
    }

    create() {
        this.game.stage.backgroundColor = this.background;
        this.player = new Player(this.game, 0, 0);
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
        new SlimeBoss(this.game, 600, 200, this.grounds, this.walls, this.player, this.enemies);
        this.addPlayerToEnemies();
        this.addPlayerToNpcs();
        this.addPlayerToGates();
    }
}
