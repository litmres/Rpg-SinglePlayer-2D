class Equipment {

    ringSlots: Ring[] = [];
    beltSlots = [];
    armorSlots = [];

    equiptRings: Ring[] = [new Ring()];
    equiptBelts = [];
    equiptArmors = [];

    constructor() {

    }

    addToInventory(item: any) {
        if (item.itemType === "ring") {
            this.ringSlots.push(item);
        }
        if (item.itemType === "armor") {
            this.armorSlots.push(item);
        }
        if (item.itemType === "belt") {
            this.beltSlots.push(item);
        }
    }

    equiptRing(item: Ring) {
        this.equiptRings.push(item);
    }

    equiptBelt(item: any) {
        this.equiptBelts.push(item);
    }

    equiptArmor(item: any) {
        this.equiptArmors.push(item);
    }

    getEquiptItem(type: string, num: number) {
        if (type === "ring") {
            return this.equiptRings[num];
        }
        if (type === "belt") {
            return this.equiptBelts[num];
        }
        if (type === "armor") {
            return this.equiptArmors[num];
        }

        return null;
    }
}
