const AbstractSeeder = require("./AbstractSeeder");

class AdministratorSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "administrator", truncate: true });
  }

  // The run method - Populate the 'admin' table with fake data

  run() {
    const administrators = [
      {
        firstname: "John",
        lastname: "Doe",
      },
    ];

    administrators.forEach((administrator) => {
      this.insert(administrator); // insert into program(title, synopsis, poster, country, year, category_id) values (?, ?, ?, ?, ?, ?)
    });
  }
}

// Export the adminSeeder class
module.exports = AdministratorSeeder;
