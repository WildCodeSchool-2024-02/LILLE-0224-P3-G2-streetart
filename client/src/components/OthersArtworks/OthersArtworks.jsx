import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ArtworkCard from "../ArtworkCard/ArtworkCard";
import myAxios from "../../services/myAxios";
import "./OthersArtworks.css";

function OthersArtworks({ artworkDisplayed }) {
  const [randomArtworks, setRandomArtworks] = useState([]);

  // TO MIX AND GET RANDOM ARTWORKS
  const mixArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const getRandomArtworks = async () => {
      try {
        const response = await myAxios.get("/api/artworks");
        const randomArtworksList = response.data;
        const filteredArtworks = randomArtworksList.filter(
          (artworks) => artworks.id_artwork !== artworkDisplayed
        );
        setRandomArtworks(mixArray(filteredArtworks));
      } catch (error) {
        console.error("Erreur", error);
      }
    };
    getRandomArtworks();
  }, [artworkDisplayed]);

  return (
    <div className="others-artworks">
      <h3 className="others-title">À découvrir </h3>
      <div className="img-othersartworks">
        {randomArtworks.slice(0, 7).map((randomArtwork) => (
          <ArtworkCard artwork={randomArtwork} key={randomArtwork.id} />
        ))}
      </div>
    </div>
  );
}

OthersArtworks.propTypes = {
  artworkDisplayed: PropTypes.string.isRequired,
};

export default OthersArtworks;
