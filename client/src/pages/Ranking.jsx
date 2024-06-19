import "./styles/Ranking.css";

function Ranking() {
  const tableData = [
    {
      position: 1,
      pseudo: "Dodo59",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 110,
    },
    {
      position: 2,
      pseudo: "Floflo",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 80,
    },
    {
      position: 3,
      pseudo: "BGdu59",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 45,
    },
    {
      position: 4,
      pseudo: "AliceSmith",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 30,
    },
    {
      position: 5,
      pseudo: "MaxPower",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 20,
    },
    {
      position: 6,
      pseudo: "SarahC",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 18,
    },
    {
      position: 7,
      pseudo: "Lucas33",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 15,
    },
  ];

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
                <p key={badge.range}>
                  {badge.range} 🟡 = {badge.name} {badge.logo}
                </p>
              ))}
            </div>
          </div>
        </div>
        <table className="rank-box">
          <tbody>
            {tableData.map((item) => (
              <tr key={item.position} className="rank-boxes">
                <td className="td-position">{item.position}</td>
                <td className="td-pseudo">{item.pseudo}</td>
                <td className="td-img">
                  <img
                    className="user-img-ranking"
                    src={item.avatar}
                    alt="avatar"
                  />
                </td>
                <td className="td-points">{item.points} 🟡</td>
                {item.points < 20 &&
                  badges.find((badge) => badge.id === 1).logo}
                {item.points >= 20 &&
                  item.points < 50 &&
                  badges.find((badge) => badge.id === 2).logo}
                {item.points >= 50 &&
                  item.points < 100 &&
                  badges.find((badge) => badge.id === 3).logo}
                {item.points >= 100 &&
                  badges.find((badge) => badge.id === 4).logo}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ranking;
