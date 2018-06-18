class PlayState extends Phaser.State {
    background!: number|Phaser.Image;
    music!: Phaser.Sound;
    player!: Player;
    platforms!:Phaser.Group;
    //level!:Level;

    preload(){
        this.background = 0x49801;
        //this.level = new Level();
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        const ground = this.platforms.create(0, this.game.height, "ground");
        ground.y -= ground.height;
        ground.body.immovable = true;
        this.game.physics.enable(ground, Phaser.Physics.ARCADE);
    }
        
    create() {
        this.game.stage.backgroundColor = this.background;
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        this.player = new Player(this.game, 200, 500);
    }

    update(){
        this.game.physics.arcade.collide(this.player, this.platforms);
    }

    LoadLevel(){
       
    }
}
