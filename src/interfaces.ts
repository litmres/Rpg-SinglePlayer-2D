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

interface playerAnimationInterface{
    [playerStateEnum.movingWalk]:string;
	[playerStateEnum.movingFall]:string;
	[playerStateEnum.idle]:string;
	[playerStateEnum.attack1]:string;
	[playerStateEnum.attack2]:string;
	[playerStateEnum.attack3]:string;
	[playerStateEnum.death]:string;
	[playerStateEnum.sit]:string;
	[playerStateEnum.sitDown]:string;
	[playerStateEnum.movingStartWalk]:string;
}

interface playerAllowanceInterface{
    [playerStateEnum.movingWalk]:boolean;
	[playerStateEnum.movingFall]:boolean;
	[playerStateEnum.idle]:boolean;
	[playerStateEnum.attack1]:boolean;
	[playerStateEnum.attack2]:boolean;
	[playerStateEnum.attack3]:boolean;
	[playerStateEnum.death]:boolean;
	[playerStateEnum.sit]:boolean;
	[playerStateEnum.sitDown]:boolean;
	[playerStateEnum.movingStartWalk]:boolean;
}

interface gateInterface{
    closed:boolean;
    gate:Phaser.Image;
}
