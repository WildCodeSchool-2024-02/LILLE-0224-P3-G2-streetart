import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import OthersArtworks from "../components/OthersArtworks/OthersArtworks";
import "./styles/ArtworkDetails.css";

function ArtworkDetails() {

  const artwork = useLoaderData();

  const [city, setCity] = useState(null)

  // StreetMap API for get the adress with latitude and longitude
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${artwork.latitude}&lon=${artwork.longitude}&zoom=10&addressdetails=1`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.address) {
        setCity(data.address.city || data.address.town || data.address.village)
      } else {
        setCity("inconnu")
      }
    })

  // Function for open the picture on full screen
  const fullScreenPicture = () => {
    const image = document.getElementById('fullscreen-image');
    if (image.requestFullscreen) {
      image.requestFullscreen();
    } else if (image.mozRequestFullScreen) { // Firefox
      image.mozRequestFullScreen();
    } else if (image.webkitRequestFullscreen) { // Chrome, Safari and Opera
      image.webkitRequestFullscreen();
    } else if (image.msRequestFullscreen) { // IE/Edge
      image.msRequestFullscreen();
    }
  };

  return (
    <>
      <div className="artworkdetails-container">
        <div className="artworksdetails-all-info">
          <div className="artwork-img">
            <h2 className="artwork-title">{artwork.title}</h2>
            <button
              type="button"
              onClick={fullScreenPicture}
              style={{ border: 'none', padding: 0, background: 'none', cursor: 'pointer' }}
              aria-label="Voir l'image en plein écran"
            >
              <img
                id="fullscreen-image"
                src={artwork.picture}
                alt={artwork.title}
              />
            </button>
          </div>
          <div className="flex-right">
            <div className="map-artworkdetails">
              <img
                src="https://th.bing.com/th/id/R.d25b9dc7fecaa168cd8e12a5cb5e8927?rik=KoGEJmaj5qXrNA&riu=http%3a%2f%2ffr.maps-lille.com%2fimg%2f1200%2flille-carte-de-transport.jpg&ehk=R%2f6qyqwiZIr0IdrPd4bX4UEdUGmz37k53g5Vf20p%2feI%3d&risl=&pid=ImgRaw&r=0"
                alt="carte"
                className="map"
              />
            </div>
            <div className="info-artworkdetails">
              <div className="about-artwork">
                <div className="about-user-artwork">
                  <p>Ajoutée par :</p>
                  <img
                    className="user-img-artwork"
                    src="https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg"
                    alt="avatar de la personne qui a ajouté l'oeuvre"
                  />
                  <div>
                    <p>{artwork.pseudo}</p>
                    <p>lvl 56</p>
                  </div>
                </div>
                <p className="about-artwork">À {city}, le {artwork.date_creation}</p>
              </div>
            </div>
            <div className="report-artworkdetails">
              <button type="button" className="report-btn">
                Signaler la disparition de l'oeuvre
              </button>
            </div>
          </div>
        </div>
      </div>
      <OthersArtworks />
    </>
  );
}

export default ArtworkDetails;
