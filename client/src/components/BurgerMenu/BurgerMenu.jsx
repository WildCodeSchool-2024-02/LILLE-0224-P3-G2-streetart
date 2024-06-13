import { Link } from "react-router-dom";
import "./BurgerMenu.css";
import ImgCross from "../../../public/assets/images/icons/croix.svg";
import { useBurgerMenu } from "../../contexts/BurgerMenuContext";

function BurgerMenu() {
  const { handleCloseMenu } = useBurgerMenu();
  return (
    <div className="burger-menu-container">
      <div className="close-button">
        <button
          className="button-cross"
          onClick={handleCloseMenu}
          type="button"
        >
          <img src={ImgCross} alt="Fermer le menu" className="img-cross" />
        </button>
      </div>
      <div
        className="burger-links"
        onClick={handleCloseMenu}
        role="presentation"
      >
        <Link to="/">Accueil</Link>
        <Link to="/oeuvres">Les oeuvres</Link>
        <Link to="/carte">Roadmap</Link>
        <Link to="/classement">Classement</Link>
        <Link to="/a-propos">A propos</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}

export default BurgerMenu;
