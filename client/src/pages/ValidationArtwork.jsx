import "./styles/ValidationArtwork.css"
import "../components/NewArtwork/FormArtwork/FormArtwork.css"
import { useNewArtwork } from "../contexts/NewArtworkContext";
import TopBar from "../components/TopBar/TopBar";
import NavBarBottom from "../components/NavBarBottom/NavBarBottom"
import { BurgerMenuProvider } from "../contexts/BurgerMenuContext";

function ValidationArtwork() {

    const { title, latitude, longitude, formattedDate, imageUrl } = useNewArtwork();

    return (
        <>
            <TopBar title="Spot Lille Art" />
            <div className="validation-artwork-container">
                <div className="validation-artwork">
                    <div className="camera-picture">
                        <img src={imageUrl} alt="Oeuvre capturé" />
                    </div>
                    <h3>Titre : {title}</h3>
                    <p>Chemin : "{imageUrl}"</p>
                    <p>Latitude : {latitude}</p>
                    <p>Longitude : {longitude}</p>
                    <p>Date : {formattedDate}</p>
                </div>
            </div>
            <BurgerMenuProvider>
                <NavBarBottom />
            </BurgerMenuProvider>
        </>
    )
}

export default ValidationArtwork;