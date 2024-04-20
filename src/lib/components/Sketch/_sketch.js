import p5 from "p5";
import Vis1 from "./Vis1";
import Vis2 from "./Vis2";
import Vis3 from "./Vis3";
import Vis4 from "./Vis4";

const COLORS = ["#eb3510", "#367cff", "#ffffff", "#62C370"];
const SEED = Math.floor(Math.random() * 10000);
const VIS_OPTIONS = [Vis1, Vis2, Vis3];

export const initSketch = (el) => {
  return new p5(sketch, el);
};

const sketch = (p) => {
  let { clientWidth, clientHeight } = p._userNode;

  let cells;
  let xOffset;
  let yOffset;
  let cellSize;
  let usedCell;

  p.setup = () => {
    p.createCanvas(clientWidth, clientHeight);
    p.randomSeed(SEED);
    p.noiseSeed(SEED);

    init();
  };

  p.draw = () => {
    p.background(0);

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];

      cell.run();
    }
  };

  p.windowResized = () => {
    clientWidth = p._userNode.clientWidth;
    clientHeight = p._userNode.clientHeight;

    p.resizeCanvas(clientWidth, clientHeight);

    init();
  };

  const init = () => {
    cells = [];
    usedCell = new Set();

    const gridDimensionsMax = 15;
    cellSize = Math.max(p.width, p.height) / gridDimensionsMax;

    const gridDimensionsAlt = Math.floor(
      Math.min(p.width, p.height) / cellSize
    );

    const gridX = p.width > p.height ? gridDimensionsMax : gridDimensionsAlt;
    const gridY = p.width > p.height ? gridDimensionsAlt : gridDimensionsMax;

    xOffset = (p.width - gridX * cellSize) / 2;
    yOffset = (p.height - gridY * cellSize) / 2;

    for (let yi = 0; yi < gridY; yi++) {
      for (let xi = 0; xi < gridX; xi++) {
        if (usedCell.has(`${xi}-${yi}`)) continue;

        let scale = Math.random() < 0.085 ? 2 : 1;

        if (scale === 2) {
          // cell is in last row or column
          if (xi === gridX - 1 || yi === gridY - 1) {
            scale = 1;
          }

          // cell is next to a cell with scale 2
          if (
            usedCell.has(`${xi + 1}-${yi}`) ||
            usedCell.has(`${xi}-${yi + 1}`)
          ) {
            scale = 1;
          }
        }

        if (scale === 2) {
          usedCell.add(`${xi}-${yi}`);
          usedCell.add(`${xi + 1}-${yi}`);
          usedCell.add(`${xi}-${yi + 1}`);
          usedCell.add(`${xi + 1}-${yi + 1}`);
        }

        const vis = p.random(VIS_OPTIONS);

        cells.push(
          new vis(
            p,
            xi,
            yi,
            cellSize,
            xOffset,
            yOffset,
            p.color(p.random(COLORS)),
            cellSize * 0.03,
            scale,
            p.int(p.random(4)) * (p.TAU / 4)
          )
        );
      }
    }
  };
};
