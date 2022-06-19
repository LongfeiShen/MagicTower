"use strict";
import { getMonsterSrc } from "./monster.js";
import { getImgSrc } from "./imageData.js";
// commonly used images
const commonlyUsed = {
  1: "grid/floor",
  2: "grid/wall",
  3: "grid/upstair",
  4: "grid/downstair",
  5: "props/yellowkey",
  6: "props/bluekey",
  7: "props/redkey",
  8: "props/bloodred",
  9: "props/bloodblue",
  10: "grid/yellowdoor",
  11: "grid/bluedoor",
  12: "grid/reddoor",
};

const notAllowedToPass = [
  "grid/wall",
  "grid/door",
  "grid/storeL",
  "grid/storeM",
  "grid/storeR",
];

//
const M = getMonsterSrc;
const maps = {
  1: [
    /*1*/ 3, 1, 64, 21, 22, 21, 1, 1, 1, 1, 1, /*2*/ 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 1, /*3*/ 61, 1, 25, 5, 1, 2, 61, 64, 61, 2, 1, /*4*/ 64, 25, 67, 2, 1, 2,
    61, 64, 61, 2, 1, /*5*/ 2, 5, 2, 2, 1, 2, 2, 2, 23, 2, 1, /*6*/ 64, 26, 1,
    2, 1, 5, 27, 21, 24, 2, 1, /* 7*/ 68, 1, 63, 2, 1, 2, 2, 2, 2, 2, 1,
    /*8*/ 2, 5, 2, 2, 1, 1, 1, 1, 1, 1, 1, /*9*/ 1, 26, 1, 2, 2, 7, 2, 2, 2, 5,
    2, /*10*/ 61, 60, 64, 2, 62, 1, 1, 2, 64, 29, 63, /*11*/ 61, 69, 64, 2, 1,
    4, 1, 2, 64, 64, 64,
  ],
  2: [
    /*1*/ 4, 2, 1, 1, 1, 2, 67, 68, 64, 62, 2, /*2*/ 1, 2, 68, 2, 60, 2, 67, 68,
    64, 63, 2, /*3*/ 1, 2, 64, 2, 64, 2, 67, 68, 64, 1, 2, /*4*/ 1, 2, 64, 2,
    64, 2, 2, 2, 2, 5, 2, /*5*/ 1, 2, 1, 2, 1, 1, 1, 5, 1, 1, 2, /*6*/ 1, 2, 5,
    2, 2, 5, 2, 2, 5, 2, 2, /*7*/ 1, 8, 1, 1, 1, 1, 2, 1, 1, 1, 2, /*8*/ 1, 2,
    5, 2, 2, 6, 2, 13, 2, 13, 2, /*9*/ 1, 2, 64, 2, 60, 61, 2, 1, 2, 1, 2,
    /*10*/ 1, 2, 64, 2, 60, 61, 2, 1, 2, 1, 2, /*11*/ 3, 2, 67, 2, 60, 61, 2,
    17, 2, 16, 2,
  ],
  3: [
    /*1*/ 70, 22, 64, 2, 10, 11, 12, 2, 2, 2, 2, /*2*/ 22, 64, 1, 2, 1, 1, 1, 2,
    1, 24, 1, /*3*/ 64, 25, 1, 2, 2, 5, 2, 2, 1, 2, 1, /*4*/ 2, 5, 2, 2, 1, 25,
    1, 2, 64, 2, 22, /*5*/ 1, 1, 1, 2, 2, 2, 1, 2, 64, 2, 24, /*6*/ 21, 2, 1,
    24, 22, 24, 1, 2, 64, 2, 22, /*7*/ 21, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1,
    /*8*/ 1, 1, 1, 1, 1, 2, 2, 5, 2, 2, 1, /*9*/ 2, 2, 2, 2, 24, 2, 22, 1, 22,
    2, 1, /*10*/ 2, 1, 1, 1, 1, 2, 68, 24, 64, 2, 1, /*11*/ 4, 1, 2, 2, 2, 2,
    67, 60, 64, 2, 3,
  ],
};

// Map utils
const getMap = function (floor) {
  return maps[floor].map((index) => {
    return getImgSrc(index);
  });
};

const getMaps = function (range) {
  const mapsProcessed = {};
  for (let floor = 1; floor <= range; floor++) {
    if (maps[floor]) {
      mapsProcessed[floor] = getMap(floor);
    }
  }
  return mapsProcessed;
};

export { getMap, getMaps, notAllowedToPass };
