import "./Camera.css"
import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Link, useNavigate } from "react-router-dom";
import { useNewArtwork } from "../../../contexts/NewArtworkContext";

function Camera() {

    const { image, setImage, deletePicture, setLatitude, setLongitude } = useNewArtwork();

    const navigate = useNavigate();

    const webcamRef = useRef(null);
  
    const capturePicture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    };

    // A REMETTRE POUR LA VUE ENVIRONNEMENT DE LA CAMERA POUR MOBILE
    // const videoConstraints = {
    //     facingMode: { exact: "environment" }
    //   };

    // *//////////////////////////////// LOCALISATION ///////////////////////////////////*

    const [errorLocation, setErrorLocation] = useState(null);
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            setErrorLocation(error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        setErrorLocation("La géolocalisation n'est pas suportée par ce naviguateur.");
      }
    }, [setLatitude, setLongitude]);

    if (errorLocation) {
      navigate("/ajouter-oeuvre/localisation");
    }
  
    return (
      <div className="App">
        <div className="webcam-container">
            {image ? <img src={image} alt="Oeuvre capturé" /> :  
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam"
                // A REMETTRE POUR LA VUE ENVIRONNEMENT DE LA CAMERA POUR MOBILE
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