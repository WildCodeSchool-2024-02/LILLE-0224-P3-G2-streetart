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
        birthdate: `1992-06-23`,
        points: 80,
        avatar:"https://www.parismatch.com/lmnr/var/pm/public/media/image/2022/02/28/16/Francois-Civil.jpg?VersionId=3NZNfTbY_QeYa6WOzqlWurka0zzg9TGn",
      },
      {
        firstname: "Alexis",
        lastname: "Estrine",
        pseudo: "Lebgdu59260RPZA",
        city: "Lille",
        postcode: 59000,
        birthdate: `1998-11-25`,
        avatar:"https://www.parismatch.com/lmnr/var/pm/public/media/image/2022/02/28/16/Francois-Civil.jpg?VersionId=3NZNfTbY_QeYa6WOzqlWurka0zzg9TGn",
      },
      {
        firstname: "Sebastien",
        lastname: "Van Clemputte",
        pseudo: "SEB",
        city: "Lille",
        postcode: 59000,
        birthdate: `1977-05-19`,
        points: 10,
      },
      {
        firstname: "Audrey",
        lastname: "Baudry",
        pseudo: "Darkaudrey",
        city: "Lille",
        postcode: 59000,
        birthdate: `1992-09-12`,
        points: 5,
      },
    ];

    members.forEach((member) => {
      this.insert(member); // insert into member(firstname, lastname, pseudo, city, postcode, birthdate, points) values (?, ?, ?, ?, ?, ?, ?)
    });
  }
}

// Export the UserSeeder class
module.exports = MemberSeeder;
