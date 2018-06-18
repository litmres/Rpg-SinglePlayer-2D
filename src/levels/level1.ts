class Level1 extends Phaser.State {
    levelNumber = levelsEnum.level1;
    background!: number|Phaser.Image;
    music!: Phaser.Sound;
    player!: Player;
    platforms!:Phaser.Group;
    enemies!:Phaser.Group;
    playerStorage:savePlayerInterface = JSON.parse(window.localStorage.getItem("player")!);
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

        this.physics.enable(this.platforms, Phaser.Physics.ARCADE);
    }
        
    create() {
        this.game.stage.backgroundColor = this.background;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.player = new Player(this.game, this.playerStorage.x, this.playerStorage.y);
    }

    update(){
        this.game.physics.arcade.collide(this.player, this.platforms);

        this.closeGate();
        this.openGate();
        this.nextLevel();
    }

    nextLevel(){
        if(!this.interActive.gate2.closed && this.player.x >= this.interActive.gate2.gate.x){
            this.savePlayer();
            this.game.state.start("level" + (this.levelNumber++), true, false);
        }
    }

    previousLevel(){
        if(this.player.x <= this.interActive.gate1.gate.x + this.interActive.gate1.gate.width){
            this.savePlayer(this.player.x);
            this.game.state.start("level" + (this.levelNumber--), true, false);
        }
    }

    savePlayer(x = 0){
        const savePlayer:savePlayerInterface = {
            //lastCheckPoint: this.player.lastCheckPoint,
            level:this.levelNumber,
            maxhp:this.player.maxHealth,
            hp:this.player.health,
            y:this.player.y,
            x:x,
        };
        window.localStorage.setItem("player", JSON.stringify(savePlayer));
    }

    closeGate(){
        if(!this.interActive.gate1.closed && !this.roomIsClear() && this.player.x > this.interActive.gate1.gate.x + this.interActive.gate1.gate.width*2){
            this.interActive.gate1.closed = true;
            this.interActive.gate1.gate.y += this.interActive.gate1.gate.height;
        }
    }

    openGate(){
        if(this.interActive.gate1.closed && this.roomIsClear()){
            this.interActive.gate1.closed = false;
            this.interActive.gate1.gate.y -= this.interActive.gate1.gate.height;
        }

        if(this.interActive.gate2.closed && this.roomIsClear()){
            this.interActive.gate2.closed = false;
            this.interActive.gate2.gate.y -= this.interActive.gate2.gate.height;
        }
    }

    roomIsClear():boolean{
        return false;
    }
}
