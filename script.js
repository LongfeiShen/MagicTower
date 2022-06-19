"strict_mode";
import { createGridsHtml } from "./scripts/grids.js";
import { Brave } from "./scripts/brave.js";
import { Maps } from "./scripts/map.js";
// map meta data
const mapInfo = {
  mapSize: 11,
  gridSize: 70,
  mapLeft: 600,
  mapTop: 40,
  floorRange: 21,
};

// elements
const backgroundElement = document.querySelector(".background");
const mapElement = document.querySelector(".mapContent");
const braveContentElement = document.querySelector(".braveContent");

// background
const backgroundHtml = createGridsHtml(
  /* numRows= */ 13,
  /* numCols= */ 23,
  /* gridSize= */ 65,
  /* left= */ 15,
  /* top= */ 0,
  /* className= */ "",
  /* imgArr= */ "",
  false
);
backgroundElement.insertAdjacentHTML("beforeend", backgroundHtml);

/** Brave */
const brave = new Brave(mapInfo);

// Create Map Html
brave.renderMap();
// Create Brave Html
brave.__initializeBraveElement();
//
brave.renderPanel();
// Add Event listener to control the brave
window.addEventListener("keydown", (e) => {
  const code = e.code;
  switch (code) {
    case "ArrowLeft":
      brave.turnLeft();
      break;
    case "ArrowRight":
      brave.turnRight();
      break;
    case "ArrowUp":
      brave.turnUp();
      break;
    case "ArrowDown":
      brave.turnDown();
      break;
    default:
      break;
  }
});
