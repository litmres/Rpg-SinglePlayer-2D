class BossOverlay extends Phaser.Image {
    healthBar: Phaser.Image;
    maxHpBar = 830;
    overlay: Phaser.Image;
    boss: SlimeBoss;
    constructor(game: Phaser.Game, x: number, y: number, boss: SlimeBoss) {
        super(game, x, y, "");
        this.scale.setTo(0.4, 0.4);
        this.boss = boss;

        this.healthBar = this.game.add.image(66, 12, "healthbar");
        this.healthBar.height = 50;
        this.healthBar.width = this.maxHpBar;
        this.addChild(this.healthBar);

        this.overlay = this.game.add.image(0, 0, "bossoverlay");
        this.addChild(this.overlay);

        this.fixedToCamera = true;
    }

    update() {
        this.updateHealthBar(this.boss.stats.maxHealth, this.boss.stats.health);
    }

    updateHealthBar(max: number, current: number) {
        this.healthBar.width = this.maxHpBar / max * current;
    }
}
