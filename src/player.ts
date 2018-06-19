class Player extends Phaser.Sprite {
    playerState:playerStateEnum = playerStateEnum.idle;
    lastCheckPoint:levelsEnum = levelsEnum.level0;
    pauseMenu:any = {
        backgroundImage: null,
        continueGame: null,
        loadGame: null,
        options: null,
        githubLink: null,
    };
    fpsCounter:Phaser.Text = this.game.add.text(this.game.camera.x, 0, "FPS: " + this.game.time.fps, {
        font: "24px Arial",
        fill: "#fff"
    });
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "player", 0);
        this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(this);
        game.add.existing(this);
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        //this.health = new Health();
    }
    
    update() {
        this.resetVelocity();
        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.moveLeft();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.moveRight();
        }else{
            this.idle();
        }

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.ESC) || this.game.input.keyboard.isDown(Phaser.Keyboard.P)){
            this.handlePauseMenu();
        }
        
        this.fpsCounter.setText("FPS: " + this.game.time.fps);
    }

    resetVelocity(){
        this.body.velocity.x = 0;
    }

    moveLeft(){
        this.playerState = playerStateEnum.movingLeft;
        this.body.velocity.x = -150;
    }

    moveRight(){
        this.playerState = playerStateEnum.movingRight;
        this.body.velocity.x = 150;
    }

    idle(){
        this.playerState = playerStateEnum.idle;
    }

    handlePauseMenu(){
        this.game.paused = true;
        this.pauseMenu.backgroundImage = this.game.add.image(0,0, "wall");
        this.pauseMenu.backgroundImage.width = this.game.camera.width;
        this.pauseMenu.backgroundImage.height = this.game.camera.height;
        const style = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        this.pauseMenu.continueGame = this.game.add.text(0, 0, "Continue Game", style);
        this.pauseMenu.loadGame = this.game.add.text(0, 50, "Load Game", style);
        this.pauseMenu.options = this.game.add.text(0, 100, "Options", style);
        this.pauseMenu.githubLink = this.game.add.text(0, 300, "Github", style);

        const array = [
            this.pauseMenu.continueGame,
            this.pauseMenu.loadGame,
            this.pauseMenu.options,
            this.pauseMenu.githubLink
        ];

        array.forEach((text)=>{
            text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
            text.setTextBounds(0, 200, 800, 100);
            text.inputEnabled = true;
            text.events.onInputOver.add(this.pauseMenuGlow, this);
            text.events.onInputOut.add(this.pauseMenuStopGlow, this);
            text.events.onInputUp.add(this.pauseMenuFadeOut, this);
        });
    }

    pauseMenuFadeOut(item:Phaser.Text) {
        switch(item){
            case this.pauseMenu.continueGame: this.continueTheGame();
            break;
            case this.pauseMenu.loadGame:
            break;
            case this.pauseMenu.options:
            break;
            case this.pauseMenu.githubLink: window.open("http://www.github.com/twofist");
            break;
            default:
        }
    }

    pauseMenuGlow(item:Phaser.Text){
        item.fill = "#ffff44";
    }

    pauseMenuStopGlow(item:Phaser.Text){
        item.fill = "#fff";
    }

    continueTheGame(){
        this.destroyPauseMenu();
        this.game.paused = false;
    }

    destroyPauseMenu(){
        for(const key in this.pauseMenu){
            if(this.pauseMenu[key]){
                this.pauseMenu[key].destroy();
            }
        }
    }
}
