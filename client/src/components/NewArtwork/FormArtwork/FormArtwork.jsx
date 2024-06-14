import "./FormArtwork.css"
import { useNavigate } from "react-router-dom";
import { useNewArtwork } from "../../../contexts/NewArtworkContext";
import TopBar from "../../TopBar/TopBar";

function FormArtwork() {

    const { image, deletePicture, title, setTitle } = useNewArtwork();

    const navigate = useNavigate();

    function returnToCamera() {
        deletePicture()
        navigate("/ajouter-oeuvre/camera")
    }

    function handleChange(event) {
        setTitle(event.target.value)
    }

    function sendArtwork() {
        navigate("/ajouter-oeuvre/validation")
    }

    return (
        <>
            <TopBar title="Spot Lille Art" />
            <div className="form-artwork-container">
                <div className="form-artwork">
                    <div className="camera-picture">
                        <button type="button" onClick={returnToCamera} className="return-camera-btn camera-btn"><img src="/assets/images/icons/cancel.svg" alt="Retourner vers la caméra" /></button>
                        <img src={image} alt="Oeuvre capturé" />
                    </div>
                    <div className="field input-title-artwork">
                        <input type="text" className="input" placeholder="Donne un titre à l'oeuvre" value={title} onChange={handleChange} />
                        <div className="line" />
                    </div>
                    <div>
                        <p className="warning">Attention : La photo doit être prise au format portrait. Ton œuvre sera ensuite validée par un administrateur avant d'être affichée sur le site.</p>
                    </div>
                    <button type="button" onClick={sendArtwork} className="btn send-picture-btn">Envoyer</button>
                </div>
            </div>
        </>
    )
}

export default FormArtwork;