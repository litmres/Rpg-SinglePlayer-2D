class OverlayBar extends Phaser.Image {
    healthBar: Phaser.Image;
    maxHpBar = 300;
    maxStamBar = 288;
    staminaBar: Phaser.Image;
    player: Player;
    constructor(game: Phaser.Game, x: number, y: number, player: Player) {
        super(game, x, y, "overlay");
        this.player = player;

        this.healthBar = this.game.add.image(this.x + 52, this.y + 7, "healthbar");
        this.healthBar.height = 30;
        this.healthBar.width = this.maxHpBar;

        this.staminaBar = this.game.add.image(this.x + 52, this.y + 43, "staminabar");
        this.staminaBar.height = 10;
        this.staminaBar.width = this.maxStamBar;

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
