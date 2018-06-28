/// <reference path="./masterLevel.ts"/>

class Level1 extends MasterLevel {
    levelNumber = levelsEnum.level1;

    preload() {
        this.addGroups();

        this.background = 0x49801;

        this.platforms.enableBody = true;

        const ground = this.platforms.create(0, this.game.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.width;

        const ceiling = this.platforms.create(0, 0, "ceiling");
        ceiling.width = this.game.width;

        const wall = this.platforms.create(0, ceiling.height, "wall");
        wall.height = this.game.height - wall.height * 2 - ceiling.height * 2;

        const wall2 = this.platforms.create(this.game.width - wall.width, ceiling.height, "wall");
        wall2.height = this.game.height - wall2.height * 2 - ceiling.height * 2;

        this.gates.enableBody = true;

        this.gates.add(new Gate(this.game, wall.x, wall.height));

        this.gates.add(new Gate(this.game, wall2.x, wall2.height));

        this.platforms.forEach(function (platform: Phaser.Sprite) {
            platform.body.immovable = true;
        });

        this.gates.forEach(function (platform: Phaser.Sprite) {
            platform.body.immovable = true;
        });

        this.enemies.add(new RogueEnemy(this.game, 600, ground.y - ground.height));
        this.enemies.add(new AdventurerEnemy(this.game, 300, ground.y - ground.height * 2));

        this.bonfires.add(new Bonfire(this.game, 500, ground.y - ground.height));

        this.physics.enable(this.platforms, Phaser.Physics.ARCADE);
        this.physics.enable(this.gates, Phaser.Physics.ARCADE);
    }

    create() {
        this.game.stage.backgroundColor = this.background;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.player = new Player(this.game, 0, 0);
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
        this.addPlayerToEnemies();
        this.addPlayerToNpcs();
        this.addPlayerToGates();
    }
}
