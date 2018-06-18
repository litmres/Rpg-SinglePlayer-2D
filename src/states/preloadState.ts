class PreloadState extends Phaser.State {
    background!:any;
    loadingText!:Phaser.Text;
    preload() {
        this.game.load.onLoadStart.add(this.assets, this);
		this.game.load.image( "logo", "assets/ds_logo.png" );
		this.game.load.onFileComplete.add(this.progressBar, this);
		this.game.load.onLoadComplete.add(this.finishedLoading, this);
    }
        
    create() {
        this.loadingText.destroy();
		const logo = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, "logo" );
		logo.anchor.setTo( 0.5, 0.5 );
		this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        logo.destroy();
        this.startTitleMenu();
    }
        
    startTitleMenu() {
        this.game.state.start("title", true, false);
    }

    progressBar(this:PreloadState, progress:Phaser.Loader, cacheKey:Phaser.Cache, success:Phaser.Signal, totalLoaded:Phaser.Loader, totalFiles:Phaser.Loader) {
        this.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
    }

    assets(this:PreloadState) {
        this.loadingText = this.game.add.text(this.game.camera.x, this.game.camera.height / 2, "loading...", {
            fill: "#ffffff",
        });
        this.game.stage.backgroundColor = 0xB20059;
        this.game.load.spritesheet("player", "assets/player_placeholder.png", 24, 31);
        this.game.load.image("ground", "assets/platform.png");
    }

    finishedLoading(this:PreloadState) {
        this.loadingText.setText("Load Complete");
    }
}
