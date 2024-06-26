import { useEffect, useState } from "react";
import myAxios from "../../services/myAxios";
import { useBadges } from "../../contexts/BadgeContext";
import "../../pages/styles/Homepage.css";

function RankingHomepage() {
  const [memberRanking, setMemberRanking] = useState([]);

  useEffect(() => {
    const getMemberRanking = async () => {
      try {
        const response = await myAxios.get("/api/members/Ranked");
        setMemberRanking(response.data);
      } catch (error) {
        console.error("Erreur", error);
      }
    };
    getMemberRanking();
  }, []);

  const { getBadgeForPoints } = useBadges();

  return (
    <div className="rank-container">
      <table className="rank-box">
        <tbody>
          {memberRanking.slice(0, 4).map((member, index) => {
            const ownBadge = getBadgeForPoints(member.points);
            return (
              <tr key={member.id_member} className="rank-boxes">
                <td className="td-position">{index + 1}</td>
                <td className="td-pseudo">{member.pseudo}</td>
                <td className="td-img">
                  <img
                    className="user-img-ranking"
                    src={
                      member.avatar
                        ? member.avatar
                        : "../../public/assets/images/icons/profile.png"
                    }
                    alt="avatar"
                  />
                </td>
                <td className="td-points">
                  {member.points}{" "}
                  <img
                    src="../../public/assets/images/icons/coin.png"
                    alt="piece"
                    className="img-coin"
                  />{" "}
                  <p className="badge-homepage">{ownBadge.logo}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RankingHomepage;
