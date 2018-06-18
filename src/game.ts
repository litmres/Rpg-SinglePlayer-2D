class SimpleGame {
	private game: Phaser.Game;
	private loadingText:Phaser.Text;
	
	constructor() {
		this.game = new Phaser.Game( 800, 600, Phaser.AUTO, "content", { preload: this.preload, create: this.create} );
	}
	
	private preload() {
		this.game.load.onLoadStart.add(assets, this);
		this.game.load.image( "logo", "assets/ds_logo.png" );
		this.game.load.onFileComplete.add(progressBar, this);
		this.game.load.onLoadComplete.add(finishedLoading, this);

	}
	
	private create() {
		const logo = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, "logo" );
		logo.anchor.setTo( 0.5, 0.5 );
	}
}

window.onload = () => {
	const game = new SimpleGame();
};

function progressBar(progress, cacheKey, success, totalLoaded, totalFiles) {
	this.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
}

function assets() {
	this.loadingText = this.game.add.text(this.game.camera.x, this.game.camera.height / 2, "loading...", {
		fill: "#ffffff",
	});
	this.game.stage.backgroundColor = 0xB20059;
}

function finishedLoading() {
	this.loadingText.setText("Load Complete");
}
