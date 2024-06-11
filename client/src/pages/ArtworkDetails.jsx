import OthersArtworks from "../components/OthersArtworks/OthersArtworks";
import "./styles/ArtworkDetails.css";

function ArtworkDetails() {
  return (
    <div className="artworkdetails-container">
      <div className="img-title-map-artwork">
        <h2 className="artwork-title">CHAT JAUNE</h2>
        <div className="desktop-container">
          <img
            className="artwork-img"
            src="https://www.lescachotteriesdelille.com/wp-content/uploads/2023/12/Monsieur-Chat_640x479.jpg"
            alt="oeuvre de street art"
          />
          <div className="map-info">
            <img
              src="https://th.bing.com/th/id/R.d25b9dc7fecaa168cd8e12a5cb5e8927?rik=KoGEJmaj5qXrNA&riu=http%3a%2f%2ffr.maps-lille.com%2fimg%2f1200%2flille-carte-de-transport.jpg&ehk=R%2f6qyqwiZIr0IdrPd4bX4UEdUGmz37k53g5Vf20p%2feI%3d&risl=&pid=ImgRaw&r=0"
              alt="carte"
              className="img-map"
            />

            <div className="info-artwork-card">
              <div className="info-user-artwork">
                <p>Ajoutée par :</p>
                <img
                  className="img-user-artwork"
                  src="https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg"
                  alt="avatar de la personne qui a ajouté l'oeuvre"
                />
                <div className="user">
                  <p>Pierrot</p>
                  <p>lvl 56</p>
                </div>
              </div>
              <div className="info-artwork">
                <p>À Lille, le 03/06/2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OthersArtworks />
    </div>
  );
}

export default ArtworkDetails;
