class Equipment {

    ringSlots: Ring[] = [];
    beltSlots = [];

    equiptRings: Ring[] = [];
    equiptBelts = [];

    constructor() {

    }

    addToInventory(item: Ring) {
        if (item.itemType === "ring") {
            this.ringSlots.push(item);
        }
    }

    equiptRing(item: Ring) {
        this.equiptRings.push(item);
    }

    equiptBelt(item: any) {
        this.equiptBelts.push(item);
    }
}
