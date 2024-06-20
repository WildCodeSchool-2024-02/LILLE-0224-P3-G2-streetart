import { Link } from "react-router-dom";
import { useBurgerMenu } from "../../contexts/BurgerMenuContext";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import "./NavBarBottom.css";
import ImgMenu from "../../../public/assets/images/icons/hamburger_icon.svg";

function NavBarBottom() {
  const { isMenuOpen, handleOpenMenu } = useBurgerMenu();
  return (
    <div className="menu-bottom-container">
      {isMenuOpen && <BurgerMenu />}
      <div className="menu-bottom">
        <button onClick={handleOpenMenu} type="button">
          <img src={ImgMenu} alt="Ouvrir le menu" className="img-hamburger" />
        </button>
        <button type="button">
          <img
            src="/assets/images/icons/appareil_photo.png"
            alt="Ouvrir l'appareil"
            className="img-appareil"
          />
        </button>
        <Link to="/profil/2">
          <img
            id="img-profile"
            src="/assets/images/icons/profile.png"
            alt="Acceder au profil"
          />
        </Link>
      </div>
    </div>
  );
}

export default NavBarBottom;
