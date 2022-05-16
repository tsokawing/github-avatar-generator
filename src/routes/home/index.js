import { h } from "preact";
import Grids from "../../components/grids";
import style from "./style.css";

const Home = () => {
  return (
    <div class={style.home}>
      <h1>Make Your Favourite GitHub Style Avatar!</h1>
      <p>Each avator is 420x420, 5x5-bit and symmetric.</p>
      <Grids />
    </div>
  );
};

export default Home;
