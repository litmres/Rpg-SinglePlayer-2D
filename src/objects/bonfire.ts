class Bonfire extends Phaser.Sprite {
    isLit: boolean;
    bonfireDialogue = {
        lit: "Press E to rest at bonfire",
        unlit: "Press E to light bonfire",
    };
    canInteract = false;
    canInteractText!: Phaser.Text | null;
    DialogueStyle = {
        font: "bold 10px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "bonfire", 0);
        this.anchor.setTo(0.5, 0);
        game.physics.arcade.enableBody(this);
        this.scale.setTo(0.05, 0.05);
        game.add.existing(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 1000;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.animations.add("bonfire_not_lit", [0]);
        this.animations.add("bonfire_lit", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, true);
        this.isLit = false;
    }

    update() {
        if (this.isLit) {
            this.animations.play("bonfire_lit");
        } else {
            this.animations.play("bonfire_not_lit");
        }

        this.interaction();
    }

    interaction() {
        if (!this.canInteractText) {
            this.canInteractText = this.game.add.text(this.x - this.width, this.y - this.height, "", this.DialogueStyle);
            this.canInteractText.setTextBounds(30, 20, 0, 0);
        }
        if (this.canInteract && this.isLit) {
            this.canInteractText.setText(this.bonfireDialogue.lit);
        } else if (this.canInteract && !this.isLit) {
            this.canInteractText.setText(this.bonfireDialogue.unlit);
        } else if (!this.canInteract) {
            this.canInteractText.setText("");
        }
    }
}
