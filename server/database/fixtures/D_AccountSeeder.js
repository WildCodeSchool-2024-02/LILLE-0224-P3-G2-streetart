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
        pwd: "$argon2id$v=19$m=19456,t=2,p=1$978g/FrQ9t5Wz1V0JC8jdg$JsFs5kboOsWsCq36pLZK5kreaGOvciZ9LzAhM9jy9ek",
        assignment: "admin",
        date_creation: "2024-01-01",
        id_administrator_fk: 1,
      },
      {
        email: "user@gmail.com",
        pwd: "$argon2id$v=19$m=19456,t=2,p=1$978g/FrQ9t5Wz1V0JC8jdg$JsFs5kboOsWsCq36pLZK5kreaGOvciZ9LzAhM9jy9ek",
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
