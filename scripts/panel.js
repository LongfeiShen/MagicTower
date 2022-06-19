"strict mode";

const createPanelHtml = function (brave) {
  let panel = `<div class="panelContent" style="position: absolute;left:${
    brave.mapLeft - 6.5 * brave.gridSize
  }px;top:${brave.mapTop - 20}px;">`;
  panel += createDetail("Health", brave.life);
  panel += createDetail("Attack", brave.attack);
  panel += createDetail("Defence", brave.defence);
  panel += createDetail("Money", brave.money);
  panel += createDetail("Exp", brave.exp);
  panel += createKey("yellowkey", brave.yellowKey, brave);
  panel += createKey("bluekey", brave.blueKey, brave);
  panel += createKey("redkey", brave.redKey, brave);
  return panel + "</div>";
};

const createDetail = function (name, number) {
  return `<div class="panelDetail"><p>${name}</p><p>${number}</p></div>`;
};

const createKey = function (imgSrc, number, brave) {
  return `<div class="panelKey"><img src="images/props/${imgSrc}.png" style="width:${brave.gridSize}px;height:${brave.gridSize}px" alt="key"/>  <p>${number}</p></div>`;
};

export { createPanelHtml };
