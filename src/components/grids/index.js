import style from "./style.css";

const Grids = ({ grids, setGrids, gridLength, gridSize }) => {
  return grids ? (
    <div
      id="grids"
      className={style.wrapper}
      style={{ gridTemplateColumns: `repeat(${gridLength}, ${gridSize}px)` }}
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
