import { useEffect } from "react";
import "./styles/PanelAdmin.css"
import { useNavigate } from "react-router-dom";
import myAxios from "../services/myAxios";
import { useAuth } from "../contexts/AuthContext";

function PanelAdmin() {

  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(
    () => {
      const verifyAccess = async () => {
        try {
          await myAxios.get(`/api/admin/verify`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              }
            }
          );
        } catch (error) {
          if (error.response.data.access === "denied") {
            navigate("/erreur")
          }
        }
      };

      verifyAccess();
    }, [auth, navigate]
  )

  return (
    <div>
      Panel Admin
    </div>
  );
}

export default PanelAdmin;
