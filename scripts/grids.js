"strict mode";

const createGridsHtml = function (
  numRows,
  numCols,
  gridSize,
  left,
  top,
  classPrefix,
  imgArr,
  enableOutline = true
) {
  let gridHtml = "";
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const leftPos = col * gridSize + left;
      const topPos = row * gridSize + top;
      const outline = enableOutline
        ? outlineStyle(row, numRows, col, numCols)
        : "";

      const index = row * numCols + col;
      const imgSrc = imgArr ? imgArr[index] : "grid/brick"; // default grid/brick.png

      gridHtml += createImageHtml(
        gridSize,
        leftPos,
        topPos,
        `${classPrefix}_${index}`,
        imgSrc,
        outline
      );
    }
  }
  return gridHtml;
};

const createImageHtml = (
  gridSize,
  leftPos,
  topPos,
  className,
  imgSrc,
  outline
) => {
  return `<img
    class="${className}"
    src="images/${imgSrc}.png"
    alt="brick"
    style="
      width: ${gridSize}px;
      height: ${gridSize}px;
      position: absolute;
      left: ${leftPos}px;
      top: ${topPos}px;
      ${outline};
    "
  />`;
};

const outlineStyle = function (row, numRows, col, numCols) {
  let outline = "box-shadow: ";
  if (col == 0) {
    outline += "-5px 0px 2px orange,";
  }
  if (col == numCols - 1) {
    outline += "5px 0px 2px orange,";
  }
  if (row == 0) {
    outline += "0px -5px 2px orange,";
  }
  if (row == numRows - 1) {
    outline += "0px 5px 2px orange,";
  }

  if (outline.endsWith(",")) {
    outline = outline.slice(0, -1);
  }
  return outline;
};

export { createGridsHtml };
