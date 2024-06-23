import { useEffect, useState } from "react";
import myAxios from "../../services/myAxios";
import "./Top3.css";

function Top3() {
  const [topMembers, setTopMembers] = useState([]);

  useEffect(() => {
    const getTop3 = async () => {
      try {
        const response = await myAxios.get("/api/members/ranked");
        setTopMembers(response.data);
      } catch (error) {
        console.error("Erreur", error);
      }
    };
    getTop3();
  }, []);

  return (
    <div className="top3-container">
      <table className="rank-box">
        <tbody>
          {topMembers.slice(0, 3).map((member, index) => (
            //   const LeBadge = getBadgeForPoints(member.points);
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
              {/* <td className="td-badge">{LeBadge ? LeBadge.logo : ""}</td> */}
            </tr>
          ))}
          ;
        </tbody>
      </table>
    </div>
  );
}

export default Top3;
