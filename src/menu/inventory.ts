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
        this.anchor.setTo(0.5, 0.5);
        this.player = player;
        this.x = this.game.camera.x + this.game.camera.width / 2;
        this.y = this.game.camera.y + this.game.camera.height / 2;

        this.game.input.keyboard.addKey(Phaser.Keyboard.I).onDown.addOnce(() => {
            this.destroyInventory();
        });

        this.backgroundImage = this.game.add.image(this.x, this.y, "inventory");
        this.backgroundImage.anchor.setTo(0.5, 0.5);
        this.backgroundImage.width = this.game.camera.width / 2;
        this.backgroundImage.height = this.game.camera.height / 2;

        this.addRingSlots(this.InventoryEquipment.ringSlots, 4);

        this.addBeltSlots(this.InventoryEquipment.beltSlots, 4);
    }

    addRingSlots(obj: Array<ItemSlot>, amount: number) {
        for (let ii = 0; ii < amount; ii++) {

            const image = this.game.add.image(0, 0, "ringslot");
            obj.push({
                backgroundImage: image,
                item: this.player.equipment.equiptRings[ii],
                trigger: () => {
                    console.log("hi");
                }
            });
            image.width = 30;
            image.height = 30;
            image.x = (this.backgroundImage.x - this.backgroundImage.width / 2) + ii * (image.width + 20) + 10;
            image.y = this.backgroundImage.y;
            image.inputEnabled = true;
            if (obj[ii].item) {
                const itemImage = this.game.add.image(image.x, image.y, "ringslot");
                itemImage.width = image.width;
                itemImage.height = image.height;
                itemImage.events.onInputOver.add(this.showToolTip, this);
                itemImage.events.onInputOut.add(this.hideToolTip, this);
            }
            image.events.onInputUp.add(obj[ii].trigger, this);
        }
    }

    addBeltSlots(obj: Array<ItemSlot>, amount: number) {
        for (let ii = 0; ii < amount; ii++) {
            const image = this.game.add.image(0, 0, "beltslot");
            obj.push({
                backgroundImage: image,
                item: this.player.equipment.equiptBelts[ii],
                trigger: () => {
                    console.log("bye");
                }
            });
            image.width = 30;
            image.height = 30;
            image.x = (this.backgroundImage.x - this.backgroundImage.width / 2) + ii * (image.width + 20) + 10;
            image.y = this.backgroundImage.y + image.height * 2;
            image.inputEnabled = true;
            image.events.onInputOver.add(this.showToolTip, this);
            image.events.onInputOut.add(this.hideToolTip, this);
            image.events.onInputUp.add(obj[ii].trigger, this);
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

