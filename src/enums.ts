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
}

enum enemyStateEnum {
	movingLeft = 0,
	movingRight,
	movingJump,
	movingFall,
	idle,
}

enum npcStateEnum {
	movingLeft = 0,
	movingRight,
	movingJump,
	movingFall,
	idle,
}

enum levelsEnum {
	level0 = 0,
	level1,
	level2,
	level3,
}
