class Player extends Phaser.Sprite {
    playerState:playerStateEnum = playerStateEnum.idle;
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

}
