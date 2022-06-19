"strict mode";

// This collects all images src we need.
const imgSrc = {
  // grid
  1: "floor",
  2: "wall",
  3: "upstair",
  4: "downstair",
  5: "yellowdoor",
  6: "bluedoor",
  7: "reddoor",
  8: "door",
  9: "brick",
  10: "storeL",
  11: "storeM",
  12: "storeR",
  13: "jail",
  14: "star",
  15: "lava",
  // npc
  16: "merchant",
  17: "wise",
  18: "theif",
  19: "princess",
  20: "fairy",
  // monsters
  21: "greenSlime",
  22: "redSlime",
  23: "bigSlime",
  24: "bat",
  25: "skeleton",
  26: "skeletonS",
  27: "priest",
  28: "bigBat",
  29: "zombie",
  30: "",
  31: "",
  // props
  60: "bloodblue",
  61: "bloodred",
  62: "redkey",
  63: "bluekey",
  64: "yellowkey",
  65: "magicKey",
  66: "magicMoney",
  67: "diamondRed",
  68: "diamondBlue",
  69: "probe",
  70: "sword",
  // boss
  100: "",
};

const getImgSrc = function (index) {
  if (!imgSrc[index]) {
    // console.log(`Wrong image src index: ${index}`);
    return "";
  }
  let prefix = "";
  if (index >= 1 && index < 16) {
    prefix = "grid/";
  } else if (index < 21) {
    prefix = "npc/";
  } else if (index < 60) {
    prefix = "monsters/";
  } else if (index < 100) {
    prefix = "props/";
  }
  return prefix + imgSrc[index];
};

export { getImgSrc };
