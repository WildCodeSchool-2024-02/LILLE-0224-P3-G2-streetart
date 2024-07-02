import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState, useEffect } from "react";
import myAxios from "../services/myAxios";
import "./styles/PanelAdmin.css";

function PanelAdmin() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const [membersResponse] = await Promise.all([
        myAxios.get(`/api/members/date`),
      ]);
      setMembers(membersResponse.data);
    };

    getData();
  }, []);

  const handleBanUser = async (memberId) => {
    try {
      await myAxios.put(`/api/accounts/ban/${memberId}`);
      // Update membrers after ban
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id_member === memberId ? { ...member, banned: 1 } : member
        )
      );
    } catch (error) {
      // Gérer les erreurs
      console.error("Erreur lors du bannissement du membre :", error);
    }
  };

  return (
    <div>
      <div>
        <table className="table-global">
          <thead>
            <tr>
              <th className="table-title">ID</th>
              <th className="table-title">Avatar</th>
              <th className="table-title">Prénom</th>
              <th className="table-title">Nom</th>
              <th className="table-title">Pseudo</th>
              <th className="table-title">Ville</th>
              <th className="table-title">Code postal</th>
              <th className="table-title">Email</th>
              <th className="table-title">Date de création</th>
              <th className="table-title">Bannir le membre</th>
            </tr>
          </thead>
          <tbody className="tbl-content">
            {members &&
              members.map((member) => (
                <tr
                  key={member.id_member}
                  style={{
                    backgroundColor: member.banned ? "#e5e5e5" : "white",
                  }}
                >
                  <td className="table-info">{member.id_member}</td>
                  <td className="table-info">
                    <img
                      src={
                        member.avatar
                          ? member.avatar
                          : "/assets/images/icons/profile.png"
                      }
                      alt="avatar du membre"
                      className="table-avatar"
                    />
                  </td>
                  <td className="table-info">{member.firstname}</td>
                  <td className="table-info">{member.lastname}</td>
                  <td className="table-info">{member.pseudo}</td>
                  <td className="table-info">{member.city}</td>
                  <td className="table-info">{member.postcode}</td>
                  <td className="table-info">{member.email}</td>
                  <td className="table-info">{member.date_creation}</td>
                  <td className="table-info">
                    {member.banned === 0 ? (
                      <DeleteForeverIcon
                        onClick={() => handleBanUser(member.id_member)}
                        style={{ color: "#666", fontSize: 35 }}
                      />
                    ) : (
                      <p>Membre banni</p>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PanelAdmin;
