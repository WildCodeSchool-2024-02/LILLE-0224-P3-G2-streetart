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

  async readMember(id) {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await this.database.query(
        `SELECT ac.id_account, ac.email, ac.pwd, ac.id_member_fk, m.id_member, m.firstname, m.lastname, m.pseudo, m.city, m.postcode, m.avatar, m.points
    FROM member AS m
    RIGHT JOIN account AS ac ON id_member=id_member_fk
    WHERE m.id_member=(?);`,
        [id]
      );
    
      return rows[0];
    }

 
}

module.exports = MemberRepository;
