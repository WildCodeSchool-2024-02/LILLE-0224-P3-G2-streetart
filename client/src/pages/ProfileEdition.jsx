import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useBadges } from "../contexts/GlobalContext";
import myAxios from "../services/myAxios";
import "./styles/ProfileEdition.css";

function ProfileEdition() {
  const { member } = useLoaderData();
  // const hidePassword = (password) => "*".repeat(password.length);

  const { getBadgeForPoints } = useBadges();
  const ownBadge = getBadgeForPoints(member.points);

  // Modify field of city
  // the field become an input if it's true
  const [isEditingCity, setIsEditingCity] = useState(false);
  // the input field contain initial user informations
  const [editedCity, setEditedCity] = useState(member.city);

  const handleEditCity = () => {
    if (isEditingCity) {
      setIsEditingCity(false);
    } else {
      setIsEditingCity(true);
    }
    setEditedCity(member.city);
  };

  // Modify field of postcode
  const [isEditingPostcode, setIsEditingPostcode] = useState(false);
  const [editedPostcode, setEditedPostcode] = useState(member.postcode);

  const handleEditPostcode = () => {
    if (isEditingPostcode) {
      setIsEditingPostcode(false);
    } else {
      setIsEditingPostcode(true);
    }
    setEditedPostcode(member.postcode);
  };

  // Modify field of email
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState(member.email);

  const handleEditEmail = () => {
    if (isEditingEmail) {
      setIsEditingEmail(false);
    } else {
      setIsEditingEmail(true);
    }
    setEditedEmail(member.email);
  };

  // Modify field of pwd
  const [isEditingPwd, setIsEditingPwd] = useState(false);
  const [editedPwd, setEditedPwd] = useState(member.pwd);

  const handleEditPwd = () => {
    if (isEditingPwd) {
      setIsEditingPwd(false);
    } else {
      setIsEditingPwd(true);
    }
    setEditedPwd(member.pwd);
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
        }
      );
      member.city = editedCity;
      member.postcode = editedPostcode;
      member.email = editedEmail;
      member.pwd = editedPwd;

      // update input field in fix field
      setIsEditingCity(false);
      setIsEditingPostcode(false);
      setIsEditingEmail(false);
      setIsEditingPwd(false);

      console.info("Modifications enregistrées", response.data);
      // Mettre à jour les données du membre avec les informations modifiées
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
            <p>
              {" "}
              <img
                className="pen-edit"
                src="/assets/images/icons/edit.png"
                alt="crayon pour modifier les infos du profil"
              />
            </p>
          </div>

          <p className="modify-profil">{member.pseudo}</p>
          <p className="modify-profil">{member.firstname}</p>
          <p className="modify-profil">{member.lastname}</p>
          <div className="modify-profil">
            {isEditingCity ? (
              <div>
                <input
                  type="text"
                  value={editedCity}
                  onChange={(e) => setEditedCity(e.target.value)}
                />
              </div>
            ) : (
              <p onClick={handleEditCity} role="presentation">
                {member.city}{" "}
              </p>
            )}

            <img
              className="pen-edit"
              src="/assets/images/icons/edit.png"
              alt="crayon pour modifier les infos du profil"
              onClick={handleEditCity}
              role="presentation"
            />
          </div>
          <div className="modify-profil">
            {isEditingPostcode ? (
              <div>
                <input
                  type="text"
                  value={editedPostcode}
                  onChange={(e) => setEditedPostcode(e.target.value)}
                />
              </div>
            ) : (
              <p onClick={handleEditPostcode} role="presentation">
                {member.postcode}
              </p>
            )}
            <img
              className="pen-edit"
              src="/assets/images/icons/edit.png"
              alt="crayon pour modifier les infos du profil"
              onClick={handleEditPostcode}
              role="presentation"
            />
          </div>
          <div className="modify-profil">
            {isEditingEmail ? (
              <div>
                <input
                  type="text"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              </div>
            ) : (
              <p onClick={handleEditEmail} role="presentation">
                {member.email}
              </p>
            )}
            <img
              className="pen-edit"
              src="/assets/images/icons/edit.png"
              alt="crayon pour modifier les infos du profil"
              onClick={handleEditEmail}
              role="presentation"
            />
          </div>
          <div className="modify-profil">
            {isEditingPwd ? (
              <div>
                <input
                  type="text"
                  value={editedPwd}
                  onChange={(e) => setEditedPwd(e.target.value)}
                />
              </div>
            ) : (
              <p onClick={handleEditPwd} role="presentation">
                {member.pwd}
              </p>
            )}
            <img
              className="pen-edit"
              src="/assets/images/icons/edit.png"
              alt="crayon pour modifier les infos du profil"
              onClick={handleEditPwd}
              role="presentation"
            />
          </div>
          <p className="modify-profil">{ownBadge ? ownBadge.logo : ""}</p>
          <p className="modify-profil">{member.points} points</p>
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
