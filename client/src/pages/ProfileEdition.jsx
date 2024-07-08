import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../contexts/AuthContext";
import myAxios from "../services/myAxios";
import "./styles/ProfileEdition.css";

function ProfileEdition() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [ member, setMember ] = useState();
  
  const [editedCity, setEditedCity] = useState("");
  const [editedPostcode, setEditedPostcode] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPwd, setEditedPwd] = useState("");
  const [confEditedPwd, setConfEditedPwd] = useState("");
  
  useEffect (
    () => {
      const getData = async () => {
        try {
          const [membersResponse] = await Promise.all([
            myAxios.get(`/api/members/${id}`, {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              }
            }),
          ]);
          setMember(membersResponse.data)
          setEditedCity(membersResponse.data.city)
          setEditedPostcode(membersResponse.data.postcode)
          setEditedEmail(membersResponse.data.email)
        } catch (error) {
          if (error.response.data.access === "denied") {
            navigate("/erreur")
          } 
        }
      }
      getData();
    }, [auth.token, id, navigate]
  )

  const [isSubmit, setIsSubmit] = useState(false);
  
  const [editPwd, setEditPwd] = useState(false);

  const [samePwd, setSamePwd] = useState("");
  const [pwdVisible, setPwdVisible] = useState(false);
  const [confPwdVisible, setConfPwdVisible] = useState(false);

  // TOGGLE EDIT PASSWORD
  const toggleEditPwd = () => {
    setEditPwd(!editPwd);
  };

  // TOGGLE VISIBILITY PASSWORD
  const toggleVisibilityPwd = () => {
    setPwdVisible(!pwdVisible);
  };

  const toggleVisibilityConf = () => {
    setConfPwdVisible(!confPwdVisible);
  };

  const handleUpdateProfile = async (e) => {
    // connection to complete DB with new informations
    e.preventDefault();
    try {
      const response = await myAxios.put(
        `/api/members/edit-member/${member.id_member}`,
        {
          city: editedCity,
          postcode: editedPostcode,
          email: editedEmail,
          pwd: editedPwd,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          }
        }
      );

      if (editedPwd !== "") {
        // PASSWORD VERIFICATION
        if (editedPwd !== confEditedPwd) {
          setSamePwd("Les mots de passe ne correspondent pas");
          return;
        }
        setSamePwd("");
      }

      console.info("Modifications enregistrées", response.data);
      setIsSubmit(true);
      setTimeout(() => {
        navigate(`/profil/${member.id_member}`);
      }, "3000");
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  return (
    <div className="profile-edit-container">
      {member && (
        <div
          key={`${member.firstName} ${member.lastName}`}
          className="profile-edit-box"
        >
          <div className="modify-profil-avatar">
            <img
              className="avatar-profile-edit"
              src={
                member.avatar
                  ? member.avatar
                  : "../../public/assets/images/icons/profile.png"
              }
              alt="profil"
            />
          </div>
          <div className="modify-profil-container">
            <p className="modify-profil">{member.pseudo}</p>
            <p className="modify-profil">{member.firstname}</p>
            <p className="modify-profil">{member.lastname}</p>
          </div>
          <div className="field input-default modify-profil-input">
            <div>
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                value={editedCity}
                onChange={(e) => setEditedCity(e.target.value)}
                className="input-default-edit input-default "
              />
              <div className="line" />
            </div>
          </div>
          <div className="field input-default modify-profil-input">
            <div>
              <label htmlFor="postcode">Code Postal</label>
              <input
                type="text"
                value={editedPostcode}
                onChange={(e) => setEditedPostcode(e.target.value)}
                className="input-default-edit input-default"
              />
              <div className="line" />
            </div>
          </div>
          <div className="field input-default modify-profil-input">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="input-default-edit input-default"
              />
              <div className="line" />
            </div>
          </div>
          <div className="edit-password-pen">
            <div>
              <button
                type="button"
                className="pwd-modify-btn"
                onClick={toggleEditPwd}
              >
                <p className="pwd-modify-btn-text">
                  Modifier mon mot de passe{" "}
                </p>
                <EditIcon style={{ color: "#666", fontSize: 25 }} />
              </button>
            </div>
            {editPwd && (
              <div className="pwd-edit">
                <div className="field input-default modify-profil-input-pwd">
                  <input
                    type={pwdVisible ? "text" : "password"}
                    name="pwd"
                    className="input-default "
                    placeholder="Mot de passe"
                    maxLength="25"
                    value={editedPwd}
                    onChange={(e) => setEditedPwd(e.target.value)}
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
                <div className="field input-default modify-profil-input-pwd">
                  <input
                    type={confPwdVisible ? "text" : "password"}
                    name="confPwd"
                    className="input-default"
                    placeholder="Confirmer le mot de passe"
                    maxLength="25"
                    value={confEditedPwd}
                    onChange={(e) => setConfEditedPwd(e.target.value)}
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
              </div>
            )}
          </div>
          {isSubmit ? <p>Modifications enregistrées</p> : ""}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-modifications"
        onClick={handleUpdateProfile}
      >
        Enregistrer les modifications
      </button>
    </div>
  );
}

export default ProfileEdition;
