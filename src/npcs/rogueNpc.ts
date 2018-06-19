class RogueNpc extends Phaser.Sprite {
    npcState:npcStateEnum = npcStateEnum.idle;
    npcDialogue = [
        "Press E to Talk",
        "hello there wanderer",
        "it looks like you're new to this place",
        "this place is dangerous",
        "you should be careful",
        "here take this",
        "..."
    ];
    npcDialogueLine = 0;
    interactRange = 50;
    canInteract = false;
    canInteractText!:Phaser.Text|null;
    DialogueStyle = {
        font: "bold 10px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };
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

        this.handleAnimation();

        this.interaction();
    }

    interaction(){
        if(this.canInteract && !this.canInteractText){
            this.canInteractText = this.game.add.text(this.x - this.width, this.y-this.height, this.npcDialogue[0], this.DialogueStyle);
        }else if(this.canInteract && this.canInteractText){
            this.canInteractText.destroy();
            this.canInteractText = this.game.add.text(this.x - this.width, this.y-this.height, this.npcDialogue[this.npcDialogueLine], this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 20, 0, 0);
        }else if(!this.canInteract && this.canInteractText){
            this.canInteractText.destroy();
            this.npcDialogueLine = 1;
        }
    }

    nextDialogueText(){
        if(this.canInteract){
            this.npcDialogueLine++;
            if(this.npcDialogueLine > this.npcDialogue.length){
                this.npcDialogueLine = this.npcDialogue.length-1;
            }
        }
    }

    resetVelocity(){
        this.body.velocity.x = 0;
    }

    moveLeft(){
        this.npcState = npcStateEnum.movingLeft;
        this.body.velocity.x = -150;
    }

    moveRight(){
        this.npcState = npcStateEnum.movingRight;
        this.body.velocity.x = 150;
    }

    idle(){
        this.npcState = npcStateEnum.idle;
    }

    handleAnimation(){
        switch(this.npcState){
            case npcStateEnum.idle: this.play("idle");
            break;
            default:
        }
    }
}
