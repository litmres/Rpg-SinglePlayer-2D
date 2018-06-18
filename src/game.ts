class SimpleGame {
	private game: Phaser.Game;
	
	constructor() {
		// create our phaser game
		// 800 - width
		// 600 - height
		// Phaser.AUTO - determine the renderer automatically (canvas, webgl)
		// 'content' - the name of the container to add our game to
		// { preload:this.preload, create:this.create} - functions to call for our states
		this.game = new Phaser.Game( 800, 600, Phaser.AUTO, "content", { preload: this.preload, create: this.create} );
	}
	
	private preload() {
		// add our logo image to the assets class under the
		// key 'logo'. We're also setting the background colour
		// so it's the same as the background colour in the image
		this.game.stage.backgroundColor = 0xB20059;

		const text = this.game.add.text(this.game.camera.x, this.game.camera.height / 2, "loading...", {
			fill: "#ffffff",
		});
  		this.game.load.onLoadStart.add(assets, this);
		this.game.load.onFileComplete.add(progressBar, this);
		this.game.load.onLoadComplete.add(finishedLoading, this);

	}
	
	private create() {
		// add the 'logo' sprite to the game, position it in the
		// center of the screen, and set the anchor to the center of
		// the image so it's centered properly. There's a lot of
		// centering in that last sentence
		const logo = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, "logo" );
		logo.anchor.setTo( 0.5, 0.5 );
	}
}

// when the page has finished loading, create our game
window.onload = () => {
	const game = new SimpleGame();
};

const assets = () => {
	this.game.load.image( "logo", "assets/ds_logo.png" );
};

const progressBar = (progress, cacheKey, success, totalLoaded, totalFiles, text) => {
	text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);

};

const finishedLoading = (text) => {
	text.setText("Load Complete");
};
