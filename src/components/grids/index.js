import { useEffect, useState } from "preact/hooks";
import style from "./style.css";

import { captureAvatarImage } from "../../services/images";

// Default GitHub style
const GRID_OFF_COLOR = "#F0F0F0";
const GRID_ON_COLOR = "#E894BC";
const GRID_SIZE = 5;

const makeRandomGrids = (
  gridOnColor = GRID_ON_COLOR,
  gridOffColor = GRID_OFF_COLOR,
  gridSize = GRID_SIZE
) => {
  // Init empty grid array
  let grids = Array(gridSize)
    .fill()
    .map((row) => Array(gridSize));

  // Fill the left side of the avatar with random grid
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < Math.ceil(gridSize / 2); j++) {
      const random = Math.random();

      grids[i][j] = Math.random() < 0.5 ? gridOnColor : gridOffColor;
    }
  }

  // Mirror the left side to the right to make a symmetical avatar
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < Math.floor(gridSize / 2); j++) {
      grids[i][gridSize - 1 - j] = grids[i][j];
    }
  }

  return grids;
};

const Grids = () => {
  const [grids, setGrids] = useState([[]]);

  useEffect(() => {
    setGrids(makeRandomGrids());
    captureAvatarImage();
  }, []);

  return grids ? (
    <div
      id="grids"
      className={style.wrapper}
      style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 70px)` }}
    >
      {grids.map((row) =>
        row.map((grid) => (
          <div className={style.square} style={{ backgroundColor: grid }}></div>
        ))
      )}
    </div>
  ) : (
    <></>
  );
};

export default Grids;
