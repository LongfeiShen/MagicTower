"strict mode";

class Monster {
  constructor(life, attack, defence, money, exp, imgSrc) {
    this.life = life;
    this.attack = attack;
    this.defence = defence;
    this.money = money;
    this.exp = exp;
    this.imgSrc = `monsters/${imgSrc}`;
  }
}

const monstersData = {
  greenSlime: new Monster(50, 20, 1, 1, 1, "greenSlime"),
  redSlime: new Monster(70, 15, 2, 2, 2, "redSlime"),
  bat: new Monster(100, 20, 5, 3, 3, "bat"),
  skeleton: new Monster(110, 25, 5, 5, 4, "skeleton"),
  blueSlime: new Monster(200, 35, 10, 5, 5, "blueSlime"),
  skeletonS: new Monster(150, 40, 20, 8, 6, "skeletonS"),
  priest: new Monster(125, 50, 25, 10, 7, "priest"),
  bigBat: new Monster(150, 65, 30, 10, 8, "bigBat"),
  zombie: new Monster(300, 75, 45, 13, 10, "zombie"),
  skeletonC: new Monster(400, 90, 50, 15, 12, "skeletonC"),
  rock: new Monster(500, 115, 65, 15, 15, "rock"),
};

const getMonsterSrc = function (name) {
  return monstersData[name].imgSrc;
};
export { getMonsterSrc, monstersData };
