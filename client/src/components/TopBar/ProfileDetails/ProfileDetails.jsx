import "./ProfileDetails.css"
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import MenuList from "../../MenuList/MenuList";

function ProfileDetails() {

    const { auth } = useAuth();
    const [ openMenuList, setOpenMenuList ] = useState(false);

    const handleClick = () => {
        setOpenMenuList(!openMenuList)
    }

    return (
        <button type="button" onClick={handleClick} className="profile-details" id={openMenuList && "is-open"}>
                <div className="profile-picture">
                    {auth.account.avatar ?
                        <img src={auth.account.avatar} alt={`Avatar de ${auth.account.pseudo}`} />
                        :
                        <img src="/assets/images/icons/profile.png" alt={`Avatar de ${auth.account.pseudo}`} />
                    }
                </div>
                <p className="profile-info"><span id="pseudo">{auth.account.pseudo}</span>{auth.account.points}<span><img src="/assets/images/icons/coin.png" alt="Jetons" id="coin" /></span></p>
        { openMenuList && <MenuList setOpenMenuList={setOpenMenuList} /> }    
        </button>
    )
}

export default ProfileDetails;