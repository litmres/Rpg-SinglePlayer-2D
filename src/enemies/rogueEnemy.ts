class RogueEnemy extends Phaser.Sprite {
    enemyState:enemyStateEnum = enemyStateEnum.idle;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "rogue", 0);
        this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(this);
        game.add.existing(this);
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.animations.add("idle", [0,1,2,3,4,5,6,7,8,9], 3, true);
        this.animations.add("butterfly", [10,11,12,13,14,15,16,17,18,19], 3, true);
        this.animations.add("walk", [20,21,22,23,24,25,26,27,28,29], 3, true);
        this.animations.add("attack", [30, 31, 32, 33, 34, 35, 36 ,37, 38,39], 3, true);
        this.animations.add("death", [40,41,42,43,44,45,46,47,48,49], 3, true);
        this.health = this.maxHealth;
    }
    
    update() {
        this.resetVelocity();
        
        this.idle();
    }

    resetVelocity(){
        this.body.velocity.x = 0;
    }

    moveLeft(){
        this.enemyState = enemyStateEnum.movingLeft;
        this.body.velocity.x = -150;
    }

    moveRight(){
        this.enemyState = enemyStateEnum.movingRight;
        this.body.velocity.x = 150;
    }

    idle(){
        this.enemyState = enemyStateEnum.idle;
    }
}
