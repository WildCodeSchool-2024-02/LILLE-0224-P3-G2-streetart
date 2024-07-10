import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBadges } from "../contexts/BadgeContext";
import "./styles/Profile.css";
import ArtworkCard from "../components/ArtworkCard/ArtworkCard";
import myAxios from "../services/myAxios";

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useAuth(); 
  const [artworks, setArtworks] = useState([]);
  const [profile, setProfile] = useState();
  const [showArtworks, setShowArtworks] = useState(false)
  const [showBtn, setShowBtn] = useState(false);

  const { getBadgeForPoints } = useBadges();
  const ownBadge = getBadgeForPoints(profile && profile.points);
  
  useEffect(
    () => {
      const getData = async () => {
        try {
          const [artworksResponse, membersResponse] = await Promise.all([
            myAxios.get(`/api/artworks/profile/${id}`, {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              }
            }),
            myAxios.get(`/api/members/${id}`, {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              }
            }),
          ]);

          setArtworks(artworksResponse.data);
          setProfile(membersResponse.data);
          
        } catch (error) {
          if (error.response.data.access === "denied") {
            navigate("/erreur")
          } 
        }
      }
      
      getData();
    }, [auth.token, id, navigate]
  )
  
  // SHOW 3/4 CARDS OR ALL 
  const getAllCards = () => {
    setShowArtworks(!showArtworks)
  }

  // RULES FOR MOBILE ARTWORKS DISPLAYED
  const isMobile = useMediaQuery('(max-width:768px)');
  const artworksToShow = isMobile ? 3 : 4; 

  
  // HOW MANY ARTWORKS TO SHOW 
  const displayedArtworks = showArtworks ? artworks : artworks.slice(0, artworksToShow)  
  
  useEffect(() => {
    if (artworks.length > artworksToShow) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  }, [artworks, artworksToShow]);

  return (
    <div className="profile-container">
      {profile && (
        <div
          className="my-profile"
          key={`${profile.firstName}-${profile.lastName}-${profile.id_member}`}>
          <div className="top-profile">
            <div className="img-profile">
              <img
                className="image-profile"
                src={
                  profile.avatar
                    ? profile.avatar
                    : "assets/images/icons/profile.png"
                }
                alt="profil"
              />
              <p className="pseudo-profile">{profile.pseudo}</p>
            </div>
            <div className="points-edit-mobile">
              <Link to={`/profil/edit/${profile.id_member}`}>
                <EditIcon style={{ color: "#666", fontSize: 35 }} />
              </Link>
              <div className="level-points">
                <p>{ownBadge ? ownBadge.logo : ""}</p>
                <div className="points"><p>{profile.points}</p>
                <img src="/assets/images/icons/coin.png" alt="Jetons"  className="img-coin"/></div>
              </div>
            </div>
          </div>
          <div className="info-desktop">
            <div className="info-profile">
              <p>{profile.pseudo}</p>
              <p>
                {profile.firstName} {profile.lastName}
              </p>
              <p>{profile.email}</p>
              <p>
                {profile.postcode} {profile.city}
              </p>
            </div>
            <div className="points-edit-desktop">
              <Link to={`/profil/edit/${profile.id_member}`}>
                <EditIcon style={{ color: "#666", fontSize: 35 }} />
              </Link>
              <div className="level-points">
                <p>{ownBadge ? ownBadge.logo : ""}</p>
                <div className="points"> <p>{profile.points}</p><img src="/assets/images/icons/coin.png" alt="Jetons" className="img-coin"/></div>
              </div>
            </div>
          </div>
        </div>
      )}


      <div className="my-artworks">
        <div className="title-my-artworks">
          <h2>Mes oeuvres</h2>
        </div>
        <div className="artworks-profile">
          <div className="user-artworks">
          {profile && artworks.length > 0 ? (
            displayedArtworks.map((artwork) => (
              <div
              key={artwork.id_artwork}
              className="artwork-profile"
              > 
              {artwork.validate === 1 ? 
                <Link to={`/oeuvre/${artwork.id_artwork_fk}`}>
                  <ArtworkCard artwork={artwork} />
                </Link>
                :
                <ArtworkCard artwork={artwork} />
              }
              </div>
            ))
          ) : (
            <p>Tu n'as posté aucune oeuvre pour le moment.</p>
          )}
</div>
       { showBtn ? 
         <div className="btn-see"> <button type="button" className="btn btn-see-more-less" onClick={getAllCards}>{showArtworks ? <div>Voir moins </div>: <div>Voir plus </div>}</button></div> : <div/>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
