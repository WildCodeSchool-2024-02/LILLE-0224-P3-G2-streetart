import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import myAxios from "../services/myAxios";

function PwdEdition() {

    const { token } = useParams();
    const navigate = useNavigate();
    const [pwd, setPwd] = useState("");
    const [confPwd, setConfPwd] = useState("");
    const [status, setStatus] = useState("");
    const [editionSent, setEditionSent] = useState(false);
    const [errorEdition, setErrorEdition] = useState(false);

    useEffect(
        () => {
            const verifyToken = async () => {
                try {
                    const response = await myAxios.get(
                    `/api/recover/verify-reset-token/${token}`,
                    {
                    token,
                    });
                    console.info(response.data)
                } catch (error) {
                    console.error(error)
                    navigate("/")
                }
            }
            verifyToken();
        }, [token, navigate]        
    )

    const handleChangePwd = (e) => {
        setPwd(e.target.value)
    }

    const handleChangeConfPwd = (e) => {
        setConfPwd(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(pwd === confPwd) {
            try {
                // API call to request a connection
                const response = await myAxios.post(
                  `/api/recover/${token}`,
                  {
                    pwd,
                  });
                console.info(response.data.message);
                setEditionSent(true);
                setStatus(response.data.message);
              } catch (err) {
                console.error(err);
                setEditionSent(true);
                setErrorEdition(true);
                setStatus(err.response.data.message);
              }
        } else {
            setStatus("Les mots de passes ne correspondent pas.")
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
            {editionSent ?
            <h2>{status} {errorEdition && <Link to="/contact">support.</Link>}</h2>
            :
            <form onSubmit={handleSubmit} className="login-formulaire">
                <h2 className="login-title">Récupération de mot de passe</h2>
                <div className="field">
                    <input className="input-default" type="text" value={pwd} onChange={handleChangePwd} placeholder="Saisissez votre nouveau mot de passe"/>
                    <div className="line"/>
                </div>
                <div className="field">
                    <input className="input-default" type="text" value={confPwd} onChange={handleChangeConfPwd} placeholder="Confirmez votre nouveau mot de passe"/>
                    <div className="line"/>
                </div>
                <button type="submit" className="btn">Confirmer</button>
                {status && <p>{status}</p>}
            </form>
            }
        </div>
    )
}

export default PwdEdition;