const AbstractSeeder = require("./AbstractSeeder");

class MemberSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "member", truncate: true });
  }

  // The run method - Populate the 'user' table with fake data

  run() {
    const members = [
      {
        firstname: "Elodie",
        lastname: "Regnier",
        pseudo: "Elou",
        city: "Templemars",
        postcode: 59175,
        points: 80,
        avatar: "/assets/images/icons/profile.png",
      },
      {
        firstname: "Alexis",
        lastname: "Estrine",
        pseudo: "Lebgdu59260RPZA",
        city: "Lille",
        postcode: 59000,
        avatar: "/assets/images/icons/profile.png",
      },
      {
        firstname: "Sebastien",
        lastname: "Van Clemputte",
        pseudo: "SEB",
        city: "Lille",
        postcode: 59000,
        points: 10,
        avatar: "/assets/images/icons/profile.png",
      },
      {
        firstname: "Audrey",
        lastname: "Baudry",
        pseudo: "Darkaudrey",
        city: "Lille",
        postcode: 59000,
        points: 5,
        avatar: "/assets/images/icons/profile.png",
      },
    ];

    members.forEach((member) => {
      this.insert(member); // insert into member(firstname, lastname, pseudo, city, postcode, birthdate, points) values (?, ?, ?, ?, ?, ?, ?)
    });
  }
}

// Export the UserSeeder class
module.exports = MemberSeeder;
