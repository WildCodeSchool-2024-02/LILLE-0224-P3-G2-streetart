import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../contexts/AuthContext";
import myAxios from "../services/myAxios";
import "./styles/ProfileEdition.css";

function ProfileEdition() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [member, setMember] = useState();

  const [editedCity, setEditedCity] = useState("");
  const [editedPostcode, setEditedPostcode] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [editedPwd, setEditedPwd] = useState("");
  const [confEditedPwd, setConfEditedPwd] = useState("");

  const containerClass = `field input-default modify-profil-input ${emailError ? "modify-profil-input-error" : ""}`;

  useEffect(() => {
    const getData = async () => {
      try {
        const [membersResponse] = await Promise.all([
          myAxios.get(`/api/members/${id}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }),
        ]);
        setMember(membersResponse.data);
        setEditedPostcode(membersResponse.data.postcode);
        setEditedEmail(membersResponse.data.email);

        if (editedPostcode.length !== 5) {
          setEditedCity(membersResponse.data.city);
        }
      } catch (error) {
        if (error.response.data.access === "denied") {
          navigate("/erreur");
        }
      }
    };
    getData();
  }, [auth.token, id, navigate]);

  const [isSubmit, setIsSubmit] = useState(false);

  const [editPwd, setEditPwd] = useState(false);

  const [samePwd, setSamePwd] = useState("");
  const [pwdVisible, setPwdVisible] = useState(false);
  const [confPwdVisible, setConfPwdVisible] = useState(false);
  // ERROR MESSAGE FOR WRONG PASSWORD
  const [pwdError, setPwdError] = useState("");

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

  // POSTCODE GIVE CITY BY API
  const [cities, setCities] = useState([]);

  const handlePostCodeChange = async (e) => {
    const newPostCode = e.target.value;
    setEditedPostcode(newPostCode);

    if (newPostCode.length === 5) {
      try {
        const response = await fetch(
          `https://api.zippopotam.us/fr/${newPostCode}`
        );
        if (response.ok) {
          const data = await response.json();
          const places = data.places.map((place) => place["place name"]);
          setCities(places);
          setEditedCity(places[0]);
        } else {
          setCities([]);
          setEditedCity("");
        }
      } catch (error) {
        setCities([]);
        setEditedCity("");
      }
    }
  };

  // Check Email by regex and stock it
  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      const emailPattern = /^[^\s][\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,3}$/;
      setEmailError(emailPattern.test(value) ? "" : "Adresse email invalide");
    }
    setEditedEmail(value);
  };

  // Check password regex and stock it
  const handleChangePwd = (e) => {
    const { name, value } = e.target;
    if (name === "pwd") {
      const pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      setPwdError(
        pwdPattern.test(value)
          ? ""
          : "Votre mot de passe doit contenir au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial."
      );
    }
    setEditedPwd(value);
  };

  // MODIFY AVATAR
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInput = useRef();
  // Extract and Stock file of avatar
  // const handleFileSelect = (file) => {
  //   setSelectedFile(file)
  // };

  // change picture displayed
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Récupérer le premier fichier sélectionné
    setSelectedFile(file); // App  eler handleFileSelect pour mettre à jour selectedFile
  };

  const handleUpload = async (image) => {
    if (!image) {
      console.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    // SEND DATAFORM to UPLOAD Avatar
    try {
      const response = await myAxios.post("/api/upload/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { data: imageData } = response;
      const { filePath } = imageData;
      // eslint-disable-next-line consistent-return
      return `${filePath}`;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // SEND UPDATE INFORMATIONS
  const handleUpdateProfile = async (e) => {
    // connection to complete DB with new informations
    e.preventDefault();
    const newAvatar = fileInput.current.files[0];
    try {
      // CALL handleUpload for Avatar
      const picture = await handleUpload(newAvatar);
      const response = await myAxios.put(
        `/api/members/edit-member/${member.id_member}`,
        {
          city: editedCity,
          postcode: editedPostcode,
          email: editedEmail,
          pwd: editedPwd,
          picture,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
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
            {selectedFile ? (
              <img
                className="avatar-profile-edit"
                src={URL.createObjectURL(selectedFile)}
                alt="profil"
              />
            ) : (
              <img
                className="avatar-profile-edit"
                src={
                  member.avatar
                    ? member.avatar
                    : "/assets/images/icons/profile.png"
                }
                alt="profil"
              />
            )}
            <div>
              <input
                type="file"
                ref={fileInput}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInput.current.click()}
                className="button-edit-avatar"
                id="fileInput"
              >
                <label htmlFor="fileInput" style={{ display: "none" }}>
                  Edit Avatar
                </label>
                <EditIcon style={{ color: "#666", fontSize: 25 }} />
              </button>
            </div>
          </div>
          <div className="modify-profil-container">
            <p className="modify-profil">{member.pseudo}</p>
            <p className="modify-profil">{member.firstname}</p>
            <p className="modify-profil">{member.lastname}</p>
          </div>
          <div className="field input-default modify-profil-input">
            <div>
              <label htmlFor="postcode">Code Postal</label>
              <input
                type="text"
                value={editedPostcode}
                onChange={handlePostCodeChange}
                className="input-default-edit input-default"
              />
              <div className="line" />
            </div>
          </div>
          <div className="field input-default modify-profil-input">
            <div>
              <label htmlFor="city">Ville</label>
              {editedPostcode !== member.postcode ? (
                <select
                  type="text"
                  value={editedCity}
                  onChange={(e) => setEditedCity(e.target.value)}
                  className="input-default-edit input-default "
                >
                  {cities.map((city) => (
                    <option key={city.id} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={editedCity}
                  onChange={(e) => setEditedCity(e.target.value)}
                  className="input-default-edit input-default "
                />
              )}
              <div className="line" />
            </div>
          </div>
          <div className={containerClass}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                value={editedEmail}
                onChange={handleChangeEmail}
                className="input-default-edit input-default"
              />
              <div className="line" />
              {emailError && <div style={{ color: "red" }}>{emailError}</div>}
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
                    onChange={handleChangePwd}
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
                {pwdError && <p className="error-message">{pwdError}</p>}
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
