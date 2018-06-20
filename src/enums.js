"use strict";
var gameStateEnum;
(function (gameStateEnum) {
    gameStateEnum[gameStateEnum["startMenu"] = 0] = "startMenu";
    gameStateEnum[gameStateEnum["inGame"] = 1] = "inGame";
})(gameStateEnum || (gameStateEnum = {}));
var playerStateEnum;
(function (playerStateEnum) {
    playerStateEnum[playerStateEnum["movingWalk"] = 0] = "movingWalk";
    playerStateEnum[playerStateEnum["movingFall"] = 1] = "movingFall";
    playerStateEnum[playerStateEnum["idle"] = 2] = "idle";
    playerStateEnum[playerStateEnum["attack1"] = 3] = "attack1";
    playerStateEnum[playerStateEnum["attack2"] = 4] = "attack2";
    playerStateEnum[playerStateEnum["attack3"] = 5] = "attack3";
    playerStateEnum[playerStateEnum["death"] = 6] = "death";
    playerStateEnum[playerStateEnum["sit"] = 7] = "sit";
    playerStateEnum[playerStateEnum["sitDown"] = 8] = "sitDown";
    playerStateEnum[playerStateEnum["movingStartWalk"] = 9] = "movingStartWalk";
})(playerStateEnum || (playerStateEnum = {}));
var enemyStateEnum;
(function (enemyStateEnum) {
    enemyStateEnum[enemyStateEnum["movingLeft"] = 0] = "movingLeft";
    enemyStateEnum[enemyStateEnum["movingRight"] = 1] = "movingRight";
    enemyStateEnum[enemyStateEnum["movingJump"] = 2] = "movingJump";
    enemyStateEnum[enemyStateEnum["movingFall"] = 3] = "movingFall";
    enemyStateEnum[enemyStateEnum["idle"] = 4] = "idle";
})(enemyStateEnum || (enemyStateEnum = {}));
var npcStateEnum;
(function (npcStateEnum) {
    npcStateEnum[npcStateEnum["movingLeft"] = 0] = "movingLeft";
    npcStateEnum[npcStateEnum["movingRight"] = 1] = "movingRight";
    npcStateEnum[npcStateEnum["movingJump"] = 2] = "movingJump";
    npcStateEnum[npcStateEnum["movingFall"] = 3] = "movingFall";
    npcStateEnum[npcStateEnum["idle"] = 4] = "idle";
})(npcStateEnum || (npcStateEnum = {}));
var levelsEnum;
(function (levelsEnum) {
    levelsEnum[levelsEnum["level0"] = 0] = "level0";
    levelsEnum[levelsEnum["level1"] = 1] = "level1";
    levelsEnum[levelsEnum["level2"] = 2] = "level2";
    levelsEnum[levelsEnum["level3"] = 3] = "level3";
})(levelsEnum || (levelsEnum = {}));
//# sourceMappingURL=enums.js.map