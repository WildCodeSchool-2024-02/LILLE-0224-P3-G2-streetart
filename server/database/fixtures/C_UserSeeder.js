const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }

  // The run method - Populate the 'user' table with fake data

  run() {
    const users = [
      {
        firstname: "Elodie",
        lastname: "Regnier",
        pseudo: "Elou",
        city: "Templemars",
        postcode: 59175,
        birthdate: `1992-06-23`,
        points: 15,
      },
      {
        firstname: "Alexis",
        lastname: "Estrine",
        pseudo: "Lebgdu59260RPZA",
        city: "Lille",
        postcode: 59000,
        birthdate: `1998-11-25`,
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

    users.forEach((user) => {
      this.insert(user); // insert into user(firstname, lastname, pseudo, city, postcode, birthdate, points) values (?, ?, ?, ?, ?, ?, ?)
    });
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
