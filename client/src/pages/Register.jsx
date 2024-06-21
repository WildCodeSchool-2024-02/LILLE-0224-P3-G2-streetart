import { useState } from "react";
import "./styles/Register.css";
import myAxios from "../services/myAxios";

function Register() {
  const [formData, setFormData] = useState({
    pseudo: "",
    lastname: "",
    firstname: "",
    email: "",
    postcode: "",
    city: "",
    pwd: "",
    confPwd: "",
  });

  const [samePwd, setSamePwd] = useState("");

  const [pwdVisible, setPwdVisible] = useState(false);
  const [confPwdVisible, setConfPwdVisible] = useState(false);

  // TOGGLE VISIBILITY PASSWORD
  const toggleVisibilityPwd = () => {
    setPwdVisible(!pwdVisible);
  };

  const toggleVisibilityConf = () => {
    setConfPwdVisible(!confPwdVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PASSWORD VERIFICATION
    if (formData.pwd !== formData.confPwd) {
      setSamePwd("Les mots de passe ne correspondent pas");
      return;
    }
    setSamePwd("");

    try {
      const response = await myAxios.post("/api/members/new-member", formData);
      console.info("Profil enregistré", response.data);
      // Redirect or other actions after successful registration
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  return (
    <div className="register-container">
      <div className="inscription-img-container">
        <img
          className="inscription-img"
          src="/public/assets/images/inscription-img.png"
          alt="street art représentant un DJ"
        />
      </div>

      <form className="register-formulaire" onSubmit={handleSubmit}>
        <h2 className="register-title">Inscription</h2>

        <div className="field">
          <input
            type="text"
            name="pseudo"
            className="input-default"
            placeholder="Pseudo"
            value={formData.pseudo}
            onChange={handleChange}
            required
          />
          <div className="line" />
        </div>

        <div className="field">
          <input
            type="text"
            name="lastname"
            className="input-default"
            placeholder="Nom"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <div className="line" />
        </div>

        <div className="field">
          <input
            type="text"
            name="firstname"
            className="input-default"
            placeholder="Prénom"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <div className="line" />
        </div>

        <div className="field">
          <input
            type="email"
            name="email"
            className="input-default"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="line" />
        </div>

        <div className="field">
          <input
            type="number"
            name="postcode"
            className="input-default"
            placeholder="Code Postal"
            maxLength="5"
            size={5}
            value={formData.postcode}
            onChange={handleChange}
            required
          />
          <div className="line" />
        </div>

        <div className="field">
          <input
            type="text"
            name="city"
            className="input-default"
            placeholder="Ville"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <div className="line" />
        </div>

        <div className="field field-password input-default">
          <input
            type={pwdVisible ? "text" : "password"}
            name="pwd"
            className="input-default"
            placeholder="Mot de passe"
            maxLength="25"
            value={formData.pwd}
            onChange={handleChange}
            required
          />
          <div className="line" />
          <div className="password-visible">
            {pwdVisible ? (
              <img
                src="/assets/images/icons/oeil-barre.png"
                className="eye-pwd"
                role="presentation"
                onClick={toggleVisibilityPwd}
                alt="oeil barré pour cacher le mot de passe"
              />
            ) : (
              <img
                src="/assets/images/icons/oeil-ouvert.png"
                className="eye-pwd"
                role="presentation"
                onClick={toggleVisibilityPwd}
                alt="oeil ouvert pour afficher le mot de passe"
              />
            )}
          </div>
        </div>

        <div className="field field-password input-default">
          <input
            type={confPwdVisible ? "text" : "password"}
            name="confPwd"
            className="input-default"
            placeholder="Confirmer le mot de passe"
            maxLength="25"
            value={formData.confPwd}
            onChange={handleChange}
            required
          />
          <div className="password-visible">
            {confPwdVisible ? (
              <img
                src="/assets/images/icons/oeil-barre.png"
                className="eye-pwd"
                role="presentation"
                onClick={toggleVisibilityConf}
                alt="oeil barré pour cacher le mot de passe"
              />
            ) : (
              <img
                src="/assets/images/icons/oeil-ouvert.png"
                className="eye-pwd"
                role="presentation"
                onClick={toggleVisibilityConf}
                alt="oeil ouvert pour afficher le mot de passe"
              />
            )}
          </div>
          <div className="line" />
        </div>

        {samePwd && <div className="error-message">{samePwd}</div>}
        <button type="submit" className="btn">
          M'inscrire
        </button>
      </form>
    </div>
  );
}

export default Register;
