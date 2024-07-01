import { useLoaderData, Link, useNavigate } from "react-router-dom";
import myAxios from "../services/myAxios";
import "./styles/ArtworkNotValidateDetails.css";

function ArtworksNVNotValidateDetails() {
  const navigate = useNavigate();
  const artworksNV = useLoaderData();

  const handleValidate = async () => {
    // Validate if necessary properties are present

    try {
      const response = await myAxios.post(
        `/api/artworks/not-validate/${artworksNV.id_artwork}/validate`,
        {
          id: artworksNV.id_artwork,
          dateOperation: new Date().toISOString(),
          idAccount: artworksNV.id_account,
          idMember: artworksNV.id_member,
        }
      );

      navigate(`/admin`);
      console.info("Oeuvre validée", response.data);
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  const handleDeny = async () => {
    try {
      const response = await myAxios.delete(
        `/api/artworks/not-validate/${artworksNV.id_artwork}/deny`
      );
      navigate(`/admin`);
      console.info("Oeuvre refusée", response.data);
    } catch (error) {
      console.error("Erreur", error);
    }
  };

  return (
    <div className="artworkNV-container">
      <h2 className="artworksNV-title">
        <span className="focus-text">Titre : </span>
        {artworksNV.title}
      </h2>
      <img
        className="artworkNV-img"
        src={artworksNV.picture}
        alt={artworksNV.title}
      />
      <div className="artworkNVDetails-info">
        <p className="focus-text">
          Ajoutée par :
          <Link to={`/profile/${artworksNV.id_member}`}>
            {artworksNV.pseudo}
          </Link>
        </p>
      </div>
      <div className="artworksNVDetails-btn">
        <button type="button" onClick={handleValidate} className="validate-btn">
          Valider l'oeuvre
        </button>
        <button type="button" onClick={handleDeny} className="deny-btn">
          Refuser l'oeuvre
        </button>
      </div>
    </div>
  );
}

export default ArtworksNVNotValidateDetails;
