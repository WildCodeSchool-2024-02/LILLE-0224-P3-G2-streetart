const AbstractSeeder = require("./AbstractSeeder");

class AdminSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "admin", truncate: true });
  }

  // The run method - Populate the 'admin' table with fake data

  run() {
    const admins = [
      {
        firstname: "John",
        lastname: "Doe",
        pseudo: "admin",
      },
    ];

    admins.forEach((admin) => {
      this.insert(admin); // insert into program(title, synopsis, poster, country, year, category_id) values (?, ?, ?, ?, ?, ?)
    });
  }
}

// Export the adminSeeder class
module.exports = AdminSeeder;
