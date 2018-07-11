enum gameStateEnum {
	startMenu = 0,
	inGame,
}

enum playerStateEnum {
	movingWalk = 0,
	movingFall,
	idle,
	attack1,
	attack2,
	attack3,
	death,
	sit,
	sitDown,
	movingStartWalk,
	standUp,
	autoWalkTo,
	knockBack,
}

enum itemType {
	ring = 0,
}

enum enemyStateEnum {
	movingWalk = 0,
	movingFall,
	idle,
	idleSpecial,
	attack1,
	attack2,
	attack3,
	death,
	sit,
	sitDown,
	movingChase,
	knockBack,
}

enum npcStateEnum {
	movingWalk = 0,
	movingFall,
	idle,
	idleSpecial,
	attack1,
	attack2,
	attack3,
	death,
	sit,
	sitDown,
	movingChase,
	knockBack,
}

enum slimeBossStateEnum {
	regenerating = 0,
	jumpingToWall,
	jumpingToPlayer,
	splattered,
	idle,
	death,
}

enum levelsEnum {
	level0 = 0,
	level1,
	level2,
	level3,
}
