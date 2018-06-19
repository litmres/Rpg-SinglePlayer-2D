interface savePlayerInterface{
    lastCheckPoint: levelsEnum;
    currentRoom:number;
    stats:playerStatsInterface;
    y:number;
    x:number;
}

interface playerStatsInterface{
    maxHealth:number;
    health:number;
    maxStamina:number;
    stamina:number;
    attack:number;
    defense:number;
    movespeed:number;
    luck:number;
}

interface gateInterface{
    closed:boolean;
    gate:Phaser.Image;
}
