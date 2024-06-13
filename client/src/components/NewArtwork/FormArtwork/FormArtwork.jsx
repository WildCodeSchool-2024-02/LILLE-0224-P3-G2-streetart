import "./FormArtwork.css"
import TopBar from "../../TopBar/TopBar";
import { useNewArtwork } from "../../../contexts/NewArtworkContext";

function FormArtwork() {

    const { image } = useNewArtwork();

    return (
        <>
            <TopBar title="Spot Lille Art" />
            <div className="form-artwork-container">
                <div className="camera-picture">
                        <img src={image} alt="Oeuvre capturé" />
                </div>
                <div className="form-artwork">
                    <div className="field">
                        <input type="text" className="input" placeholder="Titre de l'oeuvre" />
                        <div className="line" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default FormArtwork;