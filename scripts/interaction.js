"use strict";
import { monstersData } from "./monster.js";
// Interactions with props
const interactionWithProp = function (positionInfo, brave) {
  if (!positionInfo || !brave) {
    return;
  }
  const info = positionInfo.slice(6);
  switch (info) {
    case "yellowkey":
      brave.yellowKey++;
      break;
    case "bluekey":
      brave.blueKey++;
      break;
    case "redkey":
      brave.redKey++;
      break;
    case "bloodred":
      brave.life += 200;
      break;
    case "bloodblue":
      brave.life += 500;
      break;
    case "diamondRed":
      brave.attack += 3;
      break;
    case "diamondBlue":
      brave.defence += 3;
      break;
    case "sword":
      brave.attack += 10;
      break;
    case "probe":
      brave.enableProbe();
      break;
    case "magicMoney":
      brave.money += 300;
      break;
    case "magicKey":
      brave.yellowKey++;
      brave.blueKey++;
      brave.redKey++;
      break;
    default:
      break;
  }
  brave.clearCurrentPosition();
  brave.logCurrentState();
};

const interactionWithGrid = function (positionInfo, brave) {
  if (!positionInfo || !brave) {
    return;
  }
  const info = positionInfo.slice(5);
  switch (info) {
    case "upstair":
      brave.updateFloor("up");
      break;
    case "downstair":
      brave.updateFloor("down");
      break;
    case "yellowdoor":
      brave.yellowKey--;
      break;
    case "bluedoor":
      brave.blueKey--;
      break;
    case "reddoor":
      brave.redKey--;
      break;
    default:
      break;
  }

  if (info !== "upstair" && info != "downstair") {
    brave.clearCurrentPosition();
  }
  brave.logCurrentState();
};

const interactionWithMonsters = function (positionInfo, brave) {
  if (!positionInfo || !brave) {
    return;
  }
  const monster = monstersData[positionInfo.slice(9)];
  console.log(monster);
  if (!monster) {
    return;
  }
  //
  brave.fight(monster);
  brave.logCurrentState();
  brave.clearCurrentPosition();
};

export { interactionWithProp, interactionWithGrid, interactionWithMonsters };
