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
    canInteract = false;
    canInteractText!:Phaser.Text|null;
    DialogueStyle = {
        font: "bold 10px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };
    friendly = true;
    canIdle:npcAllowanceInterface = {
        [playerStateEnum.movingWalk]:true,
        [playerStateEnum.movingFall]:false,
        [playerStateEnum.idle]:false,
        [playerStateEnum.attack1]:false,
        [playerStateEnum.attack2]:false,
        [playerStateEnum.attack3]:false,
        [playerStateEnum.death]:false,
        [playerStateEnum.sit]:false,
        [playerStateEnum.sitDown]:false,
        [playerStateEnum.movingStartWalk]:true,
    };
    canAttack:npcAllowanceInterface = {
        [playerStateEnum.movingWalk]:true,
        [playerStateEnum.movingFall]:false,
        [playerStateEnum.idle]:true,
        [playerStateEnum.attack1]:false,
        [playerStateEnum.attack2]:false,
        [playerStateEnum.attack3]:false,
        [playerStateEnum.death]:false,
        [playerStateEnum.sit]:false,
        [playerStateEnum.sitDown]:false,
        [playerStateEnum.movingStartWalk]:true,
    };
    canSitDown:npcAllowanceInterface = {
        [playerStateEnum.movingWalk]:true,
        [playerStateEnum.movingFall]:false,
        [playerStateEnum.idle]:true,
        [playerStateEnum.attack1]:false,
        [playerStateEnum.attack2]:false,
        [playerStateEnum.attack3]:false,
        [playerStateEnum.death]:false,
        [playerStateEnum.sit]:false,
        [playerStateEnum.sitDown]:false,
        [playerStateEnum.movingStartWalk]:true,
    };
    stats:playerStatsInterface;
    npcAnimations:npcAnimationInterface = {
        [npcStateEnum.movingWalk]:"walk",
        [npcStateEnum.movingFall]:"fall",
        [npcStateEnum.idle]:"idle",
        [npcStateEnum.attack1]:"attack1",
        [npcStateEnum.attack2]:"attack2",
        [npcStateEnum.attack3]:"attack3",
        [npcStateEnum.death]:"death",
        [npcStateEnum.sit]:"sit",
        [npcStateEnum.sitDown]:"sitdown",
        [npcStateEnum.movingStartWalk]:"startwalk",
    };
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "rogue", 0);
        this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(this);
        game.add.existing(this);
        this.body.gravity.y = 1000;
        this.body.collideWorldBounds = true;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.stats = {
            level: 1,
            maxHealth: this.maxHealth,
            health: this.maxHealth,
            maxStamina: this.maxHealth,
            stamina: this.maxHealth,
            attack: 1,
            defense: 1,
            movespeed: 150,
            luck: 1,
        };
        this.animations.add("idle", [0,1,2,3,4,5,6,7,8,9], 3, false).onComplete.add(() => {
            //if(randomchance){
            //    this.animation.play("butterfly");
            //}else{
                this.animations.play("idle");
            //}
        });
        this.animations.add("butterfly", [10,11,12,13,14,15,16,17,18,19], 3, false).onComplete.add(() => {
            this.animations.stop();
            this.animations.play("idle");
        });
        this.animations.add("walk", [20,21,22,23,24,25,26,27,28,29], 3, true);
        this.animations.add("attack", [30, 31, 32, 33, 34, 35, 36 ,37, 38,39], 3, false).onComplete.add(() => {
            this.animations.stop();
            this.npcState = npcStateEnum.idle;
        });
        this.animations.add("death", [40,41,42,43,44,45,46,47,48,49], 3, false).onComplete.add(() => {
            //kill npc and respawn
        });
        this.health = this.maxHealth;
    }
    
    update() {
        this.resetVelocity();

        this.animations.play(this.npcAnimations[this.npcState]);
        
        this.handleInput();

        this.handleAnimation();

        this.interaction();
    }

    // tslint:disable-next-line:cyclomatic-complexity
    handleInput(){
        /*
        if (this.controls.LEFT.isDown && this.canWalk[this.playerState]) {
            this.moveLeft();
        } else if (this.controls.RIGHT.isDown && this.canWalk[this.playerState]) {
            this.moveRight();
        }else if(this.controls.E.justPressed() && this.facingBonfire && this.canSitDown[this.playerState]){
            this.handleBonfire();
        }else if(this.controls.E.justPressed() && this.facingNpc){
            this.handleNpc();
        }else if(this.canIdle[this.playerState]){
            this.idle();
        }
        */
    }

    // tslint:disable-next-line:cyclomatic-complexity
    interaction(){
        if(!this.friendly && this.canInteractText){
            this.canInteractText.setText("");
            return;
        }else if(!this.friendly){
            return;
        }

        if(!this.canInteractText){
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 20, 0, 0);
        }
        if(this.canInteract){
            if(this.npcDialogueLine >= this.npcDialogue.length){
                this.npcDialogueLine = this.npcDialogue.length-1;
            }
            this.canInteractText.setText(this.npcDialogue[this.npcDialogueLine]);
        }else if(!this.canInteract){
            this.canInteractText.setText("");
            if(this.npcDialogueLine > 0){
                this.npcDialogueLine = 1;
            }
        }
    }

    nextDialogueText(){
        if(this.canInteract){
            this.npcDialogueLine++;
        }
    }

    resetVelocity(){
        this.body.velocity.x = 0;
    }

    moveLeft(){
        this.npcState = npcStateEnum.movingWalk;
        this.scale.setTo(-1, 1);
        this.body.velocity.x = -150;
    }

    moveRight(){
        this.npcState = npcStateEnum.movingWalk;
        this.scale.setTo(1, 1);
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
