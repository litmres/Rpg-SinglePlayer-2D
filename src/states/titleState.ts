class TitleState extends Phaser.State {
    backgroundImage!: Phaser.Image | number;

    MenuStyle: MenuStyle = {
        font: "bold 32px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };

    MenuText: Menu = {
        "Start New Game": {
            trigger: () => {
                window.localStorage.setItem("player", "null");
                this.switchState("level" + levelsEnum.level0);
            },
            style: this.MenuStyle,
            text: null,
            x: 0,
            y: 0,
        },
        "Load Game": {
            trigger: () => {
                const loadedGame = JSON.parse(window.localStorage.getItem("player")!);
                if (loadedGame) {
                    this.switchState("level" + loadedGame.currentRoom);
                } else {
                    alert("no Saved Game Found!");
                }
            },
            style: this.MenuStyle,
            text: null,
            x: 0,
            y: 50,
        },
        "Options": {
            trigger: () => {
                alert("Options not yet Implemented");
            },
            style: this.MenuStyle,
            text: null,
            x: 0,
            y: 100,
        },
        "Github": {
            trigger: () => {
                window.open("http://www.github.com/twofist");
            },
            style: this.MenuStyle,
            text: null,
            x: 0,
            y: 300,
        },
    };

    preload() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.backgroundImage = 0x055550;
        for (const key in this.MenuText) {
            const obj = this.MenuText[key];
            obj.text = this.game.add.text(obj.x, obj.y, key, obj.style);
            obj.text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
            obj.text.setTextBounds(0, 200, 800, 100);
            obj.text.inputEnabled = true;
            obj.text.events.onInputOver.add(this.glow, this);
            obj.text.events.onInputOut.add(this.stopGlow, this);
            obj.text.events.onInputUp.add(obj.trigger, this);
        }
    }

    create() {
        this.game.stage.backgroundColor = this.backgroundImage;
    }

    glow(item: Phaser.Text) {
        item.fill = "#ffff44";
    }

    stopGlow(item: Phaser.Text) {
        item.fill = "#fff";
    }

    switchState(state: string) {
        this.game.state.start(state);
    }
}
