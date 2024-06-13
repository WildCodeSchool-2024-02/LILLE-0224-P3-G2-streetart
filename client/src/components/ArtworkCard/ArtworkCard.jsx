import "./ArtworkCard.css"
import PropTypes from "prop-types";

function ArtworkCard({ picture }) {
    return (
        <div className="artwork-card">
            <img src={picture} alt="Nom oeuvre" />
            <div className="artwork-info">
                <h3>
                    Name of art
                </h3>
            </div>
        </div>
    )
}

ArtworkCard.propTypes = {
    picture: PropTypes.string.isRequired
};

export default ArtworkCard; 