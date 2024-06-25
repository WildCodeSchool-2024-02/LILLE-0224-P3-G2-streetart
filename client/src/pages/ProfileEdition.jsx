import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBadges } from "../contexts/GlobalContext";
import myAxios from "../services/myAxios";
import "./styles/ProfileEdition.css";

function ProfileEdition() {
  const navigate = useNavigate();
  const { member } = useLoaderData();
  // const hidePassword = (password) => "*".repeat(password.length);

  const { getBadgeForPoints } = useBadges();
  const ownBadge = getBadgeForPoints(member.points);

  const [editedCity, setEditedCity] = useState(member.city);
  const [editedPostcode, setEditedPostcode] = useState(member.postcode);
  const [editedEmail, setEditedEmail] = useState(member.email);
  const [editedPwd, setEditedPwd] = useState(member.pwd);

  const [isSubmit, setIsSubmit] = useState(false);

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

          <p className="modify-profil">{member.pseudo}</p>
          <p className="modify-profil">{member.firstname}</p>
          <p className="modify-profil">{member.lastname}</p>
          <div className="modify-profil">
            <div>
              <input
                type="text"
                value={editedCity}
                onChange={(e) => setEditedCity(e.target.value)}
              />
            </div>
          </div>
          <div className="modify-profil">
            <div>
              <input
                type="text"
                value={editedPostcode}
                onChange={(e) => setEditedPostcode(e.target.value)}
              />
            </div>
          </div>
          <div className="modify-profil">
            <div>
              <input
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="modify-profil">
            <div>
              <input
                type="text"
                value={editedPwd}
                onChange={(e) => setEditedPwd(e.target.value)}
              />
            </div>
          </div>
          <p className="modify-profil">{ownBadge ? ownBadge.logo : ""}</p>
          <p className="modify-profil">{member.points} points</p>
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
