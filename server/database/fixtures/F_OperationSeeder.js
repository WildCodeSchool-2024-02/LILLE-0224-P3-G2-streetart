const AbstractSeeder = require("./AbstractSeeder");

class OperationSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "operation", truncate: true });
  }

  // The run method - Populate the 'operation' table with fake data

  run() {
    const operations = [
      {
        type: "validation",
        description: "Oeuvre validée",
        date: "2024-06-15",
        id_artwork_fk: 1,
        id_account_fk: 1,
      },
    ];

    operations.forEach((operation) => {
      this.insert(operation); // insert into operation(type, description, date, id_artwork_fk, id_account_fk) values (?, ?, ?, ?, ?)
    });
  }
}

// Export the operationSeeder class
module.exports = OperationSeeder;
