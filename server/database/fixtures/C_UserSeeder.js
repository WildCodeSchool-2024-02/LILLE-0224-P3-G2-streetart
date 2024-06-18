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
      },
      {
        firstname: "Alexis",
        lastname: "Estrine",
        pseudo: "Lebgdu59",
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
      },
      {
        firstname: "Audrey",
        lastname: "Baudry",
        pseudo: "Darkaudrey",
        city: "Lille",
        postcode: 59000,
        birthdate: `1992-09-12`,
      },
    ];

    users.forEach((user) => {
      this.insert(user); // insert into program(title, synopsis, poster, country, year, category_id) values (?, ?, ?, ?, ?, ?)
    });
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
