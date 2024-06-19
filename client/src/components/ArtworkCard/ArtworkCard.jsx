import "./ArtworkCard.css";
import PropTypes from "prop-types";

function ArtworkCard({ artwork }) {
  return (
    <div className="artwork-card">
      <img src={artwork.picture} alt={artwork.id_artwork} />
      <div className="artwork-info">
        <h3>{artwork.title}</h3>
      </div>
    </div>
  );
}

ArtworkCard.propTypes = {
  artwork: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id_artwork: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArtworkCard;
