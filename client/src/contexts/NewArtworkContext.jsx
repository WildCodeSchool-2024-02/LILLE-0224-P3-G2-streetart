import PropTypes from "prop-types";
import {
    createContext, useContext, useState, useMemo
  } from "react";

  const NewArtworkContext = createContext();

  export function NewArtworkProvider({
    children,
  }) {

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("")
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const deletePicture = () => {
        setImage(null)
    }

    // */////////////////////////////// Obtenir la date du jour formatée pour la BDD ////////////////////////////*
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    // Fonction à mettre en place une fois le back prêt
    
    // const uploadPicture = async () => {
    //     if (image) {
    //       try {
    //         const response = await axios.post('/upload', { image });
    //         console.log('Image uploaded:', response.data);
    //       } catch (error) {
    //         console.error('Error uploading image', error);
    //       }
    //     }
    //   };

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
          formattedDate
        }),
        [image, title, latitude, longitude, formattedDate]
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