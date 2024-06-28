import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./styles/Login.css";
import myAxios from "../services/myAxios";

function Login() {

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdVisible, setPwdVisible] = useState("password");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePwd = (e) => {
    setPwd(e.target.value)
  }

  // TOGGLE VISIBILITY PASSWORD
  const toggleVisibilityPwd = () => {
    if (pwdVisible === "password") {
      setPwdVisible("text");
    } else {
      setPwdVisible("password")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // API call to request a connection
        const response = await myAxios.post(
          `/api/login`,
          {
            email,
            pwd
          },
          {
            headers: { "Content-Type": "application/json" }
          }
        );
        
        if (response.status === 200) {

          const { token, account } = response.data;

          // Store the token and account information in localStorage
          Cookies.set('authToken', token, { expires: 1 / 24 }); // Expires in 1 hour
          Cookies.set('account', JSON.stringify(account), { expires: 1 / 24 }); // Expires in 1 hour
          
          setAuth({ token, account });
          navigate(`/profil/${account.id_member}`);
        } else {
          console.info(response);
        }
      } catch (err) {
        console.error(err);
      }
}

  return (
    <div className="login-container">
      <div className="login-img-container">
        <img
          className="login-img"
          src="/public/assets/images/login-img.png"
          alt="street art représentant un DJ"
        />
      </div>
      <form onSubmit={handleSubmit} className="login-formulaire">
        <div className="connexion-field">
          <h2 className="login-title">Connexion</h2>
          <div className="field">
            <input type="email" className="input-default" placeholder="E-mail" onChange={handleChangeEmail} value={email}/>
            <div className="line" />
          </div>
          <div className="field field-password input-default">
          <input
            type={pwdVisible}
            name="pwd"
            className="input-default"
            placeholder="Mot de passe"
            maxLength="25"
            value={pwd}
            onChange={handleChangePwd}
            required
          />
          <div className="line" />
          <div className="password-visible">
            {pwdVisible === "text" ? (
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
          <button type="submit" className="btn">
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
