import { useEffect, useState } from "preact/hooks";
import style from "./style.css";

// Default GitHub style
const GRID_OFF_COLOR = "#F0F0F0";
const GRID_SIZE = 5;

const makeRandomGrids = (
  gridOnColor = "#E894BC",
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
  }, []);

  return grids ? (
    <div
      className={style.wrapper}
      style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
    >
      {grids.map((row) =>
        row.map((grid) => (
          <div className={style.square} style={{ backgroundColor: grid }}>
            {grid}
          </div>
        ))
      )}
    </div>
  ) : (
    <></>
  );
};

export default Grids;
