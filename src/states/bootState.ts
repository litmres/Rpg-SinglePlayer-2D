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
}
