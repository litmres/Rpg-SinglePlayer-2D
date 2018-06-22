interface savePlayerInterface{
    lastCheckPoint: levelsEnum;
    currentRoom:number;
    stats:playerStatsInterface;
    y:number;
    x:number;
}

interface playerStatsInterface{
	level:number;
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
	[playerStateEnum.standUp]:string;
	[playerStateEnum.movingStartWalk]:string;
	[playerStateEnum.autoWalkTo]:string;
}

interface npcAnimationInterface{
    [npcStateEnum.movingWalk]:string;
	[npcStateEnum.movingFall]:string;
	[npcStateEnum.idle]:string;
	[npcStateEnum.idleSpecial]:string;
	[npcStateEnum.attack1]:string;
	[npcStateEnum.attack2]:string;
	[npcStateEnum.attack3]:string;
	[npcStateEnum.death]:string;
	[npcStateEnum.sit]:string;
	[npcStateEnum.sitDown]:string;
	[npcStateEnum.movingChase]:string;
}

interface enemyAnimationInterface{
    [enemyStateEnum.movingWalk]:string;
	[enemyStateEnum.movingFall]:string;
	[enemyStateEnum.idle]:string;
	[enemyStateEnum.attack1]:string;
	[enemyStateEnum.attack2]:string;
	[enemyStateEnum.attack3]:string;
	[enemyStateEnum.death]:string;
	[enemyStateEnum.sit]:string;
	[enemyStateEnum.sitDown]:string;
	[enemyStateEnum.movingStartWalk]:string;
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
	[playerStateEnum.standUp]:boolean;
	[playerStateEnum.movingStartWalk]:boolean;
	[playerStateEnum.autoWalkTo]:boolean;
}

interface npcAllowanceInterface{
    [npcStateEnum.movingWalk]:boolean;
	[npcStateEnum.movingFall]:boolean;
	[npcStateEnum.idle]:boolean;
	[npcStateEnum.idleSpecial]:boolean;
	[npcStateEnum.attack1]:boolean;
	[npcStateEnum.attack2]:boolean;
	[npcStateEnum.attack3]:boolean;
	[npcStateEnum.death]:boolean;
	[npcStateEnum.sit]:boolean;
	[npcStateEnum.sitDown]:boolean;
	[npcStateEnum.movingChase]:boolean;
}

interface enemyAllowanceInterface{
    [enemyStateEnum.movingWalk]:boolean;
	[enemyStateEnum.movingFall]:boolean;
	[enemyStateEnum.idle]:boolean;
	[enemyStateEnum.attack1]:boolean;
	[enemyStateEnum.attack2]:boolean;
	[enemyStateEnum.attack3]:boolean;
	[enemyStateEnum.death]:boolean;
	[enemyStateEnum.sit]:boolean;
	[enemyStateEnum.sitDown]:boolean;
	[enemyStateEnum.movingStartWalk]:boolean;
}

interface gateInterface{
    closed:boolean;
    gate:Phaser.Image;
}
