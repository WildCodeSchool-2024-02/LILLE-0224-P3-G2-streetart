import "./Camera.css"
import { useRef } from 'react';
import Webcam from 'react-webcam';
import { Link } from "react-router-dom";
import { useNewArtwork } from "../../../contexts/NewArtworkContext";

function Camera() {

    const { image, setImage, deletePicture } = useNewArtwork();

    const webcamRef = useRef(null);
  
    const capturePicture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    };

    // const videoConstraints = {
    //     facingMode: { exact: "environment" }
    //   };
  
    return (
      <div className="App">
        <div className="webcam-container">
            {image ? <img src={image} alt="Oeuvre capturé" /> :  
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam"
                // Décommenter VideoConstraints pour la caméra environnement du téléphone
                // videoConstraints={videoConstraints}
            />
            }
            <Link to="/"><button type="button" className="exit-picture-btn camera-btn"><img src="/assets/images/icons/return.png" alt="Revenir au site" /></button></Link>
            {image ?
            <div className="after-picture-btn">
                <button type="button" onClick={deletePicture} className="camera-btn"><img src="/assets/images/icons/cancel.svg" alt="Supprimer et revenir à la camera" /></button>
                <Link to="/ajouter-oeuvre/formulaire"><button type="button" className="camera-btn"><img src="/assets/images/icons/validate.svg" alt="Valider l'oeuvre" /></button></Link>
            </div>  
            :
            <button type="button" onClick={capturePicture} className="take-picture-btn camera-btn"><img src="/assets/images/icons/take_picture.svg" alt="Capturer l'oeuvre" /></button>
            }
        </div>   
      </div>
  );
}

export default Camera;