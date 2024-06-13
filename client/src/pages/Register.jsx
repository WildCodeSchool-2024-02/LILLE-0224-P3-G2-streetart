import "./styles/Register.css";

function Register() {
  return (
    <div className="register-container">
      <div className="inscription-img-container">
        <img
          className="inscription-img"
          src="/public/assets/images/inscription-img.png"
          alt="street art représentant un DJ"
        />
      </div>
      <form className="register-formulaire">
        <h2 className="register-title">Inscription</h2>
        <div className="field">
          <input type="text" className="input" placeholder="Pseudo" />
          <div className="line" />
        </div>

        <div className="field">
          <input type="text" className="input" placeholder="Nom" />
          <div className="line" />
        </div>
        <div className="field">
          <input type="text" className="input" placeholder="Prénom" />
          <div className="line" />
        </div>

        <div className="field">
          <input type="email" className="input" placeholder="Email" />
          <div className="line" />
        </div>
        <div className="field">
          <input type="number" className="input" placeholder="Code Postal" />
          <div className="line" />
        </div>
        <div className="field">
          <input type="text" className="input" placeholder="Ville" />
          <div className="line" />
        </div>
        <div className="field">
          <input type="password" className="input" placeholder="Mot de passe" />
          <div className="line" />
        </div>
        <div className="field">
          <input
            type="password"
            className="input"
            placeholder="Confirmer le mot de passe"
          />
          <div className="line" />
        </div>
        <button type="button" className="btn">
          M'inscrire
        </button>
      </form>
    </div>
  );
}

export default Register;
