import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "./styles/ArtworkDetails.css";
import OthersArtworks from "../components/OthersArtworks/OthersArtworks";
import RoadMapDetails from "../components/RoadMapDetails/RoadMapDetails";
import { useBadges } from "../contexts/BadgeContext";

function ArtworkDetails() {
  const artwork = useLoaderData();

  const [city, setCity] = useState(null);

  // StreetMap API for get the adress with latitude and longitude
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${artwork.latitude}&lon=${artwork.longitude}&zoom=10&addressdetails=1`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.address) {
        setCity(data.address.city || data.address.town || data.address.village);
      } else {
        setCity("inconnu");
      }
    });

  // Function for open the picture on full screen
  const fullScreenPicture = () => {
    const image = document.getElementById("fullscreen-image");
    if (image.requestFullscreen) {
      image.requestFullscreen();
    } else if (image.mozRequestFullScreen) {
      // Firefox
      image.mozRequestFullScreen();
    } else if (image.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      image.webkitRequestFullscreen();
    } else if (image.msRequestFullscreen) {
      // IE/Edge
      image.msRequestFullscreen();
    }
  };

  const { getBadgeForPoints } = useBadges();
  const ownBadge = getBadgeForPoints(artwork.points);

  return (
    <div className="artworkdetails-container">
      <div className="artworkdetails-right-container">
        <div className="artworkdetails-img-container">
          <h2 className="artwork-title">{artwork.title}</h2>
          <button
            type="button"
            onClick={fullScreenPicture}
            style={{
              border: "none",
              padding: 0,
              background: "none",
              cursor: "pointer",
            }}
            aria-label="Voir l'image en plein écran"
          >
            <div className="artworkdetails-img">
              <img
                id="fullscreen-image"
                src={artwork.picture}
                alt={artwork.title}
              />
            </div>
          </button>
        </div>

        <div className="artworkdetails-left-container">
          <div className="artworkdetails-map">
            <RoadMapDetails />
          </div>

          <div className="artworkdetails-info">
            <div className="artworkdetails-user">
              <div className="artworkdetails-addby">
                <p>Ajoutée par :</p>
                <p className="focus-text">{artwork.pseudo}</p>
              </div>
              <img
                className="user-img-artwork"
                src="https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg"
                alt="avatar de la personne qui a ajouté l'oeuvre"
              />
              <p className="focus-text">{artwork.points} points</p>
              <p>{ownBadge.logo}</p>
            </div>

            <p className="about-artwork focus-text">
              À {city}, le {artwork.date_creation}
            </p>
          </div>

          <div className="artworkdetails-reportbtn">
            <button type="button" className="report-btn">
              Signaler la disparition de l'oeuvre
            </button>
          </div>
        </div>
      </div>

      <OthersArtworks artworkDisplayed={artwork.id_artwork} />
    </div>
  );
}

export default ArtworkDetails;
