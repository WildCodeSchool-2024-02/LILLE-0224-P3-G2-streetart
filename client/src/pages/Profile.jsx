import EditIcon from "@mui/icons-material/Edit";
import { useLoaderData, Link } from "react-router-dom";
import { useBadges } from "../contexts/GlobalContext";
import "./styles/Profile.css";
import ArtworkCard from "../components/ArtworkCard/ArtworkCard";

function Profile() {
  const { member, memberArtworks } = useLoaderData();

  const { getBadgeForPoints } = useBadges();
  const ownBadge = getBadgeForPoints(member.points);

  return (
    <div className="profile-container">
      {member && (
        <div
          className="my-profile"
          key={`${member.firstName} ${member.lastName}`}
        >
          <div className="top-profile">
            <img
              className="image-profile"
              src={
                member.avatar
                  ? member.avatar
                  : "../../public/assets/images/icons/profile.png"
              }
              alt="profil"
            />

            <div className="points-edit-mobile">
              <Link to={`/profil/edit/${member.id_member}`}>
                <EditIcon style={{ color: "#666", fontSize: 35 }} />
              </Link>
              <div className="level-points">
                <p>{ownBadge ? ownBadge.logo : ""}</p>
                <p>{member.points} points</p>
              </div>
            </div>
          </div>
          <div className="info-desktop">
            <div className="info-profile">
              <p>{member.pseudo}</p>
              <p>
                {member.firstname} {member.lastname}
              </p>
              <p>{member.email}</p>
              <p>
                {member.postcode} {member.city}
              </p>
            </div>
            <div className="points-edit-desktop">
              <Link to={`/profil/edit/${member.id_member}`}>
                <EditIcon style={{ color: "#666", fontSize: 35 }} />
              </Link>
              <div className="level-points">
                <p>{ownBadge ? ownBadge.logo : ""}</p>
                <p>{member.points} point</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="my-artworks">
        <div className="title-my-artworks">
          <h2>Mes oeuvres</h2>
        </div>
        <div className="artworks-profile">
          {memberArtworks.length > 0 ? (
            memberArtworks.slice(0, 4).map((memberArtwork, index) => (
              <div
                key={memberArtwork.id_artwork}
                className={index === 3 ? "artwork4" : "artwork-profile"}
              >
                <ArtworkCard artwork={memberArtwork} />
              </div>
            ))
          ) : (
            <p>Tu n'as posté aucune oeuvre pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
