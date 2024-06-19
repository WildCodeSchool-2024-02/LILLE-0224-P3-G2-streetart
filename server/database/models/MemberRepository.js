const AbstractRepository = require("./AbstractRepository");

class MemberRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "item" as configuration
    super({ table: "member" });
  }


  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table} order by points DESC`);

    // Return the array of items
    return rows;
  }

 
}

module.exports = MemberRepository;
