import "./ProfileDetails.css"
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ProfileDetails({ avatar, pseudo, points }) {
    return (
        <div className="profile-details">
            <Link to="/profil">     
                <div className="profile-picture">
                    <img src={avatar} alt="" />
                </div>
            </Link>
            <Link to="/profil"> 
                <p className="profile-info"><span id="pseudo">{pseudo}</span> ( {points} <span><img src="/assets/images/icons/coin.png" alt="Jetons" id="coin" /></span> )</p>
            </Link>
        </div>
    )
}

ProfileDetails.propTypes = {
    avatar: PropTypes.string.isRequired,
    pseudo: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired
  };

export default ProfileDetails;