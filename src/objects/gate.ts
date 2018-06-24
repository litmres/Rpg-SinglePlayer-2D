class Gate extends Phaser.Sprite {
    isClosed: boolean;
    roomIsClear = false;
    player: Player;
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "gate", 0);
        this.isClosed = false;
        this.height = this.height * 2;
        this.y -= (this.height / 2);
    }

    update() {
        if (this.player) {
            this.closeGate();
            this.openGate();
        }
    }

    openGate() {
        if (this.isClosed && this.roomIsClear) {
            this.isClosed = false;
            const endX = this.x;
            const endY = this.y -= this.height;
            this.game.physics.arcade.moveToXY(
                this,
                endX,
                endY,
                0.1,
                500
            );

            this.game.time.events.add(500, () => {
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.x = endX;
                this.y = endY;
            }, this);
        }
    }

    closeGate() {
        const distance = this.game.physics.arcade.distanceToXY(this, this.player.x, this.y);
        if (!this.isClosed && !this.roomIsClear && distance > this.width * 2) {
            this.isClosed = true;
            const endX = this.x;
            const endY = this.y + this.height;
            this.game.physics.arcade.moveToXY(
                this,
                endX,
                endY,
                0.2,
                500
            );

            this.game.time.events.add(500, () => {
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.x = endX;
                this.y = endY;
            }, this);
        }
    }
}
