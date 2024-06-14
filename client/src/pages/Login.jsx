import { Link } from "react-router-dom";
import "./styles/Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-img-container">
        <img
          className="login-img"
          src="/public/assets/images/login-img.png"
          alt="street art représentant un DJ"
        />
      </div>
      <form className="login-formulaire">
        <div className="connexion-field">
          <h2 className="login-title">Connexion</h2>
          <div className="field">
            <input type="text" className="input-default" placeholder="Pseudo" />
            <div className="line" />
          </div>
          <div className="field">
            <input
              type="password"
              className="input-default"
              placeholder="Mot de passe"
            />
            <div className="line" />
          </div>
          <button type="button" className="btn">
            Me connecter
          </button>
        </div>
        <div className="inscription-field">
          <Link to="/inscription" className="link-inscription">
            Pas encore inscrit ? C'est par ici
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
