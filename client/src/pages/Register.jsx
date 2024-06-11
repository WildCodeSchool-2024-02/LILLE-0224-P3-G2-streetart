import "./styles/Register.css";

function Register() {
  return (
    <div className="register-container">
      <h2 className="register-title">Inscription</h2>
      <form className="register-formulaire">
        <div className="field">
          <input type="text" className="input" placeholder="Pseudo" />
          <div className="line" />
        </div>
        <div className="field">
          <input type="text" className="input" placeholder="Mot de passe" />
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
          <input
            type="text"
            className="input"
            placeholder="Date de naissance"
          />
          <div className="line" />
        </div>
        <div className="field">
          <input type="text" className="input" placeholder="Email" />
          <div className="line" />
        </div>
        <div className="field">
          <input type="text" className="input" placeholder="Code Postal" />
          <div className="line" />
        </div>
        <div className="field">
          <input type="text" className="input" placeholder="Ville" />
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
