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
    playerStateEnum[playerStateEnum["standUp"] = 10] = "standUp";
    playerStateEnum[playerStateEnum["autoWalkTo"] = 11] = "autoWalkTo";
})(playerStateEnum || (playerStateEnum = {}));
var enemyStateEnum;
(function (enemyStateEnum) {
    enemyStateEnum[enemyStateEnum["movingWalk"] = 0] = "movingWalk";
    enemyStateEnum[enemyStateEnum["movingFall"] = 1] = "movingFall";
    enemyStateEnum[enemyStateEnum["idle"] = 2] = "idle";
    enemyStateEnum[enemyStateEnum["attack1"] = 3] = "attack1";
    enemyStateEnum[enemyStateEnum["attack2"] = 4] = "attack2";
    enemyStateEnum[enemyStateEnum["attack3"] = 5] = "attack3";
    enemyStateEnum[enemyStateEnum["death"] = 6] = "death";
    enemyStateEnum[enemyStateEnum["sit"] = 7] = "sit";
    enemyStateEnum[enemyStateEnum["sitDown"] = 8] = "sitDown";
    enemyStateEnum[enemyStateEnum["movingStartWalk"] = 9] = "movingStartWalk";
})(enemyStateEnum || (enemyStateEnum = {}));
var npcStateEnum;
(function (npcStateEnum) {
    npcStateEnum[npcStateEnum["movingWalk"] = 0] = "movingWalk";
    npcStateEnum[npcStateEnum["movingFall"] = 1] = "movingFall";
    npcStateEnum[npcStateEnum["idle"] = 2] = "idle";
    npcStateEnum[npcStateEnum["attack1"] = 3] = "attack1";
    npcStateEnum[npcStateEnum["attack2"] = 4] = "attack2";
    npcStateEnum[npcStateEnum["attack3"] = 5] = "attack3";
    npcStateEnum[npcStateEnum["death"] = 6] = "death";
    npcStateEnum[npcStateEnum["sit"] = 7] = "sit";
    npcStateEnum[npcStateEnum["sitDown"] = 8] = "sitDown";
    npcStateEnum[npcStateEnum["movingStartWalk"] = 9] = "movingStartWalk";
})(npcStateEnum || (npcStateEnum = {}));
var levelsEnum;
(function (levelsEnum) {
    levelsEnum[levelsEnum["level0"] = 0] = "level0";
    levelsEnum[levelsEnum["level1"] = 1] = "level1";
    levelsEnum[levelsEnum["level2"] = 2] = "level2";
    levelsEnum[levelsEnum["level3"] = 3] = "level3";
})(levelsEnum || (levelsEnum = {}));
//# sourceMappingURL=enums.js.map