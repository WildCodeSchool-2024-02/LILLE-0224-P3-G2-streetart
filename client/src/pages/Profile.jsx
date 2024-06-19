import { useLoaderData } from "react-router-dom";
import "./styles/Profile.css";
import ArtworkCard from "../components/ArtworkCard/ArtworkCard";

const profiles = [
  {
    picture:
      "https://www.parismatch.com/lmnr/var/pm/public/media/image/2022/02/28/16/Francois-Civil.jpg?VersionId=3NZNfTbY_QeYa6WOzqlWurka0zzg9TGn",
    firstName: "François",
    lastName: "Civil",
    pseudo: "pseudo",
    email: "françois.civil@gmail.com",
    password: "**********",
    postcode: "770012 ",
    city: "Paris",
    level: "87",
    points: "187",
  },
];

function Profile() {

  const memberArtworks = useLoaderData();

  return (
    <div className="profile-container">
      {profiles.map((profile) => (
        <div
          className="my-profile"
          key={`${profile.firstName} {profile.lastName}`}
        >
          <div className="top-profile">
            <div className="img-profile">
              <img
                className="image-profile"
                src="https://www.parismatch.com/lmnr/var/pm/public/media/image/2022/02/28/16/Francois-Civil.jpg?VersionId=3NZNfTbY_QeYa6WOzqlWurka0zzg9TGn"
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
                <p>LVL {profile.level}</p>
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
              <p>{profile.password}</p>
            </div>
            <div className="points-edit-desktop">
              <img
                className="edit-profile-desktop"
                src="/assets/images/icons/edit.png"
                alt="crayon pour modifier les infos du profil"
              />
              <div className="level-points">
                <p>LVL {profile.level}</p>
                <p>{profile.points} points</p>
              </div>
            </div>
          </div>
        </div>
      ))}
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
