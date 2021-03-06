import { h } from "preact";
import { useEffect, useState, useCallback } from "preact/hooks";

import Grids from "../../components/grids";
import style from "./style.css";
import "./style.css";

import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { HexColorPicker } from "react-colorful";

// Default GitHub style
const GRID_OFF_COLOR = "#F0F0F0";
const GRID_ON_COLOR = "#E894BC";
const GRID_LENGTH = 5;
const GRID_SIZE = 70;

const makeEmptyGrids = (
  gridOffColor = GRID_OFF_COLOR,
  gridLength = GRID_LENGTH
) => {
  let grids = Array(gridLength)
    .fill()
    .map((row) => Array(gridLength));

  for (let i = 0; i < gridLength; i++) {
    for (let j = 0; j < gridLength; j++) {
      grids[i][j] = gridOffColor;
    }
  }
  return grids;
};

const makeRandomGrids = (
  gridOnColor = GRID_ON_COLOR,
  gridOffColor = GRID_OFF_COLOR,
  gridLength = GRID_LENGTH
) => {
  // Init empty grid array
  let grids = Array(gridLength)
    .fill()
    .map((row) => Array(gridLength));

  // Fill the left side of the avatar with random grid
  for (let i = 0; i < gridLength; i++) {
    for (let j = 0; j < Math.ceil(gridLength / 2); j++) {
      const random = Math.random();

      grids[i][j] = Math.random() < 0.5 ? gridOnColor : gridOffColor;
    }
  }

  // Mirror the left side to the right to make a symmetical avatar
  for (let i = 0; i < gridLength; i++) {
    for (let j = 0; j < Math.floor(gridLength / 2); j++) {
      grids[i][gridLength - 1 - j] = grids[i][j];
    }
  }

  return grids;
};

const downloadAvatarImage = () => {
  domtoimage.toBlob(document.getElementById("grids")).then((blob) => {
    window.saveAs(blob, "avatar.png");
  });
};

const Home = () => {
  const [grids, setGrids] = useState([[]]);
  const [gridOnColor, setGridOnColor] = useState(GRID_ON_COLOR);

  useEffect(() => {
    setGrids(makeRandomGrids(gridOnColor));
  }, []);

  // Toggle grid cell color between on/off on click
  const handleGridClick = useCallback(
    ({ i, j }) => {
      let newGrids = [...grids];
      newGrids[i][j] =
        newGrids[i][j] === gridOnColor ? GRID_OFF_COLOR : gridOnColor;
      setGrids(newGrids);
    },
    [grids]
  );

  // Update color for all initialized grids
  useEffect(() => {
    if (grids.length !== GRID_LENGTH) return;

    let newGrids = [...grids];
    for (let i = 0; i < newGrids.length; i++) {
      for (let j = 0; j < newGrids.length; j++) {
        if (newGrids[i][j] !== GRID_OFF_COLOR) {
          newGrids[i][j] = gridOnColor;
        }
      }
    }
    setGrids(newGrids);
  }, [gridOnColor]);

  return (
    <div class={style.home}>
      <main class={style.editor}>
        <div class={style.avatar}>
          <Grids
            grids={grids}
            gridLength={GRID_LENGTH}
            gridSize={GRID_SIZE}
            handleGridClick={handleGridClick}
          />
        </div>
        <div>
          <h1 class={style.title}>Make Your Own GitHub Style Avatar!</h1>
          <p class={style.descriptions}>
            Generate random avatar or click on the grids to edit your own
            design! Each avatar is a 420x420px image with a border of 35px.
          </p>
          <section class={style.toolbar}>
            <HexColorPicker color={gridOnColor} onChange={setGridOnColor} />

            <div class={style.buttons}>
              <button onClick={() => setGrids(makeRandomGrids(gridOnColor))}>
                Random
              </button>
              <button onClick={() => setGrids(makeEmptyGrids())}>Clear</button>
              <button onClick={downloadAvatarImage}>Download</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
