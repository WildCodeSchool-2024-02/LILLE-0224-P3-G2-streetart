import { Link, useLoaderData } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard/ArtworkCard";
import "./styles/Artworks.css";

function Artworks() {
  const artworkIsValidate = useLoaderData();

  return (
    <div className="artworks-container">
      {artworkIsValidate.map((artwork) => (
        <Link to={`/oeuvre/${artwork.id_artwork}`} key={artwork.id_artwork}>
          <ArtworkCard artwork={artwork} />
        </Link>
      ))}
    </div>
  );
}

export default Artworks;
