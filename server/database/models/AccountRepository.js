const AbstractRepository = require("./AbstractRepository");

class AccountRepository extends AbstractRepository {
  constructor() {
    super({ table: "account" });
  }

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `SELECT a.*, m.*
        FROM ${this.table} AS a
        INNER JOIN member AS m ON id_member=id_member_fk
        WHERE a.email= (?);`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async updateBanAccount(accountUpdate) {
    // Execute the SQL UPDATE query to update a specific category
    const [result] = await this.database.query(
      `UPDATE ${this.table} INNER JOIN member ON ${this.table}.id_member_fk = member.id_member
      SET ${this.table}.banned = 1
      WHERE member.id_member = ?`,
      [accountUpdate.id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

module.exports = AccountRepository;
