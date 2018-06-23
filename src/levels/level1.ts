class Level1 extends Phaser.State {
    levelNumber = levelsEnum.level1;
    background!: number|Phaser.Image;
    music!: Phaser.Sound;
    player!: Player;
    platforms!:Phaser.Group;
    enemies!:Phaser.Group;
    playerStorage:savePlayerInterface = JSON.parse(window.localStorage.getItem("player")!);
    npcs!:Phaser.Group;
    bonfires!:Phaser.Group;
    gates!:Phaser.Group;
    preload(){
        this.background = 0x49801;

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        const ground = this.platforms.create(0, this.game.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.width;

        const ceiling = this.platforms.create(0,0, "ceiling");
        ceiling.width = this.game.width;

        const wall = this.platforms.create(0, ceiling.height, "wall");
        wall.height = this.game.height - wall.height*2 - ceiling.height*2;

        const wall2 = this.platforms.create(this.game.width-wall.width, ceiling.height, "wall");
        wall2.height = this.game.height - wall2.height*2 - ceiling.height*2;

        this.gates = this.game.add.group();
        this.gates.enableBody = true;

        this.gates.add(new Gate(this.game, wall.x, wall.height));

        this.gates.add(new Gate(this.game, wall2.x, wall2.height));

        this.platforms.forEach(function(platform:Phaser.Sprite){
            platform.body.immovable = true;
        });

        this.gates.forEach(function(platform:Phaser.Sprite){
            platform.body.immovable = true;
        });

        this.enemies = this.game.add.group();
        this.enemies.add(new RogueEnemy(this.game, 600, ground.y - ground.height));

        this.npcs = this.game.add.group();

        this.bonfires = this.game.add.group();
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

    update(){
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.enemies, this.platforms);
        this.game.physics.arcade.collide(this.bonfires, this.platforms);
        this.game.physics.arcade.collide(this.player, this.gates);
        this.game.physics.arcade.collide(this.enemies, this.gates);

        this.playerFacingBonfire();
        this.playerFacingNpc();
    }

    addPlayerToNpcs(){
        for(let ii = 0; ii < this.npcs.children.length; ii++){
            this.npcs.children[ii].player = this.player;
        }
    }

    addPlayerToGates(){
        for(let ii = 0; ii < this.gates.children.length; ii++){
            this.gates.children[ii].player = this.player;
        }
    }

    addPlayerToEnemies(){
        for(let ii = 0; ii < this.enemies.children.length; ii++){
            this.enemies.children[ii].player = this.player;
        }
    }

    playerFacingNpc(){
        for(let ii = 0; ii < this.npcs.children.length; ii++){
            if(this.game.physics.arcade.overlap(this.player, this.npcs.children[ii])){
                this.npcs.children[ii].canInteract = true;
                this.player.facingNpc = this.npcs.children[ii];
            }else{
                this.npcs.children[ii].canInteract = false;
                this.player.facingNpc = null;
            }
        }
    }

    playerFacingBonfire(){
        for(let ii = 0; ii < this.bonfires.children.length; ii++){
            if(this.game.physics.arcade.overlap(this.player, this.bonfires.children[ii])){
                this.bonfires.children[ii].canInteract = true;
                this.player.facingBonfire = this.bonfires.children[ii];
            }else{
                this.bonfires.children[ii].canInteract = false;
                this.player.facingBonfire = null;
            }
        }
    }

    roomIsClear():boolean{
        if(this.enemies.children.length === 0){
            for(let ii = 0; ii < this.gates.children.length; ii++){
                this.gates.children[ii].roomIsClear = true;
            }
            return true;
        }
        return false;
    }
}
