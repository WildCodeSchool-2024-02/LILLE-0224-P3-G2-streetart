import "./ProfileDetails.css"
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

function ProfileDetails() {

    const { auth } = useAuth();

    return (
        <div className="profile-details">
            <Link to={`/profil/${auth.account.id_member}`}>     
                <div className="profile-picture">
                    {auth.account.avatar ?
                        <img src={auth.account.avatar} alt={`Avatar de ${auth.account.pseudo}`} />
                        :
                        <img src="/assets/images/icons/profile.png" alt={`Avatar de ${auth.account.pseudo}`} />
                    }
                </div>
            </Link>
            <Link to={`/profil/${auth.account.id_member}`}> 
                <p className="profile-info"><span id="pseudo">{auth.account.pseudo}</span>{auth.account.points}<span><img src="/assets/images/icons/coin.png" alt="Jetons" id="coin" /></span></p>
            </Link>
        </div>
    )
}

export default ProfileDetails;