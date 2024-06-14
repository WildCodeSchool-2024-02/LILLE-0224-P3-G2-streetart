import "./styles/Profile.css";
import ArtworkCard from "../components/ArtworkCard/ArtworkCard";

function Profile() {
  return (
    <div className="profile-container">
      <div className="my-profile">
        <div className="top-profile">
          <div className="img-profile">
            <img
              className="image-profile"
              src="https://www.parismatch.com/lmnr/var/pm/public/media/image/2022/02/28/16/Francois-Civil.jpg?VersionId=3NZNfTbY_QeYa6WOzqlWurka0zzg9TGn"
              alt="profil"
            />
            <p className="pseudo-profile">pseudo</p>
          </div>
          <div className="points-edit">
            <img
              className="edit-profile"
              src="/assets/images/icons/edit.png"
              alt="crayon pour modifier les infos du profil"
            />
            <div className="level-points">
              <p>LVL 87</p>
              <p>173 points</p>
            </div>
          </div>
        </div>
        <div className="info-profile">
          <p>François Civil</p>
          <p>14/07/1990</p>
          <p>françois.civil@gmail.com</p>
          <p>770012 Paris</p>
          <p>**********</p>
        </div>
      </div>
      <div className="my-artworks">
        <ArtworkCard picture="/assets/images/artworks/artwork6.png" />
        <ArtworkCard picture="/assets/images/artworks/artwork7.png" />
        <ArtworkCard picture="/assets/images/artworks/artwork8.png" />
      </div>
    </div>
  );
}

export default Profile;
