class PauseMenu extends Phaser.Sprite {
    backgroundImage: Phaser.Image;

    MenuStyle: MenuStyle = {
        font: "bold 32px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };

    player: Player;

    MenuText: Menu = {
        "Continue Game": {
            trigger: () => {
                this.continueTheGame();
            },
            style: this.MenuStyle,
            text: null,
            x: 0,
            y: 0,
        },
        "Save Game": {
            trigger: () => {
                this.player.savePlayer(this.player.x);
                alert("Game Saved");
            },
            style: this.MenuStyle,
            text: null,
            x: 0,
            y: 50,
        },
        "Load Game": {
            trigger: () => {
                const loadedGame = JSON.parse(window.localStorage.getItem("player")!);
                if (loadedGame) {
                    this.game.state.start("level" + loadedGame.currentRoom);
                    this.continueTheGame();
                } else {
                    alert("no Saved Game Found!");
                }
            },
            style: this.MenuStyle,
            text: null,
            x: 0,
            y: 100,
        },
        "Options": {
            trigger: () => {
                alert("Options not yet Implemented");
            },
            style: this.MenuStyle,
            text: null,
            x: 0,
            y: 150,
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

    constructor(game: Phaser.Game, x: number, y: number, player: Player) {
        super(game, x, y);
        this.player = player;
        this.game.paused = true;

        this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.addOnce(() => {
            this.continueTheGame();
        });

        this.game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.addOnce(() => {
            this.continueTheGame();
        });

        this.backgroundImage = this.game.add.image(0, 0, "wall");
        this.backgroundImage.width = this.game.camera.width;
        this.backgroundImage.height = this.game.camera.height;

        this.addMenu();
    }

    addMenu() {
        for (const key in this.MenuText) {
            const obj = this.MenuText[key];
            obj.text = this.game.add.text(obj.x, obj.y, key, obj.style);
            obj.text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
            obj.text.setTextBounds(0, 200, 800, 100);
            obj.text.inputEnabled = true;
            obj.text.events.onInputOver.add(this.pauseMenuGlow, this);
            obj.text.events.onInputOut.add(this.pauseMenuStopGlow, this);
            obj.text.events.onInputUp.add(obj.trigger, this);
        }
    }

    pauseMenuGlow(item: Phaser.Text) {
        item.fill = "#ffff44";
    }

    pauseMenuStopGlow(item: Phaser.Text) {
        item.fill = "#fff";
    }

    continueTheGame() {
        this.game.paused = false;
        if (!this.game.paused) {
            this.destroyPauseMenu();
        }
    }

    destroyPauseMenu() {
        this.backgroundImage.destroy();
        for (const key in this.MenuText) {
            const obj = this.MenuText[key];
            if (obj.text) {
                obj.text.destroy();
            }
        }
    }
}

