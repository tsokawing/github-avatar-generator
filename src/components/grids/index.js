import style from "./style.css";

const Grids = ({ grids, gridLength, gridSize, handleGridClick }) => {
  return grids ? (
    <div
      id="grids"
      className={style.wrapper}
      style={{ gridTemplateColumns: `repeat(${gridLength}, ${gridSize}px)` }}
    >
      {grids.map((row, i) =>
        row.map((grid, j) => (
          <div
            onClick={() => handleGridClick({ i, j })}
            className={style.square}
            style={{ backgroundColor: grid }}
            key={`${i}-${j}`}
          ></div>
        ))
      )}
    </div>
  ) : (
    <></>
  );
};

export default Grids;
