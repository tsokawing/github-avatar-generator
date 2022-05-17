import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

import Grids from "../../components/grids";
import style from "./style.css";

import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

// Default GitHub style
const GRID_OFF_COLOR = "#F0F0F0";
const GRID_ON_COLOR = "#E894BC";
const GRID_LENGTH = 5;
const GRID_SIZE = 70;

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

  useEffect(() => {
    setGrids(makeRandomGrids());
    console.log(grids);
  }, []);

  return (
    <div class={style.home}>
      <h1>Make Your Favourite GitHub Style Avatar!</h1>
      <p>Each avator is 420x420, 5x5-bit and symmetric.</p>
      <main>
        <Grids grids={grids} gridLength={GRID_LENGTH} gridSize={GRID_SIZE} />
        <section>
          <button onClick={downloadAvatarImage}>Download</button>
          <button onClick={() => setGrids(makeRandomGrids())}>
            Regenerate
          </button>
        </section>
      </main>
    </div>
  );
};

export default Home;
