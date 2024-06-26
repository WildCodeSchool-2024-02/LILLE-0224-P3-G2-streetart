import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types"; 
import ArtworkCard from "../components/ArtworkCard/ArtworkCard";
import "./styles/Artworks.css";

function Artworks() {
  const artworkIsValidate = useLoaderData();

  return (
    <div className="artworks-container">
      {artworkIsValidate.map((artwork, index) => (
        <ArtworkCardWithAnimation key={artwork.id_artwork} artwork={artwork} index={index} />
      ))}
    </div>
  );
}

function ArtworkCardWithAnimation({ artwork, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Triggers when 10% of the element is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className="artwork-card-container"
    >
      <Link to={`/oeuvre/${artwork.id_artwork}`}>
        <ArtworkCard artwork={artwork} />
      </Link>
    </motion.div>
  );
}

ArtworkCardWithAnimation.propTypes = {
  artwork: PropTypes.shape({
    id_artwork: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Artworks;
