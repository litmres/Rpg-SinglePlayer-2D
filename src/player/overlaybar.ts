class OverlayBar extends Phaser.Image {
    healthBar: Phaser.Image;
    maxHpBar = 300;
    maxStamBar = 288;
    staminaBar: Phaser.Image;
    overlay: Phaser.Image;
    player: Player;
    constructor(game: Phaser.Game, x: number, y: number, player: Player) {
        super(game, x, y, "");
        this.player = player;

        this.healthBar = this.game.add.image(52, 7, "healthbar");
        this.healthBar.height = 30;
        this.healthBar.width = this.maxHpBar;
        this.addChild(this.healthBar);

        this.staminaBar = this.game.add.image(52, 43, "staminabar");
        this.staminaBar.height = 10;
        this.staminaBar.width = this.maxStamBar;
        this.addChild(this.staminaBar);

        this.overlay = this.game.add.image(0, 0, "overlay");
        this.addChild(this.overlay);

        this.fixedToCamera = true;
    }

    update() {
        this.updateHealthBar(this.player.stats.maxHealth, this.player.stats.health);
        this.updateStaminaBar(this.player.stats.maxStamina, this.player.stats.stamina);
    }

    updateHealthBar(max: number, current: number) {
        this.healthBar.width = this.maxHpBar / max * current;
    }

    updateStaminaBar(max: number, current: number) {
        this.staminaBar.width = this.maxStamBar / max * current;
    }
}
