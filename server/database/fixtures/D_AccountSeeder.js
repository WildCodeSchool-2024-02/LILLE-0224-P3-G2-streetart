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
        pwd: "admin",
        assignment: "admin",
        date_creation: "2024-01-01",
        id_administrator_fk: 1,
      },
      {
        email: "user1@gmail.com",
        pwd: "user",
        assignment: "user",
        date_creation: "2024-02-01",
        id_member_fk: 1,
      },
      {
        email: "user2@gmail.com",
        pwd: "user",
        assignment: "user",
        date_creation: "2024-03-01",
        id_member_fk: 2,
      },
      {
        email: "user3@gmail.com",
        pwd: "user",
        assignment: "user",
        date_creation: "2024-04-01",
        id_member_fk: 3,
      },
      {
        email: "user4@gmail.com",
        pwd: "user",
        assignment: "user",
        date_creation: "2024-05-01",
        id_member_fk: 4,
      },
    ];

    accounts.forEach((account) => {
      this.insert(account); // insert into account(email, pwd, assignment, id_member_fk) values (?, ?, ?, ?)
    });
  }
}

// Export the accountSeeder class
module.exports = AccountSeeder;
