class PreloadState extends Phaser.State {
    background!:number|Phaser.Image;
    loadingText!:Phaser.Text;
    logo!:Phaser.Image;
    preload() {
        this.game.load.onLoadStart.add(this.assets, this);
        this.game.load.image("floor", "assets/floor.png");
		this.game.load.onFileComplete.add(this.progressBar, this);
		this.game.load.onLoadComplete.add(this.finishedLoading, this);
    }
        
    create() {
        this.loadingText.destroy();
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
        this.game.load.image("floor", "assets/floor.png");
        this.game.load.image("wall", "assets/wall.png");
        this.game.load.image("gate", "assets/gate.png");
        this.game.load.image("ceiling", "assets/ceiling.png");
        this.game.load.spritesheet("rogue", "assets/rogue.png", 32, 32);
        this.game.load.image("healthbar", "assets/healthbar.png");
        this.game.load.image("staminabar", "assets/staminabar.png");
    }

    finishedLoading(this:PreloadState) {
        this.loadingText.setText("Load Complete");
    }
}
