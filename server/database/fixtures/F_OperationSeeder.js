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
        kind: "validation",
        details: "Oeuvre validée",
        date_operation: "2024-06-01",
        id_artwork_fk: 1,
        id_account_fk: 2,
      },
      {
        kind: "validation",
        details: "Oeuvre validée",
        date_operation: "2024-06-02",
        id_artwork_fk: 2,
        id_account_fk: 2,
      },
      {
        kind: "validation",
        details: "Oeuvre validée",
        date_operation: "2024-06-03",
        id_artwork_fk: 3,
        id_account_fk: 2,
      },
      {
        kind: "validation",
        details: "Oeuvre validée",
        date_operation: "2024-06-04",
        id_artwork_fk: 4,
        id_account_fk: 2,
      },
      {
        kind: "validation",
        details: "Oeuvre validée",
        date_operation: "2024-06-05",
        id_artwork_fk: 5,
        id_account_fk: 2,
      },
      {
        kind: "validation",
        details: "Oeuvre validée",
        date_operation: "2024-06-06",
        id_artwork_fk: 6,
        id_account_fk: 3,
      },
      {
        kind: "validation",
        details: "Oeuvre validée",
        date_operation: "2024-06-07",
        id_artwork_fk: 7,
        id_account_fk: 2,
      },
      {
        kind: "validation",
        details: "Oeuvre validée",
        date_operation: "2024-06-08",
        id_artwork_fk: 8,
        id_account_fk: 3,
      },
      {
        kind: "validation",
        details: "Oeuvre validée",
        date_operation: "2024-06-09",
        id_artwork_fk: 9,
        id_account_fk: 3,
      },
      {
        kind: "validation",
        details: "Oeuvre validée",
        date_operation: "2024-06-10",
        id_artwork_fk: 10,
        id_account_fk: 3,
      },
      {
        kind: "signalement",
        details: "Oeuvre signalée",
        date_operation: "2024-06-11",
        id_artwork_fk: 11,
        id_account_fk: 4,
      },
    ];

    operations.forEach((operation) => {
      this.insert(operation); // insert into operation(kind, details, date_operation, id_artwork_fk, id_account_fk) values (?, ?, ?, ?, ?)
    });
  }
}

// Export the operationSeeder class
module.exports = OperationSeeder;
