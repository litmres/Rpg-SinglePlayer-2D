class SimpleGame extends Phaser.Game{
	constructor() {
		super(800, 600, Phaser.AUTO, "content", null);
		this.state.add("boot", new BootState());
		this.state.add("preload", new PreloadState());
        this.state.add("title", new TitleState());
        this.state.add("play", new PlayState());
        
       this.state.start("boot");
	}
	
}

window.onload = () => {
	const game = new SimpleGame();
};
