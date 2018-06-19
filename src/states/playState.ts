class PlayState extends Phaser.State {
    levelNumber = levelsEnum.level0;
    background!: number|Phaser.Image;
    music!: Phaser.Sound;
    player!: Player;
    platforms!:Phaser.Group;
    playerStorage:savePlayerInterface = JSON.parse(window.localStorage.getItem("player")!);

    preload(){
        this.background = 0x49801;

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        const ground = this.platforms.create(0, this.game.height, "floor");
        ground.y -= ground.height;
        ground.width = this.game.width;

        this.platforms.forEach(function(platform:Phaser.Sprite){
            platform.body.immovable = true;
        });

        this.game.time.advancedTiming = true;

        this.game.physics.enable(ground, Phaser.Physics.ARCADE);
    }
        
    create() {
        this.game.stage.backgroundColor = this.background;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        if(!this.playerStorage){
            this.playerStorage!.x = 0;
            this.playerStorage!.y = 0;
        }
        this.player = new Player(this.game, this.playerStorage.x, this.playerStorage.y);
        this.player.x += this.player.width;
        this.player.y -= this.player.height*2;
    }

    update(){
        this.game.physics.arcade.collide(this.player, this.platforms);
        if(this.player.x > 200){
            this.nextLevel();
        }
    }

    nextLevel(){
        this.savePlayer();
        this.game.state.start("level" + (this.levelNumber+1) , true, false);
    }

    savePlayer(x = 0){
        const savePlayer:savePlayerInterface = {
            lastCheckPoint: this.player.lastCheckPoint,
            currentRoom:this.levelNumber,
            maxhp:this.player.maxHealth,
            hp:this.player.health,
            y:this.player.y,
            x:x,
        };
        window.localStorage.setItem("player", JSON.stringify(savePlayer));
    }
}
