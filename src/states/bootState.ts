class BootState extends Phaser.State {
    background!: number|Phaser.Image;
    preload() {
		this.background = 0xA00999;
	}
    
    create() {
        this.game.stage.backgroundColor = this.background;
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.game.state.start("preload", true, false);
    }
    /*
    startGame(this:BootState, gameWidth:number, gameHeight:number) {
        this.game.world.setBounds(0, 0, gameWidth, gameHeight);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //this.platforms = this.game.add.group();
        //this.platforms.enableBody = true;
        //const ground = this.platforms.create(0, gameHeight, "ground");
        //ground.y -= ground.height;
        
        //ground.body.immovable = true;
    
        const player = this.game.add.sprite(this.game.camera.x + this.game.camera.width/2, this.game.camera.y + this.game.camera.height/2, "player");
    }*/
}
