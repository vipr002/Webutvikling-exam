import { Link } from "react-router-dom";
import { useState } from "react";
import ErrorToast from "./ErrorToast";
import logo from "../../assets/f1_logo.svg";
import { List } from "react-bootstrap-icons";

const MainNavigation = () => {
  const [menu, setMenu] = useState("hideMenu");
  // Funksjon for å vise / skjule hamburgermenyen ved hjelp av className
  const toggleHamburger = () => {
    if (menu !== "showMenu") setMenu("showMenu");
    else setMenu("hideMenu");
  };
  return (
    <>
      <header>
        <img src={logo} alt="Formula 1 logo" className="logoImg" />

        <div className={`navHeader ${menu}`}>
          <Link to="/" className="navItem">
            Home
          </Link>

          <Link to="drivers" className="navItem">
            Drivers
          </Link>

          <Link to="races" className="navItem">
            Races
          </Link>

          <Link to="teams" className="navItem">
            Teams
          </Link>

          <Link to="game" className="navItem">
            Game
          </Link>
        </div>
        <List
          size={50}
          color="white"
          className="hamburgerIcon"
          onClick={toggleHamburger}
        />
      </header>
      <ErrorToast />
    </>
  );
};

export default MainNavigation;
