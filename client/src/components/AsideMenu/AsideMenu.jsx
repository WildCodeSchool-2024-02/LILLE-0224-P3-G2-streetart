import { Link } from "react-router-dom";
import "./AsideMenu.css";
import { useAuth } from "../../contexts/AuthContext";

function AsideMenu() {

  const { auth, logout } = useAuth();

  return (
    <aside className="aside-menu-container">
      <div className="aside-menu" role="presentation">
        <div className="aside-menu-top">
          <Link to="/">Accueil</Link>
          <Link to="/oeuvres">Les oeuvres</Link>
          <Link to="/carte">Roadmap</Link>
          <Link to="/classement">Classement</Link>
          {
            auth.account &&
            <>
          <Link to={`/profil/${auth.account.id_member}`}>Profil</Link>
          <button type="button" onClick={logout}>Deconnexion</button>
            </>
          }
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
