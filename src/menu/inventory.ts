class Inventory extends Phaser.Image {
    MenuStyle: MenuStyle = {
        font: "bold 32px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };

    player: Player;

    InventoryList = [];

    inventoryBars: Phaser.Group;

    inventoryStats: Phaser.Group;

    constructor(game: Phaser.Game, x: number, y: number, player: Player) {
        super(game, x, y, "");
        this.player = player;
        this.game.input.keyboard.addKey(Phaser.Keyboard.I).onDown.addOnce(() => {
            this.destroyInventory();
        });

        this.inventoryBars = this.game.add.group();
        const bar1 = new InventoryBar(this.game, this.x, this.y, this.player, "armor", 4);
        const bar2 = new InventoryBar(this.game, bar1.x, bar1.y + bar1.height, this.player, itemType.ring, 4);
        const bar3 = new InventoryBar(this.game, bar2.x, bar2.y + bar2.height, this.player, "belt", 4);
        const bar4 = new InventoryBar(this.game, bar2.x, bar3.y + bar3.height, this.player, "belt", 4);
        this.inventoryBars.add(bar1);
        this.inventoryBars.add(bar2);
        this.inventoryBars.add(bar3);
        this.inventoryBars.add(bar4);

        this.inventoryStats = this.game.add.group();
        const stats = new InventoryStats(this.game, bar1.x + bar1.width, bar1.y, this.player);
        this.inventoryStats.add(stats);
    }

    destroyInventory() {
        //silly phaser bug skips randomly when doing foreach so filter instead
        this.inventoryBars.filter((v: InventoryBar) => true).callAll("destroy");

        this.inventoryStats.forEach((v: InventoryStats) => {
            v.destroy();
        });
        setTimeout(() => {
            this.player.inventory = null;
        }, 100);
        this.destroy();
    }
}

