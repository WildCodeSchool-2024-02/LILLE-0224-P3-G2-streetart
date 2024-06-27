import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBadges } from "../contexts/BadgeContext";
import "./styles/Profile.css";
import ArtworkCard from "../components/ArtworkCard/ArtworkCard";
import myAxios from "../services/myAxios";

function Profile() {
  const { id } = useParams();
  const { auth } = useAuth();
  const [ artworks, setArtworks ] = useState([]);
  const [ profile, setProfile ] = useState();

  const hidePassword = (password) => "*".repeat(password.length);

  useEffect(
    () => {
      const getData = async () => {
        const [artworksResponse, membersResponse] = await Promise.all([
          myAxios.get(`/api/artworks/profile/${id}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            }
          }),
          myAxios.get(`/api/members/${id}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            }
          }),
        ]);
  
        setArtworks(artworksResponse.data);
        setProfile(membersResponse.data);
        
      }

      getData();
    }, [auth.token, id]
  )

  const { getBadgeForPoints } = useBadges();
  const ownBadge = getBadgeForPoints(member.points);

  return (
    <div className="profile-container">
      {profile && (
        <div
          className="my-profile"
          key={`${profile.firstName} ${profile.lastName}`}
        >
          <div className="top-profile">
            <div className="img-profile">
              <img
                className="image-profile"
                src={
                  member.avatar
                    ? member.avatar
                    : "../../public/assets/images/icons/profile.png"
                }
                alt="profil"
              />
              <p className="pseudo-profile">{profile.pseudo}</p>
            </div>
            <div className="points-edit-mobile">
              <img
                className="edit-profile"
                src="/assets/images/icons/edit.png"
                alt="crayon pour modifier les infos du profil"
              />
              <div className="level-points">
                <p>{ownBadge ? ownBadge.logo : ""}</p>
                <p>{profile.points} points</p>
              </div>
            </div>
          </div>
          <div className="info-desktop">
            <div className="info-profile">
              <p>
                {profile.firstName} {profile.lastName}
              </p>
              <p>{profile.email}</p>
              <p>
                {profile.postcode} {profile.city}
              </p>
              <p>{hidePassword(profile.pwd)}</p>
            </div>
            <div className="points-edit-desktop">
              <Link to={`/profil/edit/${member.id_member}`}>
                <div>
                  <img
                    className="edit-profile-desktop"
                    src="/assets/images/icons/edit.png"
                    alt="crayon pour modifier les infos du profil"
                  />
                </div>
              </Link>
              <div className="level-points">
                <p>{ownBadge ? ownBadge.logo : ""}</p>
                <p>{profile.points} point</p>
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
          {profile && artworks.length > 0 ? (
            artworks.slice(0, 4).map((artwork, index) => (
              <div
                key={artwork.id_artwork}
                className={index === 3 ? "artwork4" : "artwork-profile"}
              >
                <Link to={`/oeuvre/${artwork.id_artwork_fk}`}>
                  <ArtworkCard artwork={artwork} />
                </Link>
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
