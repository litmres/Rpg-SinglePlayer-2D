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
    interActive:any = {
        gate1: {
            closed:false,
            gate:null,
        },
        gate2: {
            closed:true,
            gate:null,
        },
    };
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
        wall.height = this.game.height - wall.height*2 - ceiling.height;

        const wall2 = this.platforms.create(this.game.width-wall.width, ceiling.height, "wall");
        wall2.height = this.game.height - wall2.height*2 - ceiling.height;

        this.interActive.gate1.gate = this.platforms.create(0, wall.height, "gate");

        this.interActive.gate2.gate = this.platforms.create(this.game.width-this.interActive.gate1.gate.width, wall2.height, "gate");
        this.interActive.gate2.gate.y += this.interActive.gate2.gate.height;

        this.platforms.forEach(function(platform:Phaser.Sprite){
            platform.body.immovable = true;
        });

        this.enemies = this.game.add.group();
        this.enemies.add(new RogueEnemy(this.game, 600, ground.y - ground.height));

        this.npcs = this.game.add.group();

        this.bonfires = this.game.add.group();
        this.bonfires.add(new Bonfire(this.game, 500, ground.y - ground.height));

        this.physics.enable(this.platforms, Phaser.Physics.ARCADE);
    }
        
    create() {
        this.game.stage.backgroundColor = this.background;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.player = new Player(this.game, 20, 0);
        this.player.currentRoom = this.levelNumber;
        this.player.loadPlayer(this.playerStorage);
    }

    update(){
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.enemies, this.platforms);
        this.game.physics.arcade.collide(this.bonfires, this.platforms);

        this.closeGate();
        this.openGate();

        this.playerFacingBonfire();
        this.playerFacingNpc();
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

    closeGate(){
        if(!this.interActive.gate1.closed && !this.roomIsClear() && this.player.x > this.interActive.gate1.gate.x + this.interActive.gate1.gate.width*2){
            this.interActive.gate1.closed = true;
            const endX = this.interActive.gate1.gate.x;
            const endY = this.interActive.gate1.gate.y + this.interActive.gate1.gate.height;
            this.game.physics.arcade.moveToXY(
                this.interActive.gate1.gate,
                this.interActive.gate1.gate.x,
                this.interActive.gate1.gate.y + this.interActive.gate1.gate.height,
                0.2,
                500
            );

            this.game.time.events.add(500, () => {
                this.interActive.gate1.gate.body.velocity.x = 0;
                this.interActive.gate1.gate.body.velocity.y = 0;
                this.interActive.gate1.gate.x = endX;
                this.interActive.gate1.gate.y = endY;
            }, this);
        }
    }

    openGate(){
        if(this.interActive.gate1.closed && this.roomIsClear()){
            this.interActive.gate1.closed = false;
            const endX = this.interActive.gate1.gate.x;
            const endY = this.interActive.gate1.gate.y -= this.interActive.gate1.gate.height;
            this.game.physics.arcade.moveToXY(
                this.interActive.gate1.gate,
                endX,
                endY,
                0.1,
                500
            );

            this.game.time.events.add(500, () => {
                this.interActive.gate1.gate.body.velocity.x = 0;
                this.interActive.gate1.gate.body.velocity.y = 0;
                this.interActive.gate1.gate.x = endX;
                this.interActive.gate1.gate.y = endY;
            }, this);
        }

        if(this.interActive.gate2.closed && this.roomIsClear()){
            this.interActive.gate2.closed = false;
            const endX = this.interActive.gate2.gate.x;
            const endY = this.interActive.gate2.gate.y -= this.interActive.gate2.gate.height;
            this.game.physics.arcade.moveToXY(
                this.interActive.gate2.gate,
                endX,
                endY,
                0.1,
                500
            );

            this.game.time.events.add(500, () => {
                this.interActive.gate2.gate.body.velocity.x = 0;
                this.interActive.gate2.gate.body.velocity.y = 0;
                this.interActive.gate2.gate.x = endX;
                this.interActive.gate2.gate.y = endY;
            }, this);
        }
    }

    roomIsClear():boolean{
        if(this.enemies.children.length === 0){
            return true;
        }
        return false;
    }
}
