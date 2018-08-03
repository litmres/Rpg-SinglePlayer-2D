class Sign extends Phaser.Sprite {
    signDialogue = [
        "Press E to interact",
        "i am the mighty sign of knowledge",
        "you seem like a worthy adventurer",
        "hmmm, yes, yes",
        "i've decided!",
        "hear me out, and i shall bless you with power",
        "Press A to walk left",
        "Press D to walk right",
        "Press SPACE to dodge",
        "Press E to interact with things",
        "Press Left Mouse Button to attack",
        "Press I to open inventory",
        "Press Escape or P to pause",
        "Bonfires will heal you",
        "now shoo you're wasting my precious time",
        "*mumbles i hate this job*",
        "..."
    ];
    signDialogueLine = 0;
    canInteract = false;
    canInteractText!: Phaser.Text | null;
    DialogueStyle = {
        font: "bold 10px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "sign", 0);
        this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(this);
        game.add.existing(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 1000;
        game.physics.enable(this, Phaser.Physics.ARCADE);
    }

    update() {
        this.interaction();
    }

    interaction() {
        if (!this.canInteractText) {
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 0, 0, 0);
        }
        if (this.canInteract) {
            if (this.signDialogueLine >= this.signDialogue.length) {
                this.signDialogueLine = this.signDialogue.length - 1;
            }
            this.canInteractText.setText(this.signDialogue[this.signDialogueLine]);
        } else if (!this.canInteract) {
            this.canInteractText.setText("");
            if (this.signDialogueLine > 0) {
                this.signDialogueLine = 1;
            }
        }
    }

    nextDialogueText() {
        if (this.canInteract) {
            this.signDialogueLine++;
        }
    }
}
