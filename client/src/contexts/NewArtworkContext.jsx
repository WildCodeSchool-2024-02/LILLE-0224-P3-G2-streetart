import PropTypes from "prop-types";
import {
    createContext, useContext, useState, useMemo
  } from "react";
  import { useNavigate } from "react-router-dom";
import myAxios from "../services/myAxios"

  const NewArtworkContext = createContext();

  export function NewArtworkProvider({
    children,
  }) {

    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const deletePicture = () => {
        setImage(null)
    }

    // */////////////////////////////// Get the date of the day formated for BDD ////////////////////////////*
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    // Function for upload the picture of artwork
    const handleUpload = async () => {
      if (!image) {
        console.error('No image to upload');
        return null;
      }
  
      // Convert base64 image to file
      const blob = await fetch(image).then(res => res.blob());
      const file = new File([blob], 'artwork.jpg', { type: 'image/jpeg' });
  
      const formData = new FormData();
      formData.append('file', file);
      
      // Post the picture
      try {
        const response = await myAxios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
        }
        });

        // Get the path of the uploaded picture
        const filePath = `/assets/images${response.data.filePath}`;
        return filePath
        
      } catch (error) {
        console.error('Error uploading file:', error);
        return null;
      }
    };
    
    const handleSubmit = async () => {
      // Launch the function for upload the picture        
      try {
        const picture = await handleUpload();
        // Get the informations for add a new artwork
        const formData = {
          title,
          picture,
          date_creation: formattedDate,
          longitude,
          latitude,
        };

        // Post the new artwork
        await myAxios.post("/api/artworks", formData);

        navigate("/ajouter-oeuvre/validation")

      } catch (error) {
        console.error("Erreur", error);
      }
    }

    const contextValue = useMemo(
        () => ({
          image,
          setImage,
          deletePicture,
          title,
          setTitle,
          latitude,
          setLatitude,
          longitude,
          setLongitude,
          formattedDate,
          handleSubmit,
        }),
        [image, title, latitude, longitude, formattedDate, handleSubmit]
      );    

    return (
        <NewArtworkContext.Provider value={contextValue}>
            {children}
        </NewArtworkContext.Provider>
    )
}

NewArtworkProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useNewArtwork =
() => useContext(NewArtworkContext);