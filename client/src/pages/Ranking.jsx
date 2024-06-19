import { useLoaderData } from "react-router-dom";
import "./styles/Ranking.css";

function Ranking() {
  const rankingData = useLoaderData();

  const badges = [
    {
      id: 1,
      range: "0-20",
      logo: "👀",
      name: "chercheur",
    },
    {
      id: 2,
      range: "20-50",
      logo: "🔍",
      name: "explorateur",
    },
    {
      id: 3,
      range: "50-100",
      logo: "🕵️",
      name: "detective",
    },
    {
      id: 4,
      range: "100+",
      logo: "📷",
      name: "archeologue",
    },
  ];

  return (
    <div className="rank-container">
      <h2 className="classement-title">Classement</h2>
      <div className="rank-display-columns">
        <div className="rank-explain-box">
          <div className="rank-explain">
            <div className="points-explain">
              <h3>Comment gagner des points ?</h3>
              <br />
              <p>1 oeuvre ajoutée = 5 points</p>
              <p>1 oeuvre signalée disparue = 3 points</p>
            </div>
            <div className="badges-explain">
              <h3>Les badges</h3>
              <br />
              {badges.map((badge) => (
                <p key={badge.range} className="badge-info">
                  {badge.range}
                  <img
                    src="../../public/assets/images/icons/coin.png"
                    alt="badge"
                    className="img-coin"
                  />
                  = {badge.name} {badge.logo}
                </p>
              ))}
            </div>
          </div>
        </div>
        <table className="rank-box">
          <tbody>
            {rankingData.map((member, index) => (
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
                    alt="badge"
                    className="img-coin"
                  />{" "}
                </td>
                <td className="td-badge">
                  {member.points < 20
                    ? badges.find((badge) => badge.id === 1).logo
                    : ""}
                  {member.points >= 20 && member.points < 50
                    ? badges.find((badge) => badge.id === 2).logo
                    : ""}
                  {member.points >= 50 && member.points < 100
                    ? badges.find((badge) => badge.id === 3).logo
                    : ""}
                  {member.points >= 100
                    ? badges.find((badge) => badge.id === 4).logo
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ranking;
