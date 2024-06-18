const AbstractSeeder = require("./AbstractSeeder");

class AccountSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "account",
      truncate: true,
    });
  }

  // The run method - Populate the 'account' table with fake data

  run() {
    const accounts = [
      {
        email: "admin@gmail.com",
        password: "admin",
        role: "admin",
        id_admin_fk: 1,
      },
    ];

    accounts.forEach((account) => {
      this.insert(account); // insert into program(title, synopsis, poster, country, year, category_id) values (?, ?, ?, ?, ?, ?)
    });
  }
}

// Export the accountSeeder class
module.exports = AccountSeeder;
