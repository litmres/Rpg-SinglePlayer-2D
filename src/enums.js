"use strict";
var gameStateEnum;
(function (gameStateEnum) {
    gameStateEnum[gameStateEnum["startMenu"] = 0] = "startMenu";
    gameStateEnum[gameStateEnum["inGame"] = 1] = "inGame";
})(gameStateEnum || (gameStateEnum = {}));
var playerStateEnum;
(function (playerStateEnum) {
    playerStateEnum[playerStateEnum["movingLeft"] = 0] = "movingLeft";
    playerStateEnum[playerStateEnum["movingRight"] = 1] = "movingRight";
    playerStateEnum[playerStateEnum["movingJump"] = 2] = "movingJump";
    playerStateEnum[playerStateEnum["movingFall"] = 3] = "movingFall";
    playerStateEnum[playerStateEnum["idle"] = 4] = "idle";
})(playerStateEnum || (playerStateEnum = {}));
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