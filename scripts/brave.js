"strict mode";
import { Maps } from "./map.js";
import { notAllowedToPass } from "./mapsData.js";
import { createGridsHtml } from "./grids.js";
import {
  interactionWithProp,
  interactionWithGrid,
  interactionWithMonsters,
} from "./interaction.js";
import { monstersData } from "./monster.js";
import { createPanelHtml } from "./panel.js";
class Brave {
  constructor(mapInfo) {
    this.life = 1000;
    this.attack = 10;
    this.defence = 10;
    this.money = 0;
    this.exp = 0;
    this.yellowKey = 0;
    this.blueKey = 1;
    this.redKey = 1;
    this.floor = 1;
    this.row = 9;
    this.col = 5;
    this.direction = "down";
    this.probe = false;
    this.__initializeBraveElement();
    // map info
    this.mapLeft = mapInfo.mapLeft;
    this.mapTop = mapInfo.mapTop;
    this.gridSize = mapInfo.gridSize;
    this.mapSize = mapInfo.mapSize;
    this.__initializeMaps();
    // img
    this.images = {
      left: "left1",
      leftStep: "left2",
      right: "right1",
      rightStep: "right2",
      up: "up1",
      upStep: "up2",
      down: "down1",
      downStep: "down2",
    };
  }

  __initializeMaps() {
    // Initialize maps before initialize brave
    this.mapObject = new Maps();
    this.mapsArr = this.mapObject.mapsArr;
  }

  getCurrentMap() {
    return this.mapsArr[this.floor];
  }

  clearCurrentPosition() {
    // TODO: Add a open door animation when opening a door
    this.getCurrentMap()[this.getCurrentIndex()] = "grid/floor"; //which is floor
    this.renderMap();
  }

  enableProbe() {
    this.probe = true;
  }

  /**Check if allowed to move */
  checkAllowedToMove() {}

  getPosition() {
    return {
      left: this.mapLeft + this.gridSize * this.col,
      top: this.mapTop + this.gridSize * this.row,
    };
  }
  // Update UI
  updatePosition() {
    if (this.element) {
      this.element.style.left = `${this.getPosition().left}px`;
      this.element.style.top = `${this.getPosition().top}px`;
    }
  }

  /**Update brave image */
  // update brave moving
  updateImageMoving() {
    // Animation
    if (this.element) {
      this.element.src = `images/brave/${
        this.images[this.direction + "Step"]
      }.png`;
      setTimeout(() => {
        this.element.src = `images/brave/${this.images[this.direction]}.png`;
      }, 100);
    }
  }

  // moving animation
  renderMovingAnimation() {
    this.updatePosition();
    this.updateImageMoving();
  }

  // update brave turning
  updateImageTurning() {
    if (this.element) {
      this.element.src = `images/brave/${this.images[this.direction]}.png`;
    }
  }

  bindElement(braveElement) {
    this.element = braveElement;
  }
  /** Helper functions */
  // getIndex with given row and column
  getPosIndex(row, column) {
    return row * this.mapSize + column;
  }
  // Get current position index
  getCurrentIndex() {
    return this.getPosIndex(this.row, this.col);
  }

  /** Brave move */
  // Check if allowed to move
  checkNotAllowedToMove() {
    // blocked by wall or map
    if (
      (this.direction === "left" &&
        (this.col <= 0 || this.checkCannotPass(this.row, this.col - 1))) ||
      (this.direction === "right" &&
        (this.col >= this.mapSize - 1 ||
          this.checkCannotPass(this.row, this.col + 1))) ||
      (this.direction === "up" &&
        (this.row <= 0 || this.checkCannotPass(this.row - 1, this.col))) ||
      (this.direction === "down" &&
        (this.row >= this.mapSize - 1 ||
          this.checkCannotPass(this.row + 1, this.col)))
    ) {
      return true;
    }
    // Cannot open door
    const destinationInfo = this.getDestinationPositionInfo(this.direction);
    if (
      (this.yellowKey === 0 && destinationInfo === "grid/yellowdoor") ||
      (this.blueKey === 0 && destinationInfo === "grid/bluedoor") ||
      (this.redKey === 0 && destinationInfo === "grid/reddoor")
    ) {
      return true;
    }
    // Cannot defeat monster
    if (destinationInfo.startsWith("monsters")) {
      const monster = monstersData[destinationInfo.slice(9)];
      if (monster && this.canDefeat(monster) <= 0) {
        return true;
      }
    }

    return false;
  }

  // destination
  getDestinationPositionInfo(direction) {
    let row = this.row;
    let col = this.col;
    if (direction === "left") {
      col--;
    } else if (direction === "right") {
      col++;
    } else if (direction === "up") {
      row--;
    } else if (direction === "down") {
      row++;
    }
    return this.getPositionInfo(row, col);
  }
  //
  getPositionInfo(row, col) {
    return this.mapObject.getPositionInfo(
      this.floor,
      this.getPosIndex(row, col)
    );
  }

  // check if the position is a wall or anything cannot pass
  checkCannotPass(row, col) {
    const positionInfo = this.mapObject.getPositionInfo(
      this.floor,
      this.getPosIndex(row, col)
    );
    return notAllowedToPass.includes(positionInfo);
  }

  turnLeft() {
    this.direction = "left";
    this.updateImageTurning();
    if (this.checkNotAllowedToMove()) {
      return;
    }
    this.col--;
    this.renderMovingAnimation();
    this.interactionWithMap();
  }

  turnRight() {
    this.direction = "right";
    this.updateImageTurning();
    if (this.checkNotAllowedToMove()) {
      return;
    }
    this.col++;
    this.renderMovingAnimation();
    this.interactionWithMap();
  }

  turnUp() {
    this.direction = "up";
    this.updateImageTurning();
    if (this.checkNotAllowedToMove()) {
      return;
    }
    this.row--;
    this.renderMovingAnimation();
    this.interactionWithMap();
  }

  turnDown() {
    this.direction = "down";
    this.updateImageTurning();
    if (this.checkNotAllowedToMove()) {
      return;
    }
    this.row++;
    this.renderMovingAnimation();
    this.interactionWithMap();
  }

  /** Interactions with the map */
  interactionWithMap() {
    const positionInfo = this.getPositionInfo(this.row, this.col);
    if (!positionInfo || positionInfo === "grid/floor") {
      return;
    }
    if (positionInfo.startsWith("grid")) {
      interactionWithGrid(positionInfo, this);
    } else if (positionInfo.startsWith("props")) {
      interactionWithProp(positionInfo, this);
    } else if (positionInfo.startsWith("monsters")) {
      interactionWithMonsters(positionInfo, this);
    }
    this.renderPanel();
  }

  // Get Map Html
  getMapHtml() {
    return createGridsHtml(
      /* numRows= */ this.mapSize,
      /* numCols= */ this.mapSize,
      /* gridSize= */ this.gridSize,
      /* left= */ this.mapLeft,
      /* top= */ this.mapTop,
      /* className= */ "",
      /* imgArr= */ this.mapsArr[this.floor]
    );
  }
  // Render map
  renderMap() {
    if (!this.mapObject) {
      return;
    }
    this.mapObject.element.innerHTML = this.getMapHtml();
  }
  // update floor TODO: change it
  updateFloor(direction = "up") {
    if (direction === "up" && this.mapsArr[this.floor + 1]) {
      this.floor++;
    } else if (direction === "down" && this.mapsArr[this.floor - 1]) {
      this.floor--;
    } else {
      return;
    }

    const currentFloor = this.mapsArr[this.floor];
    this.renderMap();
  }

  // Get Brave Html
  getBraveHtml() {
    const position = this.getPosition(this.mapLeft, this.mapTop, this.gridSize);
    return createGridsHtml(
      /* numRows= */ 1,
      /* numCols= */ 1,
      /* gridSize= */ this.gridSize,
      /* left= */ position.left,
      /* top= */ position.top,
      /* className= */ "brave",
      /* imgArr= */ ["brave/down1"],
      /* enableOutline= */ false
    );
  }
  // Render brave
  renderBrave() {
    const braveContentElement = document.querySelector(".braveContent");
    braveContentElement.innerHTML = this.getBraveHtml();
  }

  // initialize Brave and element
  __initializeBraveElement() {
    this.renderBrave();
    this.element = document.querySelector(".brave_0");
  }

  // Fight with monsters, return integer. If can defeat, return health left, else return -1 or any number below or equals 0.
  canDefeat(monster) {
    if (this.attack <= monster.defence) {
      return -1;
    }
    if (this.defence >= monster.attack) {
      return this.life;
    }
    // compute health cost
    const eachAttack = this.attack - monster.defence;
    const times = Math.ceil(monster.life / eachAttack);
    let healthCost = times * (monster.attack - this.defence);
    // add if monster have fixed damage or percent damage
    if (monster.fixDamage) {
      healthCost += monster.fixDamage;
    }
    if (monster.percentDamage) {
      healthCost += Math.ceil(monster.percentDamage * this.life);
    }

    //
    return this.life - healthCost;
  }

  fight(monster) {
    const health = this.canDefeat(monster);
    if (health <= 0) {
      return;
    }
    // update
    this.life = health;
    this.money += monster.money;
    this.exp += monster.exp;
  }
  // panel
  //
  renderPanelBackground() {
    const rows = 11;
    const cols = 5;
    const background = createGridsHtml(
      /* numRows= */ rows,
      /* numCols= */ cols,
      /* gridSize= */ this.gridSize,
      /* left= */ this.mapLeft - 7 * this.gridSize,
      /* top= */ this.mapTop,
      /* className= */ "",
      /* imgArr= */ new Array(cols * rows).fill("grid/floor"),
      true
    );

    const backgroundElement = document.querySelector(".panelBackground");
    backgroundElement.innerHTML = background;
  }
  //
  renderPanel() {
    const panelHtml = createPanelHtml(this);
    const panelEle = document.querySelector(".panel");
    this.renderPanelBackground();
    panelEle.innerHTML = panelHtml;
  }
  //
  logCurrentState() {
    console.log(`
      Yellow key: ${this.yellowKey},
      Blue key: ${this.blueKey},
      Red key: ${this.redKey},
      Life: ${this.life},
      Attack: ${this.attack},
      Defence: ${this.defence},
      Probe: ${this.probe},
      Money: ${this.money},
      Experience: ${this.exp},
    `);
  }
}

export { Brave };
