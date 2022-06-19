"use strict";
import { getMaps } from "./mapsData.js";
import { createGridsHtml } from "./grids.js";
class Maps {
  constructor() {
    this.range = 21;
    this.mapsArr = getMaps(this.range);
    this.element = document.querySelector(".mapContent");
  }

  // Get info (image) of a give position
  getPositionInfo(floor, index) {
    if (!this.mapsArr[floor]) {
      return;
    }
    return this.mapsArr[floor][index];
  }
}

export { Maps };
