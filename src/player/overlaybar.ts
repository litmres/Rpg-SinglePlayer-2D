class OverlayBar extends Phaser.Image {
    healthBar: Phaser.Image;
    maxHpBar = 300;
    maxStamBar = 288;
    staminaBar: Phaser.Image;
    overlay: Phaser.Image;
    player: Player;
    emitter: Phaser.Particles.Arcade.Emitter;
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

        this.emitter = this.game.add.emitter(this.healthBar.x + this.healthBar.width / 2, this.healthBar.y + this.healthBar.height - 5, 20);
        this.emitter.makeParticles("bubble");
        //this.emitter.setSize(this.healthBar.width, this.healthBar.height);
        this.emitter.width = this.healthBar.width - 20;
        this.emitter.height = this.healthBar.height / 2;

        this.emitter.minParticleScale = 0.02;
        this.emitter.maxParticleScale = 0.02;
        this.emitter.minParticleSpeed.setTo(-10, -5);
        this.emitter.maxParticleSpeed.setTo(10, -1);
        this.emitter.gravity = 0;
        this.emitter.start(false, 2000, 500);

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
