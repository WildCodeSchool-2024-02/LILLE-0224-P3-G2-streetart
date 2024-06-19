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
      {
        email: "user1@gmail.com",
        password: "user",
        role: "user",
        id_user_fk: 1,
      },
      {
        email: "user2@gmail.com",
        password: "user",
        role: "user",
        id_user_fk: 2,
      },
      {
        email: "user3@gmail.com",
        password: "user",
        role: "user",
        id_user_fk: 3,
      },
      {
        email: "user4@gmail.com",
        password: "user",
        role: "user",
        id_user_fk: 4,
      },
    ];

    accounts.forEach((account) => {
      this.insert(account); // insert into program(title, synopsis, poster, country, year, category_id) values (?, ?, ?, ?, ?, ?)
    });
  }
}

// Export the accountSeeder class
module.exports = AccountSeeder;
