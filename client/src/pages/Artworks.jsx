import { useLoaderData } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard/ArtworkCard";
import "./styles/Artworks.css";

function Artworks() {
  const artworkIsValidate = useLoaderData();

  return (
    <div className="artworks-container">
      {artworkIsValidate.map((artwork) => (
        <ArtworkCard artwork={artwork} key={artwork.id_artwork} />
      ))}
    </div>
  );
}

export default Artworks;
