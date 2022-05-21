import { h } from "preact";
import style from "./style.css";
import logo from "../../assets/icons/android-chrome-192x192.png";

const Header = () => (
  <header class={style.header}>
    <img src={logo} alt="logo" class={style.logo} />
    <h1>GitHub Avatar Generator</h1>
  </header>
);

export default Header;
