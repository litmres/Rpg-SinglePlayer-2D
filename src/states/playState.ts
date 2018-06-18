class PlayState extends Phaser.State {
    background!: number|Phaser.Image;
    music!: Phaser.Sound;
    player!: Player;
    platforms!:Phaser.Group;

    preload(){
        this.background = 0x49801;
    }
        
    create() {
        this.game.stage.backgroundColor = this.background;
        //this.background = this.add.sprite(0, 0, "level1");
        //this.music = this.add.audio("zap", 1, false);
        //this.music.play();
                    
        this.player = new Player(this.game, 130, 284);
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        const ground = this.platforms.create(0, this.game.height, "ground");
        ground.y -= ground.height;
        
        ground.body.immovable = true;
    }
}
