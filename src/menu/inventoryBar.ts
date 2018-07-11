class InventoryBar extends Phaser.Image {

    player: Player;

    slots = {
        type: 0,
        amount: 0,
        array: [],
    };

    itemSlot: Phaser.Group;
    equiptSlot: Phaser.Group;

    constructor(game: Phaser.Game, x: number, y: number, player: Player, slotType: number, amount: number) {
        super(game, x, y, "inventorybar");
        this.scale.setTo(0.5, 0.5);
        this.player = player;
        this.slots = {
            type: slotType,
            amount: amount,
            array: [],
        };
        this.itemSlot = this.game.add.group();
        this.equiptSlot = this.game.add.group();
        this.addSlots(this.slots.array, amount);

        this.addChild(this.itemSlot);
        this.itemSlot.scale.setTo(2, 2);

        this.addChild(this.equiptSlot);
        this.equiptSlot.scale.setTo(2, 2);
    }

    addSlots(obj: Array<ItemSlot>, amount: number) {
        for (let ii = 0; ii < amount; ii++) {
            const image = this.game.add.image(0, 0, "inventoryslot");
            obj.push({
                backgroundImage: image,
                item: this.player.equipment.getEquiptItem(this.slots.type, ii),
                itemImage: null,
                trigger: () => {
                    console.log("hi");
                }
            });
            image.x += ii * (image.width + 20) + 10;
            image.y += image.height / 3;
            image.inputEnabled = true;
            if (obj[ii].item) {
                obj[ii].itemImage = this.game.add.image(image.x, image.y, "ring");
                obj[ii].itemImage!.width = image.width;
                obj[ii].itemImage!.height = image.height;
                obj[ii].itemImage!.events.onInputOver.add(this.showToolTip, this);
                obj[ii].itemImage!.events.onInputOut.add(this.hideToolTip, this);
                this.equiptSlot.add(obj[ii].itemImage);
            }
            image.events.onInputUp.add(obj[ii].trigger, this);
            this.itemSlot.add(image);
        }
    }

    showToolTip() {

    }

    hideToolTip() {

    }
}
