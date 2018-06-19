interface savePlayerInterface{
    lastCheckPoint: levelsEnum;
    currentRoom:number;
    maxhp:number;
    hp:number;
    y:number;
    x:number;
}

interface gateInterface{
    closed:boolean;
    gate:Phaser.Image;
}
