class Inventory extends Phaser.Sprite {
    backgroundImage: Phaser.Image;

    transparency = 1;

    MenuStyle: MenuStyle = {
        font: "bold 32px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };

    player: Player;

    InventoryList = [];

    InventoryEquipment: InventoryEquipment = {
        ringSlots: [

        ],
        beltSlots: [

        ],
    };

    constructor(game: Phaser.Game, x: number, y: number, player: Player) {
        super(game, x, y);
        this.player = player;

        this.game.input.keyboard.addKey(Phaser.Keyboard.I).onDown.addOnce(() => {
            this.destroyInventory();
        });

        this.backgroundImage = this.game.add.image(0, 0, "inventory");
        this.backgroundImage.width = this.game.camera.width / 2;
        this.backgroundImage.height = this.game.camera.height / 2;

        this.addRingSlots(this.InventoryEquipment.ringSlots, 4, this.game.add.image(0, 0, "ringslot"));

        this.addBeltSlots(this.InventoryEquipment.beltSlots, 4, this.game.add.image(0, 0, "beltslot"));

    }

    addRingSlots(obj: Array<ItemSlot>, amount: number, image: Phaser.Image) {
        for (let ii = 0; ii < amount; ii++) {
            obj.push({
                backgroundImage: image,
                item: this.player.equipment.equiptRings[ii],
                x: 50,
                y: 50,
                trigger: () => {
                    console.log("hi");
                }
            });
        }
    }

    addBeltSlots(obj: Array<ItemSlot>, amount: number, image: Phaser.Image) {
        for (let ii = 0; ii < amount; ii++) {
            obj.push({
                backgroundImage: image,
                item: this.player.equipment.equiptRings[ii],
                x: 80,
                y: 80,
                trigger: () => {
                    console.log("hi");
                }
            });
        }
    }

    showToolTip() {

    }

    hideToolTip() {

    }

    destroyInventory() {
        this.backgroundImage.destroy();
    }
}

