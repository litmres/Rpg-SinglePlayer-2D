class PreloadState extends Phaser.State {
    background!: number | Phaser.Image;
    loadingText!: Phaser.Text;
    logo!: Phaser.Image;
    preload() {
        this.game.load.onLoadStart.add(this.assets, this);
        //need one here for it to work apparently
        this.game.load.spritesheet("player", "bin/assets/player/player.png", 64, 64);
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

    progressBar(this: PreloadState, progress: Phaser.Loader, cacheKey: Phaser.Cache, success: Phaser.Signal, totalLoaded: Phaser.Loader, totalFiles: Phaser.Loader) {
        this.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
    }

    assets(this: PreloadState) {
        this.loadingText = this.game.add.text(this.game.camera.x, this.game.camera.height / 2, "loading...", {
            fill: "#ffffff",
        });
        this.game.stage.backgroundColor = 0xB20059;
        this.game.load.image("healthbar", "bin/assets/UI/healthbar.png");
        this.game.load.image("staminabar", "bin/assets/UI/staminabar.png");
        this.game.load.image("darkbackground", "bin/assets/backgrounds/background.png");
        this.game.load.image("floor", "bin/assets/foundations/floor.png");
        this.game.load.image("wall", "bin/assets/foundations/wall.png");
        this.game.load.image("gate", "bin/assets/foundations/gate.png");
        this.game.load.image("ceiling", "bin/assets/foundations/ceiling.png");
        this.game.load.image("item", "bin/assets/items/item.png");
        this.game.load.image("ring", "bin/assets/items/ring.png");
        this.game.load.image("ringslot", "bin/assets/UI/ringslot.png");
        this.game.load.image("inventory", "bin/assets/UI/inventory.png");
        this.game.load.image("beltslot", "bin/assets/UI/beltslot.png");

        this.game.load.spritesheet("rogue", "bin/assets/rogue/rogue.png", 32, 32);
        this.game.load.spritesheet("bonfire", "bin/assets/bonfire/bonfire.png", 500, 740);
        this.game.load.spritesheet("chest", "bin/assets/chest/chest.png", 30, 30);
        this.game.load.spritesheet("explosion", "bin/assets/explosion/explosion.png", 30, 30);
        this.game.load.spritesheet("adventurer", "bin/assets/adventurer/adventurer.png", 50, 37);
        this.game.load.spritesheet("djinnbandit", "bin/assets/djinnbandit/djinnbandit.png", 32, 32);
        this.game.load.spritesheet("earthwhisp", "bin/assets/earthwhisp/earthwhisp.png", 32, 32);
        this.game.load.spritesheet("firewhisp", "bin/assets/firewhisp/firewhisp.png", 32, 32);
        this.game.load.spritesheet("waterwhisp", "bin/assets/waterwhisp/waterwhisp.png", 32, 32);
        this.game.load.spritesheet("windwhisp", "bin/assets/windwhisp/windwhisp.png", 32, 32);
        this.game.load.spritesheet("goblin", "bin/assets/goblin/goblin.png", 32, 32);
        this.game.load.spritesheet("golem", "bin/assets/golem/golem.png", 32, 32);
        this.game.load.spritesheet("kobold", "bin/assets/kobold/kobold.png", 68, 35);
        this.game.load.spritesheet("mandrake", "bin/assets/mandrake/mandrake.png", 32, 32);
        this.game.load.spritesheet("mimic", "bin/assets/mimic/mimic.png", 32, 32);
        this.game.load.spritesheet("minotaur", "bin/assets/minotaur/minotaur.png", 32, 32);
        this.game.load.spritesheet("oculothorax", "bin/assets/oculothorax/oculothorax.png", 32, 32);
        this.game.load.spritesheet("ogre", "bin/assets/ogre/ogre.png", 32, 32);
        this.game.load.spritesheet("rat", "bin/assets/rat/rat.png", 32, 32);
        this.game.load.spritesheet("redogre", "bin/assets/redogre/redogre.png", 32, 32);
        this.game.load.spritesheet("satyr", "bin/assets/satyr/satyr.png", 32, 32);
        this.game.load.spritesheet("shade", "bin/assets/shade/shade.png", 32, 32);
        this.game.load.spritesheet("slime", "bin/assets/slime/slime.png", 32, 32);
        this.game.load.spritesheet("wasp", "bin/assets/wasp/wasp.png", 32, 32);
        this.game.load.spritesheet("werewolf", "bin/assets/werewolf/werewolf.png", 32, 32);
        this.game.load.spritesheet("yeti", "bin/assets/yeti/yeti.png", 32, 32);
    }

    finishedLoading(this: PreloadState) {
        this.loadingText.setText("Load Complete");
    }
}
