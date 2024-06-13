import PropTypes from "prop-types";
import {
    createContext, useContext, useState, useMemo
  } from "react";

  const NewArtworkContext = createContext();

  export function NewArtworkProvider({
    children,
  }) {

    const [image, setImage] = useState(null);

    const deletePicture = () => {
        setImage(null)
    }

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
        }),
        [image]
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