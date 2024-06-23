import "./styles/Homepage.css";
import { Link, useLoaderData } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard/ArtworkCard";
import RoadMap from "./RoadMap";
import Top3 from "../components/Top3/Top3";

function Homepage() {
  const artworkIsValidate = useLoaderData();

  return (
    <div className="homepage-container">
      <Link to="/a-propos" className="btn link-homepage">
        COMMENT ÇA MARCHE ?
      </Link>
      <div className="news-homepage">
        <h3 className="titles-homepage">Les nouveautés</h3>
        <div className="artworks-homepage">
          {artworkIsValidate.slice(0, 3).map((artwork) => (
            <Link to={`/oeuvre/${artwork.id_artwork}`} key={artwork.id_artwork}>
              <div className="artworks-news-homepage">
                <ArtworkCard artwork={artwork} />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="roadmap-homepage-container">
        <h2 className="titles-homepage">La carte</h2>
        <Link to="/carte">
          <div className="roadmap-homepage">
            <RoadMap />
          </div>
        </Link>
      </div>
      <div className="top3-mobile">
        <h3 className="titles-homepage">Le top 3 des membres</h3>
        <Top3 />
      </div>
    </div>
  );
}

export default Homepage;
