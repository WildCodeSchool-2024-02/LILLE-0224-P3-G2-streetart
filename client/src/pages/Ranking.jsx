import "./styles/Ranking.css";

function Ranking() {
  const tableData = [
    {
      position: 1,
      pseudo: "Dodo59",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 30,
      badge: "🎨",
    },
    {
      position: 2,
      pseudo: "Floflo",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 25,
      badge: "❇️",
    },
    {
      position: 3,
      pseudo: "BGdu59",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 35,
      badge: "💎",
    },
    {
      position: 4,
      pseudo: "AliceSmith",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 22,
      badge: "🌟",
    },
    {
      position: 5,
      pseudo: "MaxPower",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 28,
      badge: "🔥",
    },
    {
      position: 6,
      pseudo: "SarahC",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 33,
      badge: "⭐",
    },
    {
      position: 7,
      pseudo: "Lucas33",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 27,
      badge: "💫",
    },
    {
      position: 20,
      pseudo: "EvaGreen",
      avatar:
        "https://www.radiofrance.fr/s3/cruiser-production/2022/10/4221556a-d1ba-4f34-9ec4-2819e102ea57/1200x680_pierre-niney.jpg",
      points: 100,
      badge: "🌠",
    },
  ];

  return (
    <div className="rank-container">
      <h2>Classement</h2>
      <div className="rank-display-columns">
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
                <td className="td-points">{item.points}</td>
                <td className="td-badge">{item.badge}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="rank-explain">
          <p>comment ca marche ?</p>
          <p>voila</p>
          <p>voila</p>
          <p>voila</p>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
