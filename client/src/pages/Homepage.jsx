import "./styles/Homepage.css";
import { Link, useLoaderData } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard/ArtworkCard";
import RoadMap from "./RoadMap";
import Top3 from "../components/Top3/Top3";
import RankingHomepage from "../components/RankingHomepage/RankingHomepage";

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
          {artworkIsValidate.slice(0, 4).map((artwork, index) => (
            <div
              key={artwork.id_artwork}
              className={index === 3 ? "artwork4" : "artwork-profile"}
            >
              <Link to={`/oeuvre/${artwork.id_artwork}`}>
                <div className="artworks-news-homepage">
                  <ArtworkCard artwork={artwork} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-desktop-container">
        <div className="roadmap-homepage-container">
          <h2 className="titles-homepage">La carte</h2>
          <Link to="/carte">
            <div className="roadmap-homepage">
              <RoadMap />
            </div>
          </Link>
        </div>
        <div className="top3-mobile">
          <h3 className="titles-homepage">Le top 3</h3>
          <Top3 />
        </div>
        <div className="ranking-homepage">
          <h3 className="titles-homepage">Le classement</h3>
          <RankingHomepage />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
