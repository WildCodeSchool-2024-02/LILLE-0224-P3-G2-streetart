import { useLoaderData } from "react-router-dom";
import "./styles/Ranking.css";
import { useBadges } from "../contexts/GlobalContext";

function Ranking() {
  const rankingData = useLoaderData();

  const { badges, getBadgeForPoints } = useBadges();

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
            {rankingData.map((member, index) => {
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
                  </td>
                  <td className="td-badge">{ownBadge ? ownBadge.logo : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ranking;
