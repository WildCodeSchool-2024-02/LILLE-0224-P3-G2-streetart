import { Link } from "react-router-dom";
import "./AsideMenu.css";

function AsideMenu() {
  return (
    <aside className="aside-menu-container">
      <div className="aside-menu" role="presentation">
        <div className="aside-menu-top">
          <Link to="/">Accueil</Link>
          <Link to="/oeuvres">Les oeuvres</Link>
          <Link to="/carte">Roadmap</Link>
          <Link to="/classement">Classement</Link>
          <Link to="/profil/2">Profil</Link>
        </div>
        <div className="aside-menu-bottom">
          <Link to="/a-propos">A propos</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </aside>
  );
}

export default AsideMenu;
