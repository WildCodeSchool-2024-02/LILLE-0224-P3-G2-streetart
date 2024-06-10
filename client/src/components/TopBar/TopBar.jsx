import "./TopBar.css"
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import ProfileDetails from "./ProfileDetails/ProfileDetails";


function TopBar ({ title }) {
    return (
        <>
            <div className="top-bar mobile">
                <h2 className="title">
                    {title}
                </h2>
                <div className="splash" />
            </div>
            <div className="top-bar desktop">
                <div className="left-container">
                    <Link to="/">
                        <div className="logo" />
                    </Link>
                    <Link to="/">
                        <h2 className="title">
                            Spot Lille Art
                        </h2>
                    </Link>
                </div>
                <div className="right-container">
                    <Link to="/inscription">
                        <button type="button" className="register-btn">
                            Inscription
                        </button>
                    </Link>
                    <Link to="/connexion">
                        <button type="button" className="login-btn">
                            Connexion
                        </button>
                    </Link>
                </div>
                {/* <ProfileDetails avatar="/assets/images/icons/profile.png" pseudo="iSayZ" points={3000}/> */}
            </div>
        </>
    )
}

TopBar.propTypes = {
    title: PropTypes.string.isRequired
  };

export default TopBar;

