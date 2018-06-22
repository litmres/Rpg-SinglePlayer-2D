class TitleState extends Phaser.State {
    background!: number|Phaser.Image;
    logo!: Phaser.Sprite;
    startGame!: Phaser.Text;
    loadGame!:Phaser.Text;
    githubLink!:Phaser.Text;
    Options!:Phaser.Text;
    style = {
        font: "bold 32px Arial",
        fill: "#fff",
        boundsAlignH: "center",
        boundsAlignV: "middle"
    };
        
    preload(){
        this.background = 0x055550;
        this.game.add.text(0,0, "Everything you see is a Placeholder", this.style);
        this.startGame = this.game.add.text(0, 0, "Start New Game", this.style);
        this.loadGame = this.game.add.text(0, 50, "Load Game", this.style);
        this.Options = this.game.add.text(0, 100, "Options", this.style);
        this.githubLink = this.game.add.text(0, 300, "Github", this.style);
    }

    create() {
        this.game.stage.backgroundColor = this.background;
        const array = [
            this.startGame,
            this.loadGame,
            this.Options,
            this.githubLink
        ];

        array.forEach((text)=>{
            text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
            text.setTextBounds(0, 200, 800, 100);
            text.inputEnabled = true;
            text.events.onInputOver.add(this.glow, this);
            text.events.onInputOut.add(this.stopGlow, this);
            text.events.onInputUp.add(this.fadeOut, this);
        });
    }
        
    fadeOut(item:Phaser.Text) {
        switch(item){
            case this.startGame: window.localStorage.setItem("player", "null");
                this.game.state.start("level" + levelsEnum.level0, true, false);
            break;
            case this.loadGame: const loadedGame = JSON.parse(window.localStorage.getItem("player")!);
                if(loadedGame){
                    this.game.state.start("level" + loadedGame.currentRoom);
                }else{
                    alert("no Saved Game Found!");
                }
            break;
            case this.Options:
            break;
            case this.githubLink: window.open("http://www.github.com/twofist");
            break;
            default:
        }
    }

    glow(item:Phaser.Text){
        item.fill = "#ffff44";
    }

    stopGlow(item:Phaser.Text){
        item.fill = "#fff";
    }
}
