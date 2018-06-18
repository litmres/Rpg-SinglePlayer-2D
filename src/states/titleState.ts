class TitleState extends Phaser.State {
    background!: number|Phaser.Image;
    logo!: Phaser.Sprite;
        
    preload(){
        this.background = 0x055550;
    }

    create() {
        this.game.stage.backgroundColor = this.background;
        this.logo = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, "logo" );
            
        this.input.onDown.addOnce(this.fadeOut, this);
    }
        
    fadeOut() {
        this.game.state.start("play", true, false);
    }
}
